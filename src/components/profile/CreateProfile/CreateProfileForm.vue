<template>
  <div class="create-profile-form">
    <b-form @submit.stop.prevent>
      <h2>Informação do usuário</h2>

      <div class="create-profile-form-row">
        <b-form-group
          id="input-group-1"
          label="Usuário"
          class="create-profile-form-infoBetfair"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="email"
            disabled
            :value="username"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Nome"
          label-for="input-2"
          class="create-profile-form-infoBetfair"
        >
          <b-form-input id="input-2" v-model="name" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="E-mail"
          label-for="input-2"
          class="create-profile-form-infoBetfair"
        >
          <b-form-input
            id="input-2"
            v-model="email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>
      </div>

      <hr />

      <h2>Banca</h2>
      <div class="create-profile-form-row">
        <b-form-group
          id="input-group-3"
          label="Moeda"
          class="create-profile-form-infobank"
          label-for="input-3"
        >
          <b-form-select
            class="infobetfair-currency"
            v-model="money"
            :options="moneyOptions"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Banca inicial"
          label-for="input-4"
          class="create-profile-form-infobank"
        >
          <b-form-input
            type="number"
            v-model="startBank"
            id="input-4"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Banca inicial Betfair"
          label-for="input-2"
          class="create-profile-form-infobank"
        >
          <b-form-input
            id="input-5"
            v-model="startBetfairBank"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" class="create-profile-form-infobank">
          <label for="input-6"
            >Data de início
            <span
              v-b-tooltip.hover
              title="Informe a data de referência para integração das propostas"
            >
              <i class="fa fa-info-circle date-info" aria-hidden="true"></i>
            </span>
          </label>
          <b-form-input
            id="input-6"
            aria-describedby="input-live-feedback"
            class="create-profile-form-date"
            :state="isValidDate"
            v-model="date"
            type="date"
            placeholder="(dd/MM/yyyy)"
            required
          ></b-form-input>
        </b-form-group>
      </div>

      <hr />

      <h2>Preferências</h2>
      <div class="create-profile-form-row">
        <b-form-group
          id="input-group-7"
          label="Tipo de número"
          class="create-profile-form-infoBetfair"
          label-for="input-7"
        >
          <b-form-select
            class="infobetfair-currency"
            v-model="number"
            :options="numberOptions"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-8"
          label="Stake padrão"
          label-for="input-8"
          class="create-profile-form-infoBetfair"
        >
          <b-form-input
            id="input-8"
            v-model="stake"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-9"
          label="Tipo de visibilidade padrão"
          label-for="input-9"
          class="create-profile-form-infoBetfair"
        >
          <div class="create-profile-form-visibility">
            <b-form-radio
              v-model="visibility"
              class="form-visibility-option"
              name="some-radios"
              :value="1"
              >Mostrar resultados</b-form-radio
            >
            <b-form-radio
              v-model="visibility"
              name="some-radios"
              class="form-visibility-option"
              :value="0"
              >Esconder resultados</b-form-radio
            >
          </div>
        </b-form-group>
      </div>

      <div class="create-profile-form-button">
        <b-button type="reset" variant="danger" @click="cancelCreate"
          >Cancelar</b-button
        >
        <b-button type="submit" variant="warning" @click="createProfile">
          <b-spinner
            class="spinner-loading-create"
            variant="secondary"
            v-if="isLoading"
          ></b-spinner>
          <div v-else>Criar perfil</div>
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { parseISO } from "date-fns";

export default {
  props: ["username", "isLoading"],
  computed: {
    isValidDate() {
      if (this.date === "") return null;

      return parseISO(this.date) <= new Date();
    },
  },
  data() {
    return {
      moneyOptions: [
        { value: "usd", text: "Dólar (USD)" },
        { value: "eur", text: "Euro (EUR)" },
        { value: "brl", text: "Real (BRL)" },
      ],
      numberOptions: [
        { value: 1, text: "100.001,01 (Padrão universal)" },
        { value: 2, text: "100,001.01 (Padrão americano)" },
      ],
      name: "",
      email: "",
      money: "brl",
      startBank: 0,
      startBetfairBank: 0,
      date: "",
      number: 1,
      stake: 0,
      visibility: 0,
    };
  },
  methods: {
    cancelCreate() {
      this.$emit("cancelCreate");
    },
    createProfile() {
      this.$emit("createProfile", {
        name: this.name,
        email: this.email,
        money: this.money,
        startBank: this.startBank,
        startBetfairBank: this.startBetfairBank,
        date: this.date,
        number: this.number,
        stake: this.stake,
        visibility: this.visibility,
      });
    },
  },
};
</script>

<style>
.create-profile-form {
  padding: 30px;
  border: 1px solid #aaa;
  border-radius: 10px;
  margin-top: 30px;
  width: 90%;
}

.create-profile-form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.create-profile-form-infoBetfair {
  width: 32.5%;
  padding-top: 10px;
}

.create-profile-form-infobank {
  width: 24.5%;
  padding-top: 10px;
}

.create-profile-form-date::placeholder {
  font-style: italic !important;
  font-size: 0.9em;
}

.infobetfair-currency {
  padding: 6px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d2d2d2;
}

.create-profile-form-visibility {
  display: flex;
  margin-top: 8px;
}

.form-visibility-option > label {
  padding-left: 5px;
}

.form-visibility-option:not(:first-of-type) {
  margin-left: 15px;
}

.create-profile-form-button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
}

.create-profile-form-button > button:not(:first-of-type) {
  margin-left: 20px;
}

.date-info {
  color: #777;
}

.spinner-loading-create {
  font-size: 1em;
  height: 18px;
  width: 18px;
  margin-top: 6px;
}
</style>