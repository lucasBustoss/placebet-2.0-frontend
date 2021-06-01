<template>
  <div>
    <Header />
    <Menu />
    <Content />
  </div>
</template>

<script>
import api from "./config/api";

import { mapMutations } from "vuex";

import { userKey } from "@/global";

import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";

export default {
  name: "App",
  components: {
    Header,
    Content,
    Menu,
  },
  methods: {
    ...mapMutations(["setUser"]),
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", userData);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" }).catch(() => {});
        return;
      }

      const res = await api.post("/sessions/validate", userData);

      if (res.data && res.data.message) {
        this.setUser(userData);
      } else {
        this.$store.commit("setUser", null);
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" }).catch(() => {});
      }

      this.validatingToken = false;
    },
  },
  async created() {
    await this.validateToken();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
