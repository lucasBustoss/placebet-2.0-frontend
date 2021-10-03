<template>
  <div class="leagues">
    <div class="leagues-header">
      <h1 class="leagues-header-title">Campeonatos</h1>
    </div>

    <hr />
    <LeaguesList
      :leagues="leagues"
      @insertLeague="insertLeague"
      @deleteLeague="deleteLeague"
    />
  </div>
</template>

<script>
import LeaguesList from "./LeaguesList";

import { format, startOfMonth } from "date-fns";

import { showError, showSuccess } from "@/global";
import api from "@/config/api";

export default {
  components: { LeaguesList },
  data() {
    return {
      leagues: [],
      selectedMonth: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    };
  },
  methods: {
    async loadLeagues() {
      try {
        const response = await api.get("/leagues/stats", {
          // params: {
          //   date: this.selectedMonth,
          // },
        });

        if (response && response.data) {
          this.leagues = response.data;
        }
      } catch (err) {
        showError(err);
        return;
      }
    },
    async insertLeague(name) {
      try {
        await api.post("/leagues", {
          name,
        });

        this.loadLeagues();

        showSuccess();
      } catch (err) {
        showError(err);
        return;
      }
    },
    async deleteLeague(id) {
      try {
        const response = await api.delete("/leagues/" + id);

        showSuccess(response.data.message.toString());
        this.loadLeagues();
      } catch (err) {
        showError(err);
      }
    },
  },
  async mounted() {
    this.loadLeagues();
  },
};
</script>

<style>
.leagues {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.leagues-header {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1em;
}

.leagues-header-title {
  font-size: 1.7em;
}
</style>