<template>
  <div class="results">
    <div class="results-header">
      <h1 class="results-header-title">Resultados</h1>

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
      <b-card
        border-variant="secondary"
        class="text-center results-cards-info card-info-month-result"
      >
        <i
          class="fa fa-line-chart result-card-icon result-card-icon-markets"
          aria-hidden="true"
        ></i>
        <b-card-text class="result-card-text">
          <div class="card-text-number">
            <div v-if="!isLoading">{{ stats.marketsCount }}</div>
            <div v-else>--</div>
          </div>
          <div class="card-text-stat">mercados trabalhados</div>
        </b-card-text>
      </b-card>
      <b-card border-variant="secondary" class="text-center results-cards-info">
        <i
          class="fa fa-percent result-card-icon result-card-icon-markets"
          aria-hidden="true"
        ></i
        ><b-card-text class="result-card-text">
          <div class="card-text-number">
            <div v-if="!isLoading">
              R$ {{ formattedDecimalValue(stats.avgStake) }}
            </div>
            <div v-else>--</div>
          </div>
          <div class="card-text-stat">stake média</div>
        </b-card-text>
      </b-card>
      <b-card border-variant="secondary" class="text-center results-cards-info">
        <i
          :class="
            stats.profitLoss < 0
              ? 'fa fa-usd  card-text-number result-card-red'
              : 'fa fa-usd  card-text-number result-card-green'
          "
          aria-hidden="true"
        ></i>
        <b-card-text class="result-card-text">
          <div
            :class="
              stats.profitLoss < 0
                ? 'card-text-number result-card-red'
                : 'card-text-number result-card-green'
            "
          >
            <div v-if="!isLoading">
              R$ {{ formattedDecimalValue(stats.profitLoss) }}
            </div>
            <div v-else>--</div>
          </div>
          <div class="card-text-stat">resultado mensal</div>
        </b-card-text>
      </b-card>
      <b-card border-variant="secondary" class="text-center results-cards-info">
        <i
          :class="
            stats.roiStake < 0
              ? 'fa fa-percent  card-text-number result-card-red'
              : 'fa fa-percent  card-text-number result-card-green'
          "
          aria-hidden="true"
        ></i
        ><b-card-text class="result-card-text">
          <div
            :class="
              stats.roiStake < 0
                ? 'card-text-number result-card-red'
                : ' card-text-number result-card-green'
            "
          >
            <div v-if="!isLoading">
              {{ formattedDecimalValue(stats.roiStake) }}%
            </div>
            <div v-else>--</div>
          </div>
          <div class="card-text-stat">lucro sobre a stake</div>
        </b-card-text>
      </b-card>
    </div>

    <hr />

    <b-card-group deck>
      <ResultsBetList
        :bets="bets"
        :showResults="showResults"
        :methods="methods"
        :loadingBets="loadingBets"
        :formattedDecimalValue="formattedDecimalValue"
        @importBets="importBets"
        @getBets="getBets"
        @deleteBet="deleteBet"
      />
    </b-card-group>
  </div>
</template>

<script>
import ResultsBetList from "./ResultsBetList";
import MonthFilter from "../template/MonthFilter";

import { startOfMonth, format } from "date-fns";

import { showError, showSuccess } from "@/global";
import api from "@/config/api";

import { mapMutations } from "vuex";

export default {
  components: { ResultsBetList, MonthFilter },
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
    };
  },
  methods: {
    ...mapMutations(["setBetsToImport"]),
    async loadInfos() {
      this.loadMethods();
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
      return numberValue.toFixed(2).replace(".", ",");
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
  border: 1px solid #ffc107;
}

.buttons > .button-share:focus {
  border: 1px solid #198754;
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

.result-card-icon {
  font-size: 2em;
}

.result-card-icon-markets {
  color: #e9b301;
}

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

.results-cards-info {
  width: 32%;
  height: 9vh;
}

.results-cards-info > .card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.result-card-text {
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
}

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