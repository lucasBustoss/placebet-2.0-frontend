<template>
  <b-card class="daily-list">
    <h2 class="daily-list-title">Resultados</h2>
    <hr />

    <div class="daily-list-content">
      <b-table
        id="daily-list-table"
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
        class="daily-list-loading"
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
.daily-list {
  display: flex;
  width: 34%;
}

.daily-list-title {
  font-size: 1.3em;
}

.daily-list-content {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.daily-list-loading {
  height: 70px;
  width: 70px;
}

#daily-list-table > thead,
#daily-list-table > tbody {
  text-align: center;
  align-items: center;
}
#daily-list-table > tbody {
  font-size: 0.85rem;
}
</style>