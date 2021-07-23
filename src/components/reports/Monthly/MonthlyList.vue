<template>
  <b-card class="monthly-list">
    <h2 class="monthly-list-title">Resultados</h2>
    <hr />

    <div class="monthly-list-content">
      <b-table
        id="monthly-list-table"
        bordered
        small
        hover
        :items="results"
        :fields="resultFields"
        :tbody-tr-class="rowClass"
        v-if="!isLoading"
      ></b-table>
      <b-spinner
        v-else
        class="monthly-list-loading"
        variant="secondary"
      ></b-spinner>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["results", "isLoading"],
  data() {
    return {
      resultFields: [
        {
          key: "date",
          label: "Data",
        },
        {
          key: "profitLossFormatted",
          label: "Resultado ($)",
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
.monthly-list {
  display: flex;
  width: 34%;
}

.monthly-list-title {
  font-size: 1.3em;
}

.monthly-list-content {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.monthly-list-loading {
  height: 70px;
  width: 70px;
}

#monthly-list-table > thead,
#monthly-list-table > tbody {
  text-align: center;
  align-items: center;
}
#monthly-list-table > tbody {
  font-size: 0.85rem;
}
</style>