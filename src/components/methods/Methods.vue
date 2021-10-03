<template>
  <div class="methods">
    <div class="methods-header">
      <h1 class="methods-header-title">Estratégias</h1>
    </div>

    <hr />
    <MethodsList
      :methods="methods"
      @insertMethod="insertMethod"
      @deleteMethod="deleteMethod"
    />
  </div>
</template>

<script>
import MethodsList from "./MethodsList";

import { format, startOfMonth } from "date-fns";

import { showError, showSuccess } from "@/global";
import api from "@/config/api";

export default {
  components: { MethodsList },
  data() {
    return {
      methods: [],
      selectedMonth: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    };
  },
  methods: {
    async loadMethods() {
      try {
        const response = await api.get("/methods/stats", {
          // params: {
          //   date: this.selectedMonth,
          // },
        });

        if (response && response.data) {
          this.methods = response.data;
        }
      } catch (err) {
        showError(err);
        return;
      }
    },
    async insertMethod(name) {
      try {
        await api.post("/methods", {
          name,
        });

        this.loadMethods();

        showSuccess();
      } catch (err) {
        showError(err);
        return;
      }
    },
    async deleteMethod(id) {
      try {
        const response = await api.delete("/methods/" + id);

        showSuccess(response.data.message.toString());
        this.loadMethods();
      } catch (err) {
        showError(err);
      }
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
</style>