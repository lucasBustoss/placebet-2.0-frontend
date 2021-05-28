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
      user_id: "a2e1736d-15bb-4c21-879d-6e28cfff552d",
      bankStats: [],
      betfairStats: [],
    };
  },
  methods: {
    async loadStats() {},
    async loadBankStats() {
      try {
        const bankResponse = await api.get("/stats/statsByYear", {
          params: {
            user_id: this.user_id,
            date: format(new Date(), "yyyy-MM-dd"),
          },
        });

        if (bankResponse && bankResponse.data !== null) {
          this.bankStats = bankResponse.data;
        }
      } catch (err) {
        showError(err);
      }
    },
    async loadBetfairStats() {
      try {
        const betfairResponse = await api.get("/stats/statsBetfairByYear", {
          params: {
            user_id: this.user_id,
            date: format(new Date(), "yyyy-MM-dd"),
          },
        });

        if (betfairResponse && betfairResponse.data !== null) {
          this.betfairStats = betfairResponse.data;
        }
      } catch (err) {
        showError(err);
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