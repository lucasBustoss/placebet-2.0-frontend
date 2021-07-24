<template>
  <div class="monthly-report">
    <div class="monthly-report-header">
      <h1 class="monthly-report-header-title">Resultado mensal</h1>

      <div class="monthly-header-icon" @click="showResults = !showResults">
        <i v-if="showResults" class="fa fa-eye" aria-hidden="true"></i>
        <i v-else class="fa fa-eye-slash" aria-hidden="true"></i>
      </div>

      <MonthFilter :selectedMonth="selectedMonth" @changeMonth="changeMonth" />
    </div>

    <hr />

    <div class="monthly-cards">
      <CardInfo
        :isLoading="isLoading"
        :infoNumber="stats.profitLoss"
        infoDescription="resultado mensal"
        infoIcon="fa-usd"
        :useMoneySymbol="true"
        :showResults="showResults"
      />
      <CardInfo
        :isLoading="isLoading"
        :infoNumber="stats.goalsScored"
        infoDescription="gols pegos"
        infoIcon="fa-futbol-o"
        applyColorStyle="green"
        :showResults="showResults"
      />
      <CardInfo
        :isLoading="isLoading"
        :infoNumber="stats.goalsConceded"
        infoDescription="gols tomados"
        infoIcon="fa-futbol-o"
        applyColorStyle="red"
        :showResults="showResults"
      />
    </div>

    <hr />

    <div class="monthly-report-content">
      <MonthlyList
        :results="results"
        :isLoading="isLoading"
        :showResults="showResults"
      />
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
import CardInfo from "@/components/template/CardInfo";

import { format, startOfMonth } from "date-fns";

import { showError } from "@/global";
import api from "@/config/api";

export default {
  components: { MonthlyChart, MonthlyList, MonthFilter, CardInfo },
  data() {
    return {
      selectedMonth: format(startOfMonth(new Date()), "yyyy-MM-dd"),
      isLoading: true,
      showResults: false,
      results: [],
      stats: null,
    };
  },
  methods: {
    async loadInfos() {
      this.loadStats();
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
    async loadStats() {
      try {
        const response = await api.get("/stats", {
          params: {
            date: this.selectedMonth,
          },
        });

        if (response && response.data !== null) {
          this.stats = response.data;
        } else {
          this.stats = {
            startBank: 0,
            finalBank: 0,
            startBankBetfair: 0,
            finalBankBetfair: 0,
            stake: 0,
            profitLoss: 0,
            roiBank: 0,
            roiStake: 0,
            marketsCount: 0,
            avgStake: 0,
            goalsScored: 0,
            goalsConceced: 0,
          };
        }
      } catch (err) {
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
  width: 13.5%;
}

.monthly-report-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.monthly-header-icon {
  margin-left: 15px;
  cursor: pointer;
}

.monthly-cards {
  display: flex;
  justify-content: space-between;
}

.monthly-report-charts {
  width: 100%;
  margin: 0;
}
</style>