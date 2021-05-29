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
      console.log("to validando");
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", userData);

      console.log(userData);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" }).catch(() => {});
        return;
      }

      const res = await api.post("/sessions/validate", userData);

      console.log(res.data);

      if (res.data) {
        console.log("entrei no data");
        this.setUser(userData);
      } else {
        console.log("token falso");
        this.$store.commit("setUser", null);
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" }).catch(() => {});
      }

      this.validatingToken = false;
    },
  },
  created() {
    this.validateToken();
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
