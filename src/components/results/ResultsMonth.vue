<template>
  <b-card title="Resultados do mês" class="results-perday">
    <div>
      <b-table
        id="result-perday-table"
        bordered
        small
        hover
        :items="results"
        :fields="resultFields"
        :tbody-tr-class="rowClass"
      ></b-table>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["showResults", "results"],
  data() {
    return {
      resultFields: [
        {
          key: "date",
          label: "Data",
        },
        {
          key: "profitLossFormatted",
          label: "Resultado (R$)",
        },
        {
          key: "roiFormatted",
          label: "ROI (%)",
        },
      ],
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (Number(item.profitLoss) > 0) return "table-success";
      if (Number(item.profitLoss) < 0) return "table-danger";
    },
  },
};
</script>

<style>
.results-perday {
  width: 20%;
  font-size: 1.1rem;
}

#result-perday-table > thead,
#result-perday-table > tbody {
  text-align: center;
}

#result-perday-table > tbody {
  font-size: 0.85rem;
}
</style>