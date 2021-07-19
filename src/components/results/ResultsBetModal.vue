<template>
  <div>
    <b-modal
      id="bet-edit-modal"
      centered
      size="lg"
      :header-bg-variant="bet.profitLoss > 0 ? 'success' : 'danger'"
      header-text-variant="light"
      body-bg-variant="light"
      footer-bg-variant="light"
      modal-ok="salvar"
      :title="bet.eventDescription + ' - ' + bet.marketDesc"
    >
      <div class="modal-row">
        <b-form-group
          label="Data"
          label-for="input-date"
          class="mb-0 modalbet-date"
        >
          <b-form-input
            disabled
            id="input-date"
            :value="formattedDate(bet.date)"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Jogo"
          label-for="input-event"
          class="mb-0 modalbet-event"
        >
          <b-form-input
            disabled
            id="input-event"
            :value="bet.eventDescription"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Stake (R$)"
          label-for="input-stake"
          class="mb-0 modalbet-goals"
        >
          <b-form-input id="input-stake" v-model="selectedStake"></b-form-input>
        </b-form-group>

        <b-form-group
          label="Resultado"
          label-for="input-profitloss"
          class="mb-0 modalbet-profitloss"
        >
          <b-form-input
            disabled
            id="input-profitloss"
            :value="'R$ ' + formattedDecimalValue(bet.profitLoss)"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="ROI(%)"
          label-for="input-roi"
          class="mb-0 modalbet-roi"
        >
          <b-form-input
            disabled
            id="input-roi"
            :value="formattedDecimalValue(bet.roi) + '%'"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="modal-row"></div>
      <div class="modal-row">
        <b-form-group
          label="Estratégia"
          label-for="input-method"
          class="mb-0 modalbet-method-league"
        >
          <b-form-input
            v-model="selectedMethod"
            autocomplete="off"
            list="methods-list"
            :state="existsMethodName"
          ></b-form-input>
          <datalist id="methods-list">
            <option>Não selecionar</option>
            <option v-for="method in methods" :key="method.id">
              {{ method.name }}
            </option>
          </datalist>
        </b-form-group>
        <b-form-group
          label="Campeonato"
          label-for="input-method"
          class="mb-0 modalbet-method-league"
        >
          <b-form-input
            v-model="selectedLeague"
            autocomplete="off"
            list="leagues-list"
            :state="existsLeagueName"
          ></b-form-input>
          <datalist id="leagues-list">
            <option>Não selecionar</option>
            <option v-for="league in leagues" :key="league.id">
              {{ league.name }}
            </option>
          </datalist>
        </b-form-group>
        <b-form-group
          label="Gols pegos"
          label-for="input-goalscored"
          class="mb-0 modalbet-goals"
        >
          <b-form-input
            id="input-goalscored"
            v-model="goalsScored"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Gols tomados"
          label-for="input-goalconceded"
          class="mb-0 modalbet-goals"
        >
          <b-form-input
            id="input-goalconceded"
            v-model="goalsConceded"
          ></b-form-input>
        </b-form-group>
      </div>
      <template #modal-footer>
        <div class="betmodal-footer">
          <b-button variant="danger" @click="hideModal" size="md">
            Cancelar
          </b-button>
          <b-button variant="success" @click="updateBet" size="md">
            Atualizar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";

import { showError } from "@/global";

export default {
  props: ["bet", "methods", "leagues", "formattedDecimalValue"],
  computed: {
    getMethodNames() {
      return this.methods.map((m) => m.name);
    },
    getLeagueNames() {
      return this.leagues.map((m) => m.name);
    },
    existsMethodName() {
      return (
        this.methods.filter((m) => m.name === this.selectedMethod).length > 0 ||
        this.selectedMethod === "Não selecionar"
      );
    },
    existsLeagueName() {
      return (
        this.leagues.filter((m) => m.name === this.selectedLeague).length > 0 ||
        this.selectedLeague === "Não selecionar"
      );
    },
  },
  data() {
    return {
      selectedStake: this.bet.stake,
      selectedMethod: this.bet.method || null,
      selectedLeague: this.bet.league || null,
      goalsScored: this.bet.goalsScored ? this.bet.goalsScored : "0",
      goalsConceded: this.bet.goalsConceded ? this.bet.goalsConceded : "0",
    };
  },
  methods: {
    formattedDate(value) {
      return format(parseISO(value), "dd/MM/yyyy");
    },
    async updateBet() {
      if (this.existsMethodName && this.existsLeagueName) {
        await this.$emit("updateBet", {
          id: this.bet.id,
          stake: this.selectedStake,
          method:
            this.selectedMethod === "Não selecionar"
              ? null
              : this.selectedMethod,
          league:
            this.selectedLeague === "Não selecionar"
              ? null
              : this.selectedLeague,
          goalsScored: this.goalsScored,
          goalsConceded: this.goalsConceded,
        });

        this.hideModal();
      } else if (!this.existsMethodName) {
        showError("Selecione um método válido");
        return;
      } else if (!this.existsLeagueName) {
        showError("Selecione uma liga válida");
        return;
      }
    },
    hideModal() {
      this.$bvModal.hide("bet-edit-modal");
    },
  },
};
</script>

<style>
.modal-row {
  display: flex;
  justify-content: space-between;
}

.modal-row:not(:first-child) {
  margin-top: 10px;
}

.modalbet-date {
  width: 14.5%;
}

.modalbet-event {
  width: 37%;
}

.modalbet-profitloss,
.modalbet-roi {
  width: 16%;
}

.modalbet-method-league {
  width: 35%;
}

input::-webkit-calendar-picker-indicator {
  display: none !important;
}

.modalbet-select {
  padding: 6.5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modalbet-method-select {
  width: 100%;
}

.modalbet-league-select {
  width: 100%;
}

.modalbet-goals {
  width: 14%;
}

.form-control:focus {
  box-shadow: none;
  border: 1px solid #ced4da;
}

.betmodal-footer {
  display: flex;
  justify-content: flex-end;
}

.betmodal-footer > button {
  margin-left: 15px;
}

.betmodal-footer > .btn-outline-success:focus,
.betmodal-footer > .btn-outline-success:active {
  box-shadow: none;
  border: 1px solid #198754;
}

.betmodal-footer > .btn-outline-danger:focus,
.betmodal-footer > .btn-outline-danger:active {
  box-shadow: none;
  border: 1px solid #dc3545;
}

/* DROPDOWN */

.method-dropdown {
  width: 100%;
}

.method-dropdown > .btn-outline-secondary:hover {
  background: inherit;
  color: inherit;
}

.method-dropdown > .btn-outline-secondary:focus,
.method-dropdown > .btn-outline-secondary:active {
  background: inherit;
  box-shadow: none;
  color: #6c757d;
  border: 1px solid #6c757d;
  cursor: default;
}

.dropdown-toggle-split:focus,
.dropdown-toggle-split:active {
  color: white;
  border: 1px solid #6c757d;
  box-shadow: none;
}

.dropdown-item:active {
  background: #6c757d;
}
</style>