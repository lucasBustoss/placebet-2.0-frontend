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
      <template #cell(month)="props">
        {{ props.item.monthDescription }}
      </template>
      <template #cell(initialBank)="props"
        ><div v-if="showResults">
          {{ moneySymbol }}
          {{ formatDecimal(decimalType, props.item.startBank) }}
        </div>
        <div v-else>-</div>
      </template>
      <template #cell(profitLoss)="props">
        <div v-if="showResults">
          {{ moneySymbol }}
          {{ formatDecimal(decimalType, props.item.profitLoss) }}
        </div>
        <div v-else>-</div>
      </template>
      <template #cell(withdraw)="props">
        <div v-if="showResults">
          {{ moneySymbol }}
          {{ formatDecimal(decimalType, props.item.bankWithdraws) }}
        </div>
        <div v-else>-</div>
      </template>
      <template #cell(deposit)="props"
        ><div v-if="showResults">
          {{ moneySymbol }}
          {{ formatDecimal(decimalType, props.item.bankDeposits) }}
        </div>
        <div v-else>-</div>
      </template>
      <template #cell(finalBank)="props"
        ><div v-if="showResults">
          {{ moneySymbol }}
          {{ formatDecimal(decimalType, props.item.finalBank) }}
        </div>
        <div v-else>-</div>
      </template>
      <template #cell(roi)="props"
        ><div v-if="showResults">
          {{ formatDecimal(decimalType, props.item.roi) }}%
        </div>
        <div v-else>-</div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { mixin } from "@/mixins";

export default {
  mixins: [mixin],
  props: ["bankStats", "decimalType", "moneySymbol", "showResults"],
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