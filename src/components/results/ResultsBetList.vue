<template>
  <b-card title="Entradas" class="results-list-full">
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
      <template #cell(stake)="data">
        <div v-if="showResults">
          {{ moneySymbol }} {{ formatDecimal(decimalType, data.item.stake) }}
        </div>
        <div v-else>-</div>
      </template>
      <template #cell(profitLoss)="data">
        <div :class="'result-table-value ' + getClassByResult(data.item.roi)">
          <div v-if="showResults">
            {{ moneySymbol }}
            {{ formatDecimal(decimalType, data.item.profitLoss) }}
          </div>
          <div v-else>-</div>
        </div>
      </template>
      <template #cell(roi)="data"
        ><div :class="'result-table-value ' + getClassByResult(data.item.roi)">
          <div v-if="showResults">
            {{ formatDecimal(decimalType, data.item.roi) }}%
          </div>
          <div v-else>-</div>
        </div>
      </template>
      <template #cell(goalsScored)="data">
        <div v-if="showResults">{{ data.item.goalsScored }}</div>
        <div v-else>-</div>
      </template>
      <template #cell(goalsConceded)="data">
        <div v-if="showResults">{{ data.item.goalsConceded }}</div>
        <div v-else>-</div>
      </template>
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
import { mapGetters } from "vuex";
import { mixin } from "@/mixins";

export default {
  mixins: [mixin],
  props: ["showResults", "bets", "methods", "leagues", "loadingBets"],
  components: { ResultsBetModal, ResultsConfirmModal },
  computed: {
    ...mapGetters(["moneySymbol", "decimalType"]),
    rows() {
      return this.bets.length;
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
    getClassByResult(result) {
      if (this.showResults) {
        if (result > 0) return "result-green";
        if (result < 0) return "result-red";
      }
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

#result-table {
  margin-top: 15px;
}

.result-table-value {
  font-weight: bold;
}

.result-green {
  color: green !important;
}

.result-red {
  color: rgb(197, 1, 1) !important;
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