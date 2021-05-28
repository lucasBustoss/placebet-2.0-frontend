<template>
  <header class="header">
    <div class="header-container container-link">
      <a v-b-toggle.sidebar-backdrop class="container-link-icon">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    <div class="header-container container-title">
      <h1 class="title">Placebet</h1>
    </div>
    <div class="header-container container-usermenu">
      <b-button @click.prevent="logout">Sair</b-button>
    </div>
  </header>
</template>

<script>
import { userKey } from "@/global";

export default {
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #aaa;
  background: #999;
  color: white;
}

.header-container {
  display: flex;
  width: 33%;
  height: 60px;
  align-items: center;
  padding: 0 40px;
}

.container-link-icon {
  cursor: pointer;
  transition: 0.3s all;
  color: white;
}

.container-link-icon:hover {
  color: rgba(255, 255, 255, 0.6);
}

.container-title {
  justify-content: center;
}

.container-usermenu {
  justify-content: flex-end;
}
</style>