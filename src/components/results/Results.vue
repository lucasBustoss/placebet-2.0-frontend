<template>
  <div class="results">
    <div class="results-header">
      <h1 class="results-header-title">Resultados</h1>

      <div class="results-header-icon" @click="showResults = !showResults">
        <i v-if="showResults" class="fa fa-eye" aria-hidden="true"></i>
        <i v-else class="fa fa-eye-slash" aria-hidden="true"></i>
      </div>

      <MonthFilter :selectedMonth="selectedMonth" @changeMonth="changeMonth" />
    </div>

    <hr />

    <div class="buttons">
      <b-button
        pill
        variant="outline-warning"
        @click="importBets"
        class="button-import"
        ><div v-if="!loadingImport">
          <i class="fa fa-plus result-button-icon" aria-hidden="true"></i>
          Importar resultados
        </div>
        <b-spinner v-else variant="secondary"></b-spinner>
      </b-button>
      <b-button pill variant="outline-success" class="button-share">
        <i
          class="fa fa-share-square-o result-button-icon"
          aria-hidden="true"
        ></i>
        Compartilhar resultados</b-button
      >
    </div>

    <hr />

    <div class="results-cards">
      <CardInfo
        :isLoading="isLoading"
        :infoNumber="stats.marketsCount"
        infoDescription="mercados trabalhados"
        infoIcon="fa-line-chart"
        :showResults="showResults"
      />

      <CardInfo
        :isLoading="isLoading"
        :infoNumber="stats.avgStake"
        infoDescription="stake média"
        infoIcon="fa-money"
        :useMoneySymbol="true"
        :showResults="showResults"
      />

      <CardInfo
        :isLoading="isLoading"
        :infoNumber="stats.profitLoss"
        infoDescription="resultado mensal"
        infoIcon="fa-usd"
        applyColorStyle="per-result"
        :useMoneySymbol="true"
        :showResults="showResults"
      />

      <CardInfo
        :isLoading="isLoading"
        :infoNumber="stats.roiStake"
        infoDescription="lucro sobre a stake"
        infoIcon="fa-percent"
        applyColorStyle="per-result"
        :usePercentageSymbol="true"
        :showResults="showResults"
      />
    </div>

    <hr />

    <b-card-group deck>
      <ResultsBetList
        :bets="bets"
        :showResults="showResults"
        :methods="methods"
        :leagues="leagues"
        :loadingBets="loadingBets"
        :formattedDecimalValue="formattedDecimalValue"
        @importBets="importBets"
        @getBets="getBets"
        @updateBet="updateBet"
        @deleteBet="deleteBet"
      />
    </b-card-group>
  </div>
</template>

<script>
import ResultsBetList from "./ResultsBetList";
import MonthFilter from "../template/MonthFilter";
import CardInfo from "../template/CardInfo";

import { startOfMonth, format } from "date-fns";

import { showError, showSuccess } from "@/global";
import api from "@/config/api";

import { mapMutations } from "vuex";

