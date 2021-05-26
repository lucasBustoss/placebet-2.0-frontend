<template>
  <div class="results">
    <div class="results-header">
      <h1>Resultados</h1>
      <div class="results-header-icon">
        <i
          @click="showResults = !showResults"
          :class="showResults ? 'fa fa-eye' : 'fa fa-eye-slash'"
        ></i>
      </div>
    </div>

    <div class="results-options">
      <b-form-select
        class="option-selectMonth"
        size="lg"
        v-model="selectedMonth"
        :options="months"
        @change="loadInfos"
      ></b-form-select>
    </div>

    <b-card-group deck>
      <transition name="fade">
        <ResultsMonth v-show="showResults" :results="results" />
      </transition>
      <transition name="fade">
        <ResultsBank
          v-show="showResults"
          :stats="stats"
          :formattedDecimalValue="formattedDecimalValue"
        />
      </transition>
      <ResultsBetList
        :bets="bets"
        :showResults="showResults"
        @loadBets="loadBets"
        @getBets="getBets"
      />
    </b-card-group>
  </div>
</template>

<script>
import ResultsMonth from "./ResultsMonth";
import ResultsBank from "./ResultsBank";
import ResultsBetList from "./ResultsBetList";

import { startOfMonth, format } from "date-fns";

import { showError } from "@/global";
import api from "@/config/api";

export default {
  components: { ResultsMonth, ResultsBank, ResultsBetList },
  data() {
    return {
      showResults: false,
      bets: [],
      results: [],
      months: [
        { value: "2021-01-01", text: "Janeiro" },
        { value: "2021-02-01", text: "Fevereiro" },
        { value: "2021-03-01", text: "Março" },
        { value: "2021-04-01", text: "Abril" },
        { value: "2021-05-01", text: "Maio" },
        { value: "2021-06-01", text: "Junho" },
        { value: "2021-07-01", text: "Julho" },
        { value: "2021-08-01", text: "Agosto" },
        { value: "2021-09-01", text: "Setembro" },
        { value: "2021-10-01", text: "Outubro" },
        { value: "2021-11-01", text: "Novembro" },
        { value: "2021-12-01", text: "Dezembro" },
      ],
      selectedMonth: format(startOfMonth(new Date()), "yyyy-MM-dd"),
      stats: {},
      user_id: "a2e1736d-15bb-4c21-879d-6e28cfff552d",
    };
  },
  methods: {
    async loadInfos() {
      await this.getBets();
      await this.getResultsByDate();
      await this.getStats();
    },
    async getBets() {
      try {
        const response = await api.get("/bets", {
          params: {
            user_id: this.user_id,
            date: this.selectedMonth,
          },
        });

        if (response && response.data !== undefined) {
          this.bets = response.data;
          console.log(this.bets);
        }
      } catch (err) {
        showError(err);
      }
    },
    async getResultsByDate() {
      try {
        const response = await api.get("/bets/resultsPerDate", {
          params: {
            user_id: this.user_id,
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
    async loadBets() {
      try {
        await api.get("/bets/integrate", {
          params: {
            user_id: this.user_id,
            username: "xistzera",
            password: "semSenha01@!",
          },
        });
        await this.loadInfos();

        this.$toasted.global.defaultSuccess();
      } catch (err) {
        showError(err);
      }
    },
    async getStats() {
      try {
        const response = await api.get("/stats", {
          params: {
            user_id: this.user_id,
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
          };
        }
      } catch (err) {
        showError(err);
      }
    },
    formattedDecimalValue(value) {
      const numberValue = Number(value);
      return numberValue.toFixed(2).replace(".", ",");
    },
  },
  async mounted() {
    this.loadInfos();
  },
};
</script>

<style>
h1 {
  text-align: center;
}

.results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.results-header-icon {
  margin-left: 15px;
  cursor: pointer;
}

.close {
  border: none;
  background: inherit;
}

.option-selectMonth {
  margin-left: 20px;
  border-radius: 7px;
  align-items: center;
}

.results-options {
  display: flex;
  padding: 10px;
  width: 100%;
  justify-content: center;
}

.option-selectMonth {
  padding: 10px;
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