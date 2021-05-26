<template>
  <b-card border-variant="warning" title="Banca" class="home-list-bank">
    <b-table
      id="result-table"
      striped
      hover
      bordered
      :items="resultsByMonth"
      :fields="resultFields"
    >
      <template #cell(month)="data">{{ data.item.month }}</template>
      <template #cell(initialBank)="data"
        >R$ {{ formattedDecimalValue(data.item.initialBank) }}</template
      >
      <template #cell(profitLoss)="data"
        >R$ {{ formattedDecimalValue(data.item.profitLoss) }}</template
      >
      <template #cell(withdraw)="data">
        R$ {{ formattedDecimalValue(data.item.withdraw) }}</template
      >
      <template #cell(deposit)="data"
        >R$ {{ formattedDecimalValue(data.item.deposit) }}%</template
      >
      <template #cell(finalBank)="data"
        >R$ {{ formattedDecimalValue(data.item.finalBank) }}</template
      >
      <template #cell(roi)="data"
        >{{ formattedDecimalValue(data.item.roi) }}%</template
      >
    </b-table>
  </b-card>
</template>

<script>
export default {
  props: ["formattedDecimalValue"],
  data() {
    return {
      resultsByMonth: [
        {
          month: "Janeiro",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Fevereiro",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Março",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Abril",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Maio",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Junho",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Julho",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Agosto",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Setembro",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Outubro",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Novembro",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
        {
          month: "Dezembro",
          initialBank: 6365.49,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 6465.49,
          roi: 10,
        },
      ],
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