<template>
  <b-card class="monthly-chart">
    <h2 class="monthly-chart-title">{{ chartTitle }}</h2>
    <hr />

    <div class="monthly-chart-content">
      <div class="montly-chart-content-component" v-if="!isLoading">
        <MonthlyChartComponent
          :chartData1="chartData1"
          :chartData2="chartData2"
          :stepSize="stepSize"
          :maxSize="maxSize"
          :labels="labels"
        />
      </div>
      <b-spinner
        v-else
        class="monthly-chart-loading"
        variant="secondary"
      ></b-spinner>
    </div>
  </b-card>
</template>

<script>
import MonthlyChartComponent from "./Charts/Monthly";

export default {
  props: [
    "chartTitle",
    "isLoading",
    "labels",
    "chartData1",
    "chartData2",
    "stepSize",
    "maxSize",
  ],
  components: { MonthlyChartComponent },
  data() {
    return {
      isLoadingChart: true,
    };
  },
  methods: {
    teste() {
      console.log(this.chartData1);
    },
    toggleChartLoading() {
      console.log("ae");
      this.isLoadingChart = false;
    },
  },
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