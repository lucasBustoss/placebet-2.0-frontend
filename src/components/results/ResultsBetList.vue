<template>
  <b-card title="Lista de resultados" :class="listClass">
    <div class="buttons">
      <b-button variant="warning" @click="loadBets"
        >Carregar novos resultados</b-button
      >
      <b-button variant="info" @click="getBets">Atualizar a página</b-button>
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
    >
      <template #cell(date)="data">{{ data.item.date }}</template>
      <template #cell(eventDescription)="data">{{
        data.item.eventDescription
      }}</template>
      <template #cell(method)="data">{{ data.item.method }}</template>
      <template #cell(profitLoss)="data">
        R$ {{ data.item.profitLoss }}</template
      >
      <template #cell(roi)="data">{{ data.item.roi }}%</template>
    </b-table>

    <div class="pagination-buttons">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="result-table"
      ></b-pagination>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["showResults", "bets"],
  computed: {
    rows() {
      return this.bets.length;
    },
    listClass() {
      return this.showResults
        ? "results-list results-list-half"
        : "results-list results-list-full";
    },
  },
  data() {
    return {
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
      perPage: 20,
      currentPage: 1,
    };
  },
  methods: {
    getBets() {
      this.$emit("getBets");
    },
    loadBets() {
      this.$emit("loadBets");
    },
  },
};
</script>

<style>
.results-list > .card-body {
  font-size: 1.05rem;
}

.results-list-full {
  width: 100%;
  transition: 0.5s width;
}

.results-list-half {
  width: 55%;
  transition: 0.5s width;
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