<template>
  <b-card border-variant="warning" title="Banca" class="home-list-bank">
    <b-table
      id="result-table"
      striped
      hover
      bordered
      :items="bankStats"
      :fields="resultFields"
    >
      <template #cell(month)="props">{{ props.item.month }}</template>
      <template #cell(initialBank)="props"
        >$ {{ formattedDecimalValue(props.item.startBank) }}</template
      >
      <template #cell(profitLoss)="props"
        >$ {{ formattedDecimalValue(props.item.profitLoss) }}</template
      >
      <template #cell(withdraw)="props">
        $ {{ formattedDecimalValue(props.item.bankWithdraws) }}</template
      >
      <template #cell(deposit)="props"
        >$ {{ formattedDecimalValue(props.item.bankDeposits) }}</template
      >
      <template #cell(finalBank)="props"
        >$ {{ formattedDecimalValue(props.item.finalBank) }}</template
      >
      <template #cell(roi)="props"
        >{{ formattedDecimalValue(props.item.roi) }}%</template
      >
    </b-table>
  </b-card>
</template>

<script>
export default {
  props: ["bankStats", "formattedDecimalValue"],
  data() {
    return {
      resultFields: [
        {
          key: "month",
          label: "Mês",
        },
        {
          key: "initialBank",
          label: "Banca inicial",
        },
        {
          key: "profitLoss",
          label: "P/L",
        },
        {
          key: "withdraw",
          label: "Saques",
        },
        {
          key: "deposit",
          label: "Depósitos",
        },
        {
          key: "finalBank",
          label: "Banca final",
        },
        {
          key: "roi",
          label: "ROI (%)",
        },
      ],
    };
  },
};
</script>

<style>
.home-list-bank {
  width: 49%;
}
</style>