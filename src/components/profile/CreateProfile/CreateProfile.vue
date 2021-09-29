<template>
  <div class="create-profile">
    <div class="create-profile-header">
      <h1 class="create-profile-header-title">Criar perfil</h1>
    </div>

    <hr />
    <div class="create-profile-form-container">
      <CreateProfileForm
        :username="username"
        :isLoading="isLoading"
        @cancelCreate="cancelCreate"
        @createProfile="createProfile"
      />
    </div>
  </div>
</template>

<script>
import { userKey } from "@/global";
import CreateProfileForm from "./CreateProfileForm";
import { showError, showSuccess } from "@/global";

import api from "@/config/api";

import { parseISO } from "date-fns";
import { mapMutations } from "vuex";

export default {
  props: ["username", "appKey"],
  components: { CreateProfileForm },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    cancelCreate() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },
    async createProfile(profile) {
      try {
        this.isLoading = true;

        if (this.validateFields(profile)) {
          const response = await api.post("/users", {
            username: this.username,
            appKey: this.appKey,
            name: profile.name,
            email: profile.email,
            money: profile.money,
            startBank: profile.startBank,
            startBetfairBank: profile.startBetfairBank,
            date: profile.date,
            number: profile.number,
            stake: profile.stake,
            visibility: profile.visibility,
          });

          const { user } = response.data;
          this.setUser(user);

          this.$router.push({ name: "home" });

          showSuccess("Perfil criado com sucesso!");
          this.isLoading = false;
        }
      } catch (err) {
        this.isLoading = false;

        console.log(err);
        showError(err.message);
      }
    },
    validateFields(profile) {
      let validate = false;

      if (profile.name === "") {
        throw new Error("O nome não pode estar vazio!");
      }

      if (profile.email === "") {
        throw new Error("O e-mail não pode estar vazio!");
      }

      if (profile.startBank === 0) {
        throw new Error("O valor inicial da banca não pode ser 0!");
      }

      if (profile.startBetfairBank === 0) {
        throw new Error("O valor inicial da banca na Betfair não pode ser 0!");
      }

      if (profile.date === "") {
        throw new Error("Por favor, informe uma data em formato válido!");
      }

      if (parseISO(profile.date) > new Date()) {
        throw new Error(
          "Não é possível informar uma data de início maior que a data atual!"
        );
      }

      if (profile.stake === 0) {
        throw new Error("Sua stake padrão não pode ser igual a 0!");
      }

      validate = true;
      return validate;
    },
  },
};
</script>

<style>
.create-profile {
  padding: 20px;
}

.create-profile-header {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1em;
  width: 30%;
}

.create-profile-header-title {
  font-size: 1.7em;
  width: 100%;
}

.create-profile-form-container {
  display: flex;
  justify-content: center;
}
</style>