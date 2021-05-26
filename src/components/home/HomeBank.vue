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
        >R$ {{ formattedDecimalValue(props.item.startBank) }}</template
      >
      <template #cell(profitLoss)="props"
        >R$ {{ formattedDecimalValue(props.item.profitLoss) }}</template
      >
      <template #cell(withdraw)="props">
        R$ {{ formattedDecimalValue(props.item.withdraws) }}</template
      >
      <template #cell(deposit)="props"
        >R$ {{ formattedDecimalValue(props.item.deposits) }}%</template
      >
      <template #cell(finalBank)="props"
        >R$ {{ formattedDecimalValue(props.item.finalBank) }}</template
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