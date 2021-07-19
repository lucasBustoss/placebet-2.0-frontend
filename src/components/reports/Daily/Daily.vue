<template>
  <div class="daily-report">
    <div class="daily-report-header">
      <h1 class="daily-report-header-title">Resultado diário</h1>
      <MonthFilter :selectedMonth="selectedMonth" @changeMonth="changeMonth" />
    </div>

    <hr />

    <div class="daily-report-content">
      <DailyList :results="results" :isLoading="isLoading" />
      <DailyChart :isLoading="isLoading" />
    </div>
  </div>
</template>

<script>
import DailyList from "./DailyList";
import DailyChart from "./DailyChart";
import MonthFilter from "@/components/template/MonthFilter";

import { format, startOfMonth } from "date-fns";

import { showError } from "@/global";
import api from "@/config/api";

export default {
  components: { DailyChart, DailyList, MonthFilter },
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
.daily-report {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.daily-report-header {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1em;
  width: 100%;
}

.daily-report-header-title {
  font-size: 1.7em;
  width: 50%;
}

.daily-report-content {
  display: flex;
  justify-content: space-between;
}
</style>