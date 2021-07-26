<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["labels", "chartData1", "chartData2", "stepSize", "maxSize"],
  watch: {
    chart1: {
      deep: true,
      handler() {
        this.render();
      },
    },
    chart2: {
      deep: true,
      handler() {
        this.render();
      },
    },
    chartDataset: {
      deep: true,
      handler() {
        this.render();
      },
    },
  },
  data() {
    return {
      gradient: null,
      gradient2: null,
      chart1: {},
      chart2: {},
      chartDataset: [],
    };
  },
  methods: {
    render() {
      this.renderChart(
        {
          labels: this.labels,
          datasets: this.chartDataset,
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: this.stepSize,
                  max: this.maxSize,
                },
              },
            ],
          },
        }
      );
    },
  },
  async mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    if (this.chartData1) {
      this.gradient.addColorStop(0, this.chartData1.gradient1);
      this.gradient.addColorStop(0.5, this.chartData1.gradient2);
      this.gradient.addColorStop(1, this.chartData1.gradient3);

      this.chart1.label = this.chartData1.labelName;
      this.chart1.borderColor = this.chartData1.borderColor;
      this.chart1.pointBackgroundColor = "white";
      this.chart1.borderWidth = 1;
      this.chart1.pointBorderColor = this.chartData1.pointBorderColor;
      this.chart1.backgroundColor = this.gradient;
      this.chart1.data = this.chartData1.data;

      this.chartDataset.push(this.chart1);
    }

    if (this.chartData2) {
      this.gradient2.addColorStop(0, this.chartData2.gradient1);
      this.gradient2.addColorStop(0.5, this.chartData2.gradient2);
      this.gradient2.addColorStop(1, this.chartData2.gradient3);

      this.chart2.label = this.chartData2.labelName;
      this.chart2.borderColor = this.chartData2.borderColor;
      this.chart2.pointBackgroundColor = "white";
      this.chart2.borderWidth = 1;
      this.chart2.pointBorderColor = this.chartData2.pointBorderColor;
      this.chart2.backgroundColor = this.gradient2;
      this.chart2.data = this.chartData2.data;

      this.chartDataset.push(this.chart2);
    }
  },
};
</script>