export default {
  components: { ResultsBetList, MonthFilter, CardInfo },
  computed: {
    isLoading() {
      return this.loadingBets;
    },
  },
  data() {
    return {
      showResults: false,
      loadingImport: false,
      loadingBets: false,
      bets: [],
      results: [],
      selectedMonth: format(startOfMonth(new Date()), "yyyy-MM-dd"),
      stats: {},
      methods: [],
      leagues: [],
    };
  },
  methods: {
    ...mapMutations(["setBetsToImport"]),
    async loadInfos() {
      this.loadMethods();
      this.loadLeagues();
      this.getResultsByDate();
      this.getStats();
      await this.getBets();
    },
    async getBets() {
      try {
        this.loadingBets = true;
        const response = await api.get("/bets", {
          params: {
            date: this.selectedMonth,
          },
        });

        if (response && response.data !== undefined) {
          this.bets = response.data;
        }

        this.loadingBets = false;
      } catch (err) {
        this.loadingBets = false;
        showError(err);
      }
    },
    async getResultsByDate() {
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
    async importBets() {
      try {
        this.loadingImport = true;
        const response = await api.get("/betfair/integrate");

        if (response.data.length > 0) {
          this.setBetsToImport(response.data);
          this.$router.push({ name: "import" });
        } else {
          showSuccess("Todas as entradas já estão sincronizadas!");
        }

        this.loadingImport = false;
      } catch (err) {
        showError(err);
      }
    },
    async getStats() {
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
          };
        }
      } catch (err) {
        showError(err);
      }
    },
    async loadMethods() {
      try {
        const response = await api.get("/methods");

        if (response && response.data) {
          this.methods = response.data;
        }
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
    async loadLeagues() {
      try {
        const response = await api.get("/leagues");

        if (response && response.data) {
          this.leagues = response.data;
        }
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
    async updateBet(bet) {
      try {
        const method = this.methods.filter((m) => m.name === bet.method);
        const league = this.leagues.filter((l) => l.name === bet.league);

        await api.patch("/bets/" + bet.id, {
          stake: bet.stake,
          method_id: method.length > 0 ? method[0].id : null,
          league_id: league.length > 0 ? league[0].id : null,
          goalsScored: bet.goalsScored,
          goalsConceded: bet.goalsConceded,
        });

        showSuccess();
        this.loadInfos();
      } catch (err) {
        showError(err);
      }
    },
    async deleteBet(id) {
      try {
        const response = await api.delete("/bets/" + id);

        showSuccess(response.data.message.toString());
        this.loadInfos();
      } catch (err) {
        showError(err);
      }
    },

    formattedDecimalValue(value) {
      const numberValue = Number(value);
      return numberValue.toFixed(2);
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
.results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1em;
}

.results-header-title {
  font-size: 1.7em;
}

.results-header-icon {
  margin-left: 15px;
  cursor: pointer;
}

.spinner-loading-month {
  height: 18px;
  width: 18px;
}

.buttons {
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons > button {
  width: 49%;
  height: 7vh;
  align-items: center;
  justify-content: space-between;
}

.buttons > button {
  width: 49.5%;
  height: 7vh;
  align-items: center;
  justify-content: space-between;
}

.button-import {
  color: #bb8c01;
}

/* FOCUS BUTTONS */

.buttons > button:focus,
.results-options > button:focus {
  box-shadow: none;
}

.buttons > .button-import:focus,
.results-options > button:focus {
  border: 1px solid #ffc107 !important;
}

.buttons > .button-share:focus {
  border: 1px solid #198754 !important;
}

.results-options > .options-date-selector:focus {
  border-left: none;
  border-right: none;
}

/* END FOCUS BUTTONS */

.result-button-icon {
  font-size: 1.1em;
  margin-left: 10px;
}

/* .result-card-icon {
  font-size: 2em;
}

.result-card-icon-markets {
  color: #e9b301;
} */

.result-card-green {
  color: green !important;
}

.result-card-red {
  color: rgb(197, 1, 1) !important;
}

.results-cards {
  display: flex;
  justify-content: space-between;
}

/* .results-cards-info {
  width: 32%;
  height: 9vh;
} */

/* .results-cards-info > .card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
} */

/* .result-card-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  cursor: default;
}

.card-text-number {
  font-size: 1.7em;
  font-weight: bold;
  color: #555;
}

.card-text-stat {
  font-size: 0.9em;
  font-weight: 300;
} */

.close {
  border: none;
  background: inherit;
}

.options-date-selector {
  padding: 10px 50px;
  border-left: none;
  border-right: none;
  color: black;
}

.results-content {
  width: 100%;
  display: flex;
}

.card-deck {
  display: flex;
  width: 100%;
}

.card {
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}
/* HOVER TABLE */
:root {
  --color: black;
}
table tbody tr {
  background: var(--bg);
  color: var(--color);
  transition: 0.5s;
}
table tbody tr:hover {
  background: rgba(0, 0, 0, 0.1);
  color: white;
  cursor: default;
}

/* TRANSITION */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>