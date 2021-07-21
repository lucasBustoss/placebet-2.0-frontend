<template>
  <div class="methods">
    <div class="methods-header">
      <h1 class="methods-header-title">Estratégia</h1>
    </div>

    <hr />
    <div class="methods-list">
      <b-table striped hover :items="methods" :fields="betFields">
        <template #cell(name)="data">{{ data.item.name }}</template>
        <template #cell(entrance)="data">{{ data.item.entrance }}</template>
        <template #cell(greens)="data">{{ data.item.greens }}</template>
        <template #cell(reds)="data"> {{ data.item.reds }}</template>
        <template #cell(result)="data">
          $ {{ formattedDecimalValue(data.item.result) }}</template
        >
        <template #cell(roi)="data"
          >{{ formattedDecimalValue(data.item.roi) }}%</template
        >
        <template #cell(greenPercent)="data"
          >{{ formattedDecimalValue(data.item.greenPercent) }}%</template
        >
        <template #cell(redPercent)="data"
          >{{ formattedDecimalValue(data.item.redPercent) }}%</template
        >
      </b-table>
    </div>
  </div>
</template>

<script>
import { format, startOfMonth } from "date-fns";

import { showError } from "@/global";
import api from "@/config/api";

export default {
  data() {
    return {
      methods: [],
      betFields: [
        {
          key: "name",
          label: "Estratégia",
        },
        {
          key: "entrances",
          label: "Entradas",
        },
        {
          key: "greens",
          label: "Greens",
        },
        {
          key: "reds",
          label: "Reds",
        },
        {
          key: "result",
          label: "Resultado",
        },
        {
          key: "roi",
          label: "ROI (%)",
        },
        {
          key: "greenPercent",
          label: "% Greens",
        },
        {
          key: "redPercent",
          label: "% Reds",
        },
      ],
      selectedMonth: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    };
  },
  methods: {
    async loadMethods() {
      try {
        const response = await api.get("/methods/stats", {
          params: {
            date: this.selectedMonth,
          },
        });

        if (response && response.data) {
          this.methods = response.data;
        }
      } catch (err) {
        showError(err);
        return;
      }
    },
    formattedDecimalValue(value) {
      const numberValue = Number(value);
      return numberValue.toFixed(2);
    },
  },
  async mounted() {
    this.loadMethods();
  },
};
</script>

<style>
.methods {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.methods-header {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1em;
}

.methods-header-title {
  font-size: 1.7em;
}

.methods-list {
  padding: 30px;
  border: 1px solid #aaa;
  border-radius: 10px;
  width: 100%;
}
</style>