<template>
  <header class="menu-header">
    <h1 class="menu-title">
      <b-sidebar
        id="sidebar-backdrop"
        title="Placebet"
        backdrop-variant="secondary"
        header-class="sidebar-header"
        backdrop
        shadow
      >
        <router-link to="/">
          <div class="sidebar-option">Home</div>
        </router-link>
        <router-link :to="{ name: 'results' }">
          <div class="sidebar-option">Resultados</div>
        </router-link>
        <div
          v-b-toggle.collapse-1
          class="sidebar-option"
          @click="toggleCollapseIcon"
        >
          <div>Relatórios</div>
          <div>
            <i
              class="fa fa-angle-up"
              v-if="toggleCollapse"
              aria-hidden="true"
            ></i>
            <i class="fa fa-angle-down" v-else aria-hidden="true"></i>
          </div>
        </div>

        <b-collapse id="collapse-1" class="collapse-options">
          <router-link
            class="collapse-options-link"
            :to="{ name: 'reportMonthly' }"
          >
            <div class="sidebar-option-collapse">Resultado mensal</div>
          </router-link>
          <router-link
            class="collapse-options-link"
            :to="{ name: 'reportMethods' }"
          >
            <div class="sidebar-option-collapse">Estratégias</div>
          </router-link>
          <router-link
            class="collapse-options-link"
            :to="{ name: 'reportBankroll' }"
          >
            <div class="sidebar-option-collapse">Crescimento de banca</div>
          </router-link>
        </b-collapse>

        <router-link :to="{ name: 'methods' }">
          <div class="sidebar-option">Estratégias</div>
        </router-link>

        <router-link :to="{ name: 'leagues' }">
          <div class="sidebar-option">Campeonatos</div>
        </router-link>
      </b-sidebar>
    </h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      toggleCollapse: false,
    };
  },
  methods: {
    toggleCollapseIcon() {
      this.toggleCollapse = !this.toggleCollapse;
    },
  },
};
</script>

<style>
.sidebar-header,
.b-icon {
  background: #777;
  color: #fff;
}

.b-sidebar > .b-sidebar-header {
  padding: 20px !important;
}

.b-sidebar {
  font-size: 1.2rem;
}

.sidebar-collapse-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-option {
  padding: 12px;
  transition: 0.5s all;
  color: #555;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-option-collapse {
  padding: 15px;
  transition: 0.5s all;
  font-size: 0.8em;
  padding-left: 25px;
}

.sidebar-option:hover,
.sidebar-option-collapse:hover {
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.collapse-options {
  transition: 0.6s all;
  background: #dadada;
  margin: 0;
}

.router-link-active,
.router-link-active:hover,
.router-link-active > a,
.b-sidebar-body > a,
.b-sidebar-body > a:hover,
.collapse-options-link,
.collapse-options-link:hover {
  color: #555 !important;
  text-decoration: none !important;
}
</style>