<template>
  <div class="auth">
    <b-form @submit="submit">
      <b-form-group id="input-group-1" label="Usuário:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="password"
          v-model="user.username"
          placeholder="Digite seu usuário"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Senha:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="user.password"
          placeholder="Digite sua senha"
          required
        ></b-form-input>
      </b-form-group>

      <b-button class="auth-submit-button" type="submit" variant="warning">
        Entrar
      </b-button>
    </b-form>
  </div>
</template>

<script>
import api from "@/config/api";
import { userKey, showError } from "@/global";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    async submit(event) {
      try {
        event.preventDefault();

        const response = await api.post("/sessions/auth", this.user);

        if (response.status === 200) {
          console.log("loguei");
          this.setUser(response.data);

          localStorage.setItem(userKey, JSON.stringify(response.data));
          this.$router.push({ name: "home" });
        }
      } catch (e) {
        showError(e);
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth-submit-button {
  margin-top: 20px;
  width: 100%;
}
</style>