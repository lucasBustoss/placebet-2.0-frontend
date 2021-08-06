<template>
  <div class="home">
    <div class="home-header">
      <h1 class="home-header-title">Home</h1>

      <div class="home-header-icon" @click="showResults = !showResults">
        <i v-if="showResults" class="fa fa-eye" aria-hidden="true"></i>
        <i v-else class="fa fa-eye-slash" aria-hidden="true"></i>
      </div>
    </div>

    <hr />
    <div class="home-header-card">
      <CardInfo
        :isLoading="isLoading"
        :infoNumber="actualBankStats ? actualBankStats.profitLoss : '--'"
        infoDescription="resultado mensal"
        infoIcon="fa-usd"
        applyColorStyle="per-result"
        :useMoneySymbol="true"
        :useFormattedDecimalValue="true"
        :showResults="showResults"
      />
      <CardInfo
        :isLoading="isLoading"
        :infoNumber="actualBankStats ? actualBankStats.roi : '--'"
        infoDescription="ROI sobre a banca mensal"
        infoIcon="fa-percent"
        applyColorStyle="per-result"
        :usePercentageSymbol="true"
        :useFormattedDecimalValue="true"
        :showResults="showResults"
      />
      <CardInfo
        :isLoading="isLoading"
        :infoNumber="
          actualBetfairStats ? actualBetfairStats.finalBankBetfair : '--'
        "
        infoDescription="banca na Betfair"
        infoIcon="fa-money"
        :useMoneySymbol="true"
        :useFormattedDecimalValue="true"
        :showResults="showResults"
      />
    </div>
    <hr />

    <div class="home-lists">
      <HomeBank
        :bankStats="bankStats"
        :decimalType="decimalType"
        :moneySymbol="moneySymbol"
        :showResults="showResults"
      />
      <HomeBetfair
        :betfairStats="betfairStats"
        :decimalType="decimalType"
        :moneySymbol="moneySymbol"
        :showResults="showResults"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import HomeBank from "./HomeBank";
import HomeBetfair from "./HomeBetfair";
import CardInfo from "../template/CardInfo";

import { format } from "date-fns";

import { showError } from "@/global";
import api from "@/config/api";

export default {
  components: { HomeBank, HomeBetfair, CardInfo },
  computed: {
    ...mapGetters(["moneySymbol", "decimalType"]),
    // decimalType() {
    //   return this.$store.state.money;
    // },
    actualBankStats() {
      const actual = this.bankStats.filter(
        (bs) => bs.month === format(new Date(), "MM-yyyy")
      );

      return actual[0];
    },
    actualBetfairStats() {
      const actual = this.betfairStats.filter(
        (bs) => bs.month === format(new Date(), "MM-yyyy")
      );

      return actual[0];
    },
  },
  data() {
    return {
      bankStats: [],
      betfairStats: [],
      showResults: this.$store.state.defaultVisibility
        ? this.$store.state.defaultVisibility
        : 0,
      isLoading: false,
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
  },
  async mounted() {
    this.loadBankStats();
    this.loadBetfairStats();
  },
};
</script>

<style>
.home {
  padding: 20px;
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1em;
  width: 30%;
}

.home-header-title {
  font-size: 1.7em;
  width: 13.5%;
}

.home-header-icon {
  margin-left: 25px;
  cursor: pointer;
}

.home-header-card {
  display: flex;
  justify-content: space-between;
}

.home-lists {
  display: flex;
  justify-content: space-between;
}
</style>