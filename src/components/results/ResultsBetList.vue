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
      @click="showModal"
    >
      <template #cell(date)="data">{{ data.item.date }}</template>
      <template #cell(eventDescription)="data">{{
        data.item.eventDescription
      }}</template>
      <template #cell(method)="data">{{ data.item.method }}</template>
      <template #cell(profitLoss)="data">
        R$ {{ formattedDecimalValue(data.item.profitLoss) }}</template
      >
      <template #cell(roi)="data"
        >{{ formattedDecimalValue(data.item.roi) }}%</template
      >
      <template #cell(goalsScored)="data">{{ data.item.goalsScored }}</template>
      <template #cell(goalsConceded)="data">{{
        data.item.goalsConceded
      }}</template>
      <template #cell()="data">
        <div class="edit-column">
          <i
            class="edit-result fa fa-pencil-square-o"
            v-b-modal.modal-1
            @click="showModal(data)"
          ></i></div
      ></template>
    </b-table>

    <template v-if="toggle">
      <ResultsBetModal
        :bet="bet"
        :formattedDecimalValue="formattedDecimalValue"
        :methods="methods"
        @loadBets="loadBets"
      />
    </template>

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
import ResultsBetModal from "./ResultsBetModal";

export default {
  props: ["showResults", "bets", "methods", "formattedDecimalValue"],
  components: { ResultsBetModal },
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
        {
          key: "goalsScored",
          label: "GP",
        },
        {
          key: "goalsConceded",
          label: "GT",
        },
        {
          label: "",
        },
      ],
      perPage: 20,
      currentPage: 1,
      bet: {},
      toggle: false,
    };
  },
  methods: {
    getBets() {
      this.$emit("getBets");
    },
    loadBets() {
      this.$emit("loadBets");
    },
    async showModal(data) {
      this.bet = data.item;

      await this.mountModal();
      this.$bvModal.show("bet-modal");
    },
    mountModal() {
      this.toggle = true;
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

.edit-column {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
}

.edit-result {
  cursor: pointer;
}
</style>