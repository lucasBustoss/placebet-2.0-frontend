<template>
  <div class="month-filter">
    <b-button squared variant="outline-warning" @click="getPreviousMonth">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </b-button>
    <b-button squared variant="outline-warning" class="options-date-selector">
      <div>{{ monthName }}</div>
    </b-button>

    <b-button squared variant="outline-warning" @click="getNextMonth">
      <i class="fa fa-arrow-right" aria-hidden="true"></i>
    </b-button>
  </div>
</template>

<script>
import { addMonths, startOfMonth, parseISO } from "date-fns";

export default {
  props: ["selectedMonth"],
  computed: {
    monthName() {
      if (this.months && this.months.length > 0) {
        const month = this.months.filter((m) => m.value === this.selectedMonth);
        return month[0].text;
      }

      return "Mês atual";
    },
  },
  data() {
    return {
      months: [
        { value: "2021-01-01", text: "Janeiro" },
        { value: "2021-02-01", text: "Fevereiro" },
        { value: "2021-03-01", text: "Março" },
        { value: "2021-04-01", text: "Abril" },
        { value: "2021-05-01", text: "Maio" },
        { value: "2021-06-01", text: "Junho" },
        { value: "2021-07-01", text: "Julho" },
        { value: "2021-08-01", text: "Agosto" },
        { value: "2021-09-01", text: "Setembro" },
        { value: "2021-10-01", text: "Outubro" },
        { value: "2021-11-01", text: "Novembro" },
        { value: "2021-12-01", text: "Dezembro" },
      ],
    };
  },
  methods: {
    async getPreviousMonth() {
      await this.$emit(
        "changeMonth",
        addMonths(startOfMonth(parseISO(this.selectedMonth)), -1)
      );
    },
    async getNextMonth() {
      await this.$emit(
        "changeMonth",
        addMonths(startOfMonth(parseISO(this.selectedMonth)), 1)
      );
    },
  },
};
</script>

<style>
.month-filter > button:focus {
  box-shadow: none;
}

.month-filter > button:focus {
  border: 1px solid #ffc107;
}

.month-filter {
  display: flex;
  padding: 10px;
  width: 100%;
  justify-content: flex-end;
}
</style>