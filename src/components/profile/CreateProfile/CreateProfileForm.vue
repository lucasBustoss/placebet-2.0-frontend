<template>
  <div class="create-profile-form">
    <b-form>
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
          <b-form-input id="input-2" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="E-mail"
          label-for="input-2"
          class="create-profile-form-infoBetfair"
        >
          <b-form-input id="input-2" required></b-form-input>
        </b-form-group>
      </div>

      <hr />

      <h2>Banca</h2>
      <div class="create-profile-form-row">
        <b-form-group
          id="input-group-1"
          label="Moeda"
          class="create-profile-form-infobank"
          label-for="input-1"
        >
          <b-form-select
            class="infobetfair-currency"
            v-model="selected"
            :options="options"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Banca inicial"
          label-for="input-2"
          class="create-profile-form-infobank"
        >
          <b-form-input id="input-2" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Banca inicial Betfair"
          label-for="input-2"
          class="create-profile-form-infobank"
        >
          <b-form-input id="input-2" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Data de início"
          label-for="input-2"
          class="create-profile-form-infobank"
        >
          <b-form-input id="input-2" required></b-form-input>
        </b-form-group>
      </div>

      <hr />

      <h2>Preferências</h2>
      <div class="create-profile-form-row">
        <b-form-group
          id="input-group-1"
          label="Tipo de número"
          class="create-profile-form-infoBetfair"
          label-for="input-1"
        >
          <b-form-select
            class="infobetfair-currency"
            v-model="selected"
            :options="options"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Stake padrão"
          label-for="input-2"
          class="create-profile-form-infoBetfair"
        >
          <b-form-input id="input-2" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Tipo de visibilidade"
          label-for="input-2"
          class="create-profile-form-infoBetfair"
        >
          <b-form-input id="input-2" required></b-form-input>
        </b-form-group>
      </div>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: ["username"],
  data() {
    return {
      options: [
        { value: "usd", text: "Dólar (USD)" },
        { value: "eur", text: "Euro (EUR)" },
        { value: "brl", text: "Real (BRL)" },
      ],
    };
  },
};
</script>

<style>
.create-profile-form {
  padding: 30px;
  border: 1px solid #aaa;
  border-radius: 10px;
  margin-top: 30px;
  width: 80%;
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

.infobetfair-currency {
  padding: 6px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d2d2d2;
}
</style>