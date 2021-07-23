<template>
  <b-card class="monthly-chart">
    <h2 class="monthly-chart-title">Evolução do lucro no mês</h2>
    <hr />

    <div class="monthly-chart-content">
      <div class="montly-chart-content-component" v-if="!isLoading">
        <MonthlyChartComponent />
      </div>
      <b-spinner
        v-else
        class="monthly-chart-loading"
        variant="secondary"
      ></b-spinner>
    </div>

    <!-- <Bar :chartdata="chartdata" :options="options" /> -->
  </b-card>
</template>

<script>
import MonthlyChartComponent from "./Charts/Monthly.vue";

export default {
  props: ["isLoading"],
  components: { MonthlyChartComponent },
};
</script>

<style>
.monthly-chart {
  display: flex;
  width: 95%;
  background: #fff;
  padding-bottom: 30px;
}

.monthly-chart-title {
  font-size: 1.3em;
}

.monthly-chart-content {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.montly-chart-content-component {
  width: 100%;
}

.monthly-chart-loading {
  height: 70px;
  width: 70px;
}
</style>