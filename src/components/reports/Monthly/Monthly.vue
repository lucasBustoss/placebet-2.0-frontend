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
        :infoNumber="stats ? stats.profitLoss : 0"
        infoDescription="resultado mensal"
        infoIcon="fa-usd"
        :useMoneySymbol="true"
        :showResults="showResults"
      />
      <CardInfo
        :isLoading="isLoading"
        :infoNumber="stats ? stats.goalsScored : 0"
        infoDescription="gols pegos"
        infoIcon="fa-futbol-o"
        applyColorStyle="green"
        :showResults="showResults"
      />
      <CardInfo
        :isLoading="isLoading"
        :infoNumber="stats ? stats.goalsConceded : 0"
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
        <MonthlyChart
          :isLoading="isLoading"
          chart-title="Evolução do lucro no mês"
          :labels="chartLabels"
          :chartData1="stats && stats.marketsCount > 0 ? chartProfitData : null"
          :stepSize="stats ? stats.stake : 100"
          :showResults="showResults"
        />
        <MonthlyChart
          :isLoading="isLoading"
          chartTitle="Evolução dos gols no mês"
          :labels="chartLabels"
          :chartData1="
            stats && stats.marketsCount > 0 && stats.goalsScored > 0
              ? chartGoalsScored
              : null
          "
          :chartData2="
            stats && stats.marketsCount > 0 && stats.goalsConceded > 0
              ? chartGoalsConceded
              : null
          "
          :stepSize="mostGoals > 20 ? '5' : mostGoals > 10 ? '2' : '1'"
          :maxSize="mostGoals + (mostGoals > 20 ? 5 : mostGoals > 10 ? 2 : 1)"
          :showResults="showResults"
        />
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
  computed: {
    chartProfitData() {
      const chartData = {
        labelName: "Evolução do lucro mensal",
        data: this.profitEvolutionData,
        borderColor: "#ffc107",
        pointBorderColor: "rgba(255,193,7,0.5)",
        gradient1: "rgba(255,193,7,0.5)",
        gradient2: "rgba(255,193,7,0.25)",
        gradient3: "rgba(255,193,7,0)",
      };

      return chartData;
    },
    chartGoalsScored() {
      const chartData = {
        labelName: "Gols pegos",
        data: this.goalsScoredData,
        borderColor: "#00af17",
        pointBorderColor: "rgba(0,175,23,0.5)",
        gradient1: "rgba(0,175,23,0.5)",
        gradient2: "rgba(0,175,23,0.25)",
        gradient3: "rgba(0,175,23,0)",
      };

      return chartData;
    },
    chartGoalsConceded() {
      const chartData = {
        labelName: "Gols tomados",
        data: this.goalsConcededData,
        borderColor: "#af1400",
        pointBorderColor: "rgba(175,20,0,0.5)",
        gradient1: "rgba(175,20,0,0.5)",
        gradient2: "rgba(175,20,0,0.25)",
        gradient3: "rgba(175,20,0,0)",
      };

      return chartData;
    },
    chartLabels() {
      const labels = [];

      if (this.monthly && this.monthly.profitEvolution.length > 0)
        for (
          let index = 0;
          index < this.monthly.profitEvolution.length;
          index++
        ) {
          if (
            index % 4 !== 0 &&
            index + 1 !== this.monthly.profitEvolution.length
          ) {
            labels.push("");
            continue;
          }

          const item = this.monthly.profitEvolution[index];

          labels.push(item.date);
        }

      return labels;
    },
    profitEvolutionData() {
      const data = [];

      if (this.monthly && this.monthly.profitEvolution.length > 0)
        for (
          let index = 0;
          index < this.monthly.profitEvolution.length;
          index++
        ) {
          const item = this.monthly.profitEvolution[index];

          data.push(item.profitLoss);
        }

      return data;
    },
    goalsScoredData() {
      const data = [];

      if (this.monthly && this.monthly.goalsEvolution.length > 0)
        for (
          let index = 0;
          index < this.monthly.goalsEvolution.length;
          index++
        ) {
          const item = this.monthly.goalsEvolution[index];

          data.push(item.goalsScored);
        }

      return data;
    },
    goalsConcededData() {
      const data = [];

      if (this.monthly && this.monthly.goalsEvolution.length > 0)
        for (
          let index = 0;
          index < this.monthly.goalsEvolution.length;
          index++
        ) {
          const item = this.monthly.goalsEvolution[index];

          data.push(item.goalsConceded);
        }

      return data;
    },
    mostGoals() {
      if (this.stats) {
        if (this.stats.goalsScored > this.stats.goalsConceded)
          return Number(this.stats.goalsScored);
        return Number(this.stats.goalsConceded);
      } else {
        return 30;
      }
    },
  },
  data() {
    return {
      selectedMonth: format(startOfMonth(new Date()), "yyyy-MM-dd"),
      isLoading: true,
      showResults: this.$store.state.defaultVisibility
        ? this.$store.state.defaultVisibility
        : 0,
      results: [],
      stats: null,
      monthly: null,
    };
  },
  methods: {
    async loadInfos() {
      this.isLoading = true;

      await this.loadResults();
      await this.loadStats();
      await this.loadMonthlyData();

      this.isLoading = false;
    },
    async loadResults() {
      try {
        const response = await api.get("/bets/resultsPerDate", {
          params: {
            date: this.selectedMonth,
          },
        });

        if (response && response.data !== undefined) {
          this.results = response.data;
        }
      } catch (err) {
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
        this.isLoading = false;
        showError(err);
      }
    },
    async loadMonthlyData() {
      try {
        const response = await api.get("/reports/monthly", {
          params: {
            date: this.selectedMonth,
          },
        });

        if (response && response.data !== undefined) {
          this.monthly = response.data;
        }
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