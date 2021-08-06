<template>
  <div>
    <Header />
    <Menu />
    <div v-if="validatingToken" class="loading-spinner">
      <b-spinner variant="secondary"></b-spinner>
    </div>
    <Content v-else />
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
  data() {
    return {
      validatingToken: true,
      // validatingToken: false,
    };
  },
  methods: {
    ...mapMutations(["setUser", "setHeaders"]),
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", userData.user);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" }).catch(() => {});
        return;
      }

      const res = await api.post("/sessions/validate", userData);

      if (res.data && res.data.message) {
        this.setHeaders(userData);

        const userResponse = await api.get("/users", {
          params: {
            user_id: userData.user.id,
          },
        });

        this.setUser(userResponse.data);
      } else {
        this.$store.commit("setHeaders", null);
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

.loading-spinner {
  width: 400px;
  height: 400px;
  display: flex;
  width: 100% !important;
  justify-content: center;
  align-items: center;
}
</style>
