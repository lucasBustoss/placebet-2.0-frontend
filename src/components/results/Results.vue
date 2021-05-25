<template>
  <div class="results">
    <h1>Resultados</h1>

    <div class="results-options">
      <b-button class="option-showResults" @click="showResults = !showResults"
        >{{ showResults ? "Esconder " : "Mostrar " }} resultados do
        mês</b-button
      >

      <b-form-select
        class="option-selectMonth"
        size="lg"
        v-model="selectedMonth"
        :options="months"
        @change="loadInfos"
      ></b-form-select>
    </div>
    <b-card-group deck>
      <b-card title="Resultados do mês" class="results-perday">
        <transition name="fade">
          <div v-if="showResults">
            <b-table
              id="result-perday-table"
              bordered
              small
              hover
              :items="results"
              :fields="resultFields"
              :tbody-tr-class="rowClass"
            ></b-table>
          </div>
        </transition>
        <transition name="fade">
          <div v-show="!showResults">Escondido</div>
        </transition>
      </b-card>

      <b-card title="Banca no mês" class="results-bankroll">
        <transition name="fade">
          <div v-show="showResults">
            <div class="results-bankroll-card">
              <b-card
                header="Banca"
                class="card-roi"
                border-variant="warning"
                header-bg-variant="warning"
                bg-variant="light"
                align="center"
              >
                <b-card
                  header="Início"
                  class="card-bankvalue"
                  border-variant="warning"
                  header-bg-variant="warning"
                  bg-variant="light"
                  align="center"
                >
                  <b-card-text
                    >R$
                    {{ formattedDecimalValue(stats.startBank) }}</b-card-text
                  >
                </b-card>
                <b-card
                  header="Atual"
                  class="card-bankvalue"
                  border-variant="warning"
                  header-bg-variant="warning"
                  bg-variant="light"
                  align="center"
                >
                  <b-card-text
                    >R$
                    {{ formattedDecimalValue(stats.finalBank) }}</b-card-text
                  >
                </b-card>
              </b-card>
            </div>
            <div class="results-bankroll-card">
              <b-card
                header="Banca (Betfair)"
                class="card-roi"
                border-variant="warning"
                header-bg-variant="warning"
                bg-variant="light"
                align="center"
              >
                <b-card
                  header="Início"
                  class="card-bankvalue"
                  border-variant="warning"
                  header-bg-variant="warning"
                  bg-variant="light"
                  align="center"
                >
                  <b-card-text
                    >R$
                    {{
                      formattedDecimalValue(stats.startBankBetfair)
                    }}</b-card-text
                  >
                </b-card>
                <b-card
                  header="Atual"
                  class="card-bankvalue"
                  border-variant="warning"
                  header-bg-variant="warning"
                  bg-variant="light"
                  align="center"
                >
                  <b-card-text
                    >R$
                    {{
                      formattedDecimalValue(stats.finalBankBetfair)
                    }}</b-card-text
                  >
                </b-card>
              </b-card>
            </div>

            <div class="results-bankroll-card">
              <b-card
                header="Stake Padrão"
                class="card-profitLoss"
                border-variant="warning"
                header-bg-variant="warning"
                bg-variant="light"
                align="center"
              >
                <b-card-text
                  ><b
                    >R$ {{ formattedDecimalValue(stats.stake) }}</b
                  ></b-card-text
                >
              </b-card>
            </div>

            <div class="results-bankroll-card">
              <b-card
                header="Lucro"
                class="card-profitLoss"
                bg-variant="light"
                align="center"
                header-text-variant="white"
                :border-variant="stats.profitLoss < 0 ? 'danger' : 'success'"
                :header-bg-variant="stats.profitLoss < 0 ? 'danger' : 'success'"
                :body-text-variant="stats.profitLoss < 0 ? 'danger' : 'success'"
              >
                <b-card-text
                  ><b
                    >R$ {{ formattedDecimalValue(stats.profitLoss) }}</b
                  ></b-card-text
                >
              </b-card>
            </div>

            <div class="results-bankroll-card">
              <b-card
                header="ROI"
                class="card-roi"
                border-variant="warning"
                header-bg-variant="warning"
                bg-variant="light"
                align="center"
              >
                <b-card
                  header="Banca"
                  class="card-bankvalue"
                  :border-variant="stats.roiBank < 0 ? 'danger' : 'success'"
                  :header-bg-variant="stats.roiBank < 0 ? 'danger' : 'success'"
                  header-text-variant="white"
                  bg-variant="light"
                  align="center"
                >
                  <b-card-text
                    >{{ formattedDecimalValue(stats.roiBank) }}%</b-card-text
                  >
                </b-card>
                <b-card
                  header="Stake"
                  class="card-bankvalue"
                  :border-variant="stats.roiStake < 0 ? 'danger' : 'success'"
                  :header-bg-variant="stats.roiStake < 0 ? 'danger' : 'success'"
                  header-text-variant="white"
                  bg-variant="light"
                  align="center"
                >
                  <b-card-text
                    >{{ formattedDecimalValue(stats.roiStake) }}%</b-card-text
                  >
                </b-card>
              </b-card>
            </div>
          </div>
        </transition>

        <transition name="fade">
          <div v-show="!showResults">Escondido</div>
        </transition>
      </b-card>

      <b-card title="Lista de resultados" class="results-list">
        <div class="buttons">
          <b-button variant="warning" @click="loadBets"
            >Carregar novos resultados</b-button
          >
          <b-button variant="info" @click="getBets"
            >Atualizar a página</b-button
          >
        </div>
        <b-table
          id="result-table"
          striped
          hover
          bordered
          :items="bets"
          :fields="betFields"
          :per-page="perPage"
          :current-page="currentPage"
        ></b-table>

        <div class="pagination-buttons">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="result-table"
          ></b-pagination>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { startOfMonth, format } from "date-fns";

import { showError } from "@/global";
import api from "@/config/api";

export default {
  computed: {
    rows() {
      return this.bets.length;
    },
  },
  data() {
    return {
      showResults: false,
      perPage: 20,
      currentPage: 1,
      bets: [],
      results: [],
      betFields: [
        {
          key: "date",
          label: "Data",
        },
        {
          key: "eventDescription",
          label: "Jogo",
        },
        {
          key: "method",
          label: "Método",
        },
        {
          key: "profitLoss",
          label: "Resultado",
        },
        {
          key: "roi",
          label: "ROI (%)",
        },
      ],
      resultFields: [
        {
          key: "date",
          label: "Data",
        },
        {
          key: "profitLossFormatted",
          label: "Resultado (R$)",
        },
        {
          key: "roiFormatted",
          label: "ROI (%)",
        },
      ],
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
    loadInfos() {
      this.getBets();
      this.getResultsByDate();
      this.getStats();
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
        await this.loadInfos;

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

        if (response && response.data !== undefined) {
          this.stats = response.data;
        }
      } catch (err) {
        showError(err);
      }
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (Number(item.profitLoss) > 0) return "table-success";
      if (Number(item.profitLoss) < 0) return "table-danger";
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

.results-perday {
  width: 20%;
  font-size: 1.1rem;
}

#result-perday-table > thead,
#result-perday-table > tbody {
  text-align: center;
}

#result-perday-table > tbody {
  font-size: 0.85rem;
}

.results-bankroll {
  width: 25%;
}

.results-list {
  width: 55%;
}

.results-list > .card-body {
  font-size: 1.05rem;
}

#result-table {
  margin-top: 15px;
}

.results-bankroll-card {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.card-bankvalue {
  width: 48%;
}

.card-profitLoss {
  width: 100%;
}

.card-roi {
  width: 100%;
}

.card-roi > .card-body {
  display: flex;
  flex-direction: row;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 15px;
}

.buttons > button {
  width: 30%;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
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
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>