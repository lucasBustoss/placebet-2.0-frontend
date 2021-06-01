<template>
  <div>
    <h1>Home</h1>
    <div class="home-lists">
      <HomeBank
        :bankStats="bankStats"
        :formattedDecimalValue="formattedDecimalValue"
      />
      <HomeBetfair
        :betfairStats="betfairStats"
        :formattedDecimalValue="formattedDecimalValue"
      />
    </div>
  </div>
</template>

<script>
import HomeBank from "./HomeBank";
import HomeBetfair from "./HomeBetfair";

import { format } from "date-fns";

import { showError } from "@/global";
import api from "@/config/api";

export default {
  components: { HomeBank, HomeBetfair },
  data() {
    return {
      bankStats: [],
      betfairStats: [],
    };
  },
  methods: {
    async loadBankStats() {
      try {
        const bankResponse = await api.get("/stats/statsByYear", {
          params: {
            date: format(new Date(), "yyyy-MM-dd"),
          },
        });

        if (bankResponse && bankResponse.data !== null) {
          this.bankStats = bankResponse.data;
        }
      } catch (err) {
        console.log(err);
        showError(err);
        return;
      }
    },
    async loadBetfairStats() {
      try {
        const betfairResponse = await api.get("/stats/statsBetfairByYear", {
          params: {
            date: format(new Date(), "yyyy-MM-dd"),
          },
        });

        if (betfairResponse && betfairResponse.data !== null) {
          this.betfairStats = betfairResponse.data;
        }
      } catch (err) {
        showError(
          err.error === "Invalid Token?"
            ? { error: "Faça o login na aplicação" }
            : err
        );
        return;
      }
    },
    formattedDecimalValue(value) {
      const numberValue = Number(value);
      return numberValue.toFixed(2).replace(".", ",");
    },
  },
  async mounted() {
    this.loadBankStats();
    this.loadBetfairStats();
  },
};
</script>

<style>
.home-lists {
  display: flex;
  justify-content: space-between;
}
</style>