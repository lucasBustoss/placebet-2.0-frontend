<template>
  <b-card
    border-variant="success"
    title="Banca (Betfair)"
    class="home-list-betfair"
  >
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
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Fevereiro",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Março",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Abril",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Maio",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Junho",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Julho",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Agosto",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Setembro",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Outubro",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Novembro",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
        },
        {
          month: "Dezembro",
          initialBank: 100,
          profitLoss: 100,
          withdraw: 0,
          deposit: 0,
          finalBank: 200,
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
      ],
    };
  },
};
</script>

<style>
.home-list-betfair {
  width: 49%;
}
</style>