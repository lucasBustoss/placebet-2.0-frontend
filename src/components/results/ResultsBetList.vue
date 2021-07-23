<template>
  <b-card title="Entradas" :class="listClass">
    <hr />
    <b-table
      id="result-table"
      striped
      hover
      bordered
      :items="bets"
      :fields="betFields"
      :per-page="perPage"
      :current-page="currentPage"
      v-if="!loadingBets"
    >
      <template #cell(date)="data">{{
        getDateFormatted(data.item.date)
      }}</template>
      <template #cell(sport)="data">{{ data.item.sport }}</template>
      <template #cell(eventDescription)="data">{{
        data.item.eventDescription
      }}</template>
      <template #cell(league)="data">{{ data.item.league }}</template>
      <template #cell(method)="data">{{ data.item.method }}</template>
      <template #cell(stake)="data"
        >$ {{ formattedDecimalValue(data.item.stake) }}</template
      >
      <template #cell(profitLoss)="data">
        $ {{ formattedDecimalValue(data.item.profitLoss) }}</template
      >
      <template #cell(roi)="data"
        >{{ formattedDecimalValue(data.item.roi) }}%</template
      >
      <template #cell(goalsScored)="data">{{ data.item.goalsScored }}</template>
      <template #cell(goalsConceded)="data">{{
        data.item.goalsConceded
      }}</template>
      <template #cell(editDelete)="data">
        <div class="edit-column">
          <i
            class="result-edit-icon fa fa-pencil-square-o"
            @click="showEditModal(data)"
          ></i>
          <i
            class="fa fa-trash-o result-delete-icon"
            aria-hidden="true"
            @click="showDeleteModal(data)"
          ></i>
        </div>
      </template>
    </b-table>
    <div class="loading-spinner" v-else>
      <b-spinner variant="secondary"></b-spinner>
    </div>
    <template v-if="toggleEdit">
      <ResultsBetModal
        :bet="bet"
        :formattedDecimalValue="formattedDecimalValue"
        :methods="methods"
        :leagues="leagues"
        @updateBet="updateBet"
      />
    </template>

    <template v-if="toggleDelete">
      <ResultsConfirmModal @deleteBet="deleteBet" />
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
import ResultsConfirmModal from "./ResultsConfirmModal";
import { format, parseISO, addHours } from "date-fns";

export default {
  props: [
    "showResults",
    "bets",
    "methods",
    "leagues",
    "loadingBets",
    "formattedDecimalValue",
  ],
  components: { ResultsBetModal, ResultsConfirmModal },
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
          key: "sport",
          label: "Esporte",
        },
        {
          key: "eventDescription",
          label: "Jogo",
        },
        {
          key: "league",
          label: "Campeonato",
        },
        {
          key: "method",
          label: "Método",
        },
        {
          key: "stake",
          label: "Stake",
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
          key: "editDelete",
          label: "",
        },
      ],
      perPage: 20,
      currentPage: 1,
      bet: {},
      toggleEdit: false,
      toggleDelete: false,
    };
  },
  methods: {
    getBets() {
      this.$emit("getBets");
    },
    updateBet(bet) {
      this.$emit("updateBet", bet);
    },
    async showEditModal(data) {
      this.bet = data.item;

      await this.mountEditModal();
      this.$bvModal.show("bet-edit-modal");
    },
    async showDeleteModal(data) {
      this.bet = data.item;
      await this.mountDeleteModal();
      this.$bvModal.show("bet-delete-modal");
    },
    async deleteBet() {
      this.$emit("deleteBet", this.bet.id);
    },
    getDateFormatted(date) {
      return format(addHours(parseISO(date), 3), "dd/MM/yyyy");
    },
    mountEditModal() {
      this.toggleEdit = true;
    },
    mountDeleteModal() {
      this.toggleDelete = true;
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
  padding: 30px !important;
}

.results-list-half {
  width: 55%;
  transition: 0.5s width;
}

#result-table {
  margin-top: 15px;
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

.edit-column > i {
  cursor: pointer;
}

.result-delete-icon {
  margin-left: 7px;
  margin-bottom: 2px;
}

.edit-result {
  cursor: pointer;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  margin: 50px 0px;
}

.loading-spinner > span {
  height: 100px;
  width: 100px;
}
</style>