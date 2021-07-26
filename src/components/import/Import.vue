<template>
  <div class="import">
    <h1 class="results-header-title">Importar</h1>
    <hr />

    <ImportBetList
      :bets="betsToImport"
      :methods="methods"
      :leagues="leagues"
      :formattedDecimalValue="formattedDecimalValue"
      :getDateFormatted="getDateFormatted"
      :loadingImport="loadingImport"
      @importBets="importBets"
    />
  </div>
</template>

<script>
import api from "@/config/api";
import ImportBetList from "./ImportBetList";
import { showError } from "@/global";
import { format, parseISO } from "date-fns";

export default {
  components: { ImportBetList },
  data() {
    return {
      betsToImport: this.$store.state.betsToImport,
      loadingImport: false,
      methods: [],
      leagues: [],
    };
  },
  methods: {
    async loadMethods() {
      try {
        const response = await api.get("/methods");

        if (response && response.data) {
          for (let index = 0; index < response.data.length; index++) {
            const method = response.data[index];

            const newMethod = {
              value: method.id,
              text: method.name,
            };

            this.methods.push(newMethod);
          }
        }
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
    async loadLeagues() {
      try {
        const response = await api.get("/leagues");

        if (response && response.data) {
          for (let index = 0; index < response.data.length; index++) {
            const league = response.data[index];

            const newLeague = {
              value: league.id,
              text: league.name,
            };

            this.leagues.push(newLeague);
          }
        }
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
    getDateFormatted(date) {
      return format(parseISO(date), "dd/MM/yyyy");
    },
    formattedDecimalValue(value) {
      const numberValue = Number(value);
      return numberValue.toFixed(2);
    },
    async importBets(bets) {
      try {
        this.loadingImport = true;

        await api.post("/bets", { bets });

        this.$router.push({ name: "results" });
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
  },
  async mounted() {
    await this.loadMethods();
    await this.loadLeagues();
  },
};
</script>

<style>
.import {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}
</style>