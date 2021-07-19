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
      :title="bet.eventDescription"
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
            :value="bet.date"
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
      </div>
      <div class="modal-row">
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
      <div class="modal-row">
        <b-form-group
          label="Estratégia"
          label-for="input-method"
          class="mb-0 modalbet-method"
        >
          <b-dropdown
            split
            split-variant="outline-secondary"
            variant="secondary"
            class="method-dropdown"
            disabled
            :text="getTextDropdown"
          >
            <b-dropdown-item
              v-for="method in methods"
              @click="setMethod(method.name)"
              :key="method.id"
              >{{ method.name }}</b-dropdown-item
            >
          </b-dropdown>
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
import api from "@/config/api";
import { showError } from "@/global";

export default {
  props: ["bet", "methods", "formattedDecimalValue"],
  computed: {
    getTextDropdown() {
      return this.selectedMethod;
    },
  },
  data() {
    return {
      selectedMethod: this.bet.method,
      goalsScored: this.bet.goalsScored ? this.bet.goalsScored : "0",
      goalsConceded: this.bet.goalsConceded ? this.bet.goalsConceded : "0",
    };
  },
  methods: {
    setMethod(method) {
      this.selectedMethod = method;
    },
    async updateBet() {
      try {
        const objMethod = this.methods.filter(
          (m) => m.name === this.selectedMethod
        );

        await api.patch("/bets", {
          eventId: this.bet.eventId,
          marketIds: this.bet.marketIds,
          method_id: objMethod[0].id,
          goalsScored: this.goalsScored,
          goalsConceded: this.goalsConceded,
        });

        await this.$emit("loadBets");
        this.hideModal();
      } catch (err) {
        console.log(err);
        showError(err);
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
  width: 30%;
}

.modalbet-event {
  width: 69%;
}

.modalbet-profitloss,
.modalbet-roi {
  width: 49.5%;
}

.modalbet-method {
  width: 50%;
}

.modalbet-goals {
  width: 24.5%;
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