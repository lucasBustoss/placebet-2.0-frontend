<template>
  <b-card class="daily-chart">
    <h2 class="daily-chart-title">Evolução do lucro no mês</h2>
    <hr />

    <div class="daily-chart-content">
      <div v-if="!isLoading"></div>
      <b-spinner
        v-else
        class="daily-chart-loading"
        variant="secondary"
      ></b-spinner>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["isLoading"],
};
</script>

<style>
.daily-chart {
  display: flex;
  width: 65%;
  background: #fff;
}

.daily-chart-title {
  font-size: 1.3em;
}

.daily-chart-content {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.daily-chart-loading {
  height: 70px;
  width: 70px;
}
</style>