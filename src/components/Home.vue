<template>
  <div class="results">
    <h1>Resultados</h1>
    <b-card-group deck>
      <b-card title="Resultados do mês" class="results-perday">
        <b-card-text>Header and footers using props.</b-card-text>
        <b-table
          id="result-perday-table"
          hover
          bordered
          small
          :items="results"
          :fields="resultFields"
          :tbody-tr-class="rowClass"
        ></b-table>
      </b-card>
      <b-card title="Banca no mês" class="results-bankroll">
        <b-card-text>Header and footers using props.</b-card-text>
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

    <div class="results-content">
      <div class="results-perday results-card"></div>
      <div class="results-bankroll results-card"></div>
      <div class="results-table results-card"></div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    async getBets() {
      try {
        const response = await api.get("/bets");

        if (response && response !== undefined) {
          this.bets = response.data;
        }
      } catch (err) {
        showError(err);
      }
    },
    async getResultsByDate() {
      try {
        const response = await api.get("/bets/resultsPerDate");

        if (response && response !== undefined) {
          this.results = response.data;
        }
      } catch (err) {
        showError(err);
      }
    },
    async loadBets() {
      try {
        await api.get("/bets/integrate");
        await this.getBets();

        this.$toasted.global.defaultSuccess();
      } catch (err) {
        showError(err);
      }
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (Number(item.profitLoss) > 0) return "table-success";
      if (Number(item.profitLoss) < 0) return "table-danger";
    },
  },
  async mounted() {
    this.getBets();
    this.getResultsByDate();
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
</style>