<template>
  <div class="monthly-report">
    <div class="monthly-report-header">
      <h1 class="monthly-report-header-title">Resultado mensal</h1>
      <MonthFilter :selectedMonth="selectedMonth" @changeMonth="changeMonth" />
    </div>

    <hr />

    <div class="monthly-report-content">
      <MonthlyList :results="results" :isLoading="isLoading" />
      <div class="monthly-report-charts">
        <MonthlyChart :isLoading="isLoading" />
        <MonthlyChart :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import MonthlyList from "./MonthlyList";
import MonthlyChart from "./MonthlyChart";
import MonthFilter from "@/components/template/MonthFilter";

import { format, startOfMonth } from "date-fns";

import { showError } from "@/global";
import api from "@/config/api";

export default {
  components: { MonthlyChart, MonthlyList, MonthFilter },
  data() {
    return {
      selectedMonth: format(startOfMonth(new Date()), "yyyy-MM-dd"),
      isLoading: true,
      results: [],
    };
  },
  methods: {
    async loadInfos() {
      await this.loadResults();
    },
    async loadResults() {
      try {
        this.isLoading = true;

        const response = await api.get("/bets/resultsPerDate", {
          params: {
            date: this.selectedMonth,
          },
        });

        if (response && response.data !== undefined) {
          this.results = response.data;
        }

        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        showError(err);
      }
    },
    async changeMonth(value) {
      this.selectedMonth = format(value, "yyyy-MM-dd");
      await this.loadInfos();
    },
  },
  async mounted() {
    this.loadInfos();
  },
};
</script>

<style>
.monthly-report {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.monthly-report-header {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1em;
  width: 100%;
}

.monthly-report-header-title {
  font-size: 1.7em;
  width: 50%;
}

.monthly-report-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.monthly-report-charts {
  width: 100%;
  margin: 0;
}
</style>