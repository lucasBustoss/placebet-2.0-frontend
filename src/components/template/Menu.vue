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
        <router-link to="results">
          <div class="sidebar-option">Resultados</div>
        </router-link>
      </b-sidebar>
    </h1>
  </header>
</template>

<script>
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

.sidebar-option {
  padding: 12px;
  transition: 0.3s all;
}

.sidebar-option:hover {
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.router-link-active,
.router-link-active:hover,
.router-link-active > a,
.b-sidebar-body > a,
.b-sidebar-body > a:hover {
  color: #555;
  text-decoration: none;
}
</style>