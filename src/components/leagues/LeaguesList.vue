<template>
  <div class="leagues-list">
    <b-table striped hover :items="leagues" :fields="fields">
      <template #cell(name)="data">{{ data.item.name }}</template>
      <template #cell(entrance)="data">{{ data.item.entrance }}</template>
      <template #cell(greens)="data">{{ data.item.greens }}</template>
      <template #cell(reds)="data"> {{ data.item.reds }}</template>
      <template #cell(result)="data">
        {{ moneySymbol }}
        {{ formatDecimal(decimalType, data.item.result) }}</template
      >
      <template #cell(roi)="data"
        >{{ formatDecimal(decimalType, data.item.roi) }}%</template
      >
      <template #cell(greenPercent)="data"
        >{{ formatDecimal(decimalType, data.item.greenPercent) }}%</template
      >
      <template #cell(redPercent)="data"
        >{{ formatDecimal(decimalType, data.item.redPercent) }}%</template
      >
      <template #cell(delete)="data">
        <div>
          <i
            @click="showDeleteModal(data)"
            class="fa fa-trash-o"
            aria-hidden="true"
          ></i>
        </div>
      </template>
    </b-table>
    <div class="leagues-buttons">
      <b-button variant="warning" @click="showInsertModal">
        Criar campeonato</b-button
      >
    </div>

    <LeaguesListInsertModal @insertLeague="insertLeague" />
    <LeaguesDeleteModal @deleteLeague="deleteLeague" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mixin } from "@/mixins";

import LeaguesListInsertModal from "./LeaguesListInsertModal";
import LeaguesDeleteModal from "./LeaguesDeleteModal";

export default {
  mixins: [mixin],
  props: ["leagues"],
  components: { LeaguesListInsertModal, LeaguesDeleteModal },
  computed: {
    ...mapGetters(["moneySymbol", "decimalType"]),
  },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Campeonato",
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
        {
          key: "delete",
          label: "",
        },
      ],
      league: null,
    };
  },
  methods: {
    showInsertModal() {
      this.$bvModal.show("league-insert-modal");
    },
    showDeleteModal(data) {
      this.league = data.item;

      this.$bvModal.show("league-delete-modal");
    },
    insertLeague(name) {
      this.$emit("insertLeague", name);
    },
    deleteLeague() {
      this.$emit("deleteLeague", this.league.id);
    },
  },
};
</script>

<style>
.leagues-list {
  padding: 30px;
  border: 1px solid #aaa;
  border-radius: 10px;
  width: 100%;
}

.leagues-buttons {
  display: flex;
  justify-content: flex-end;
}

.leagues-buttons > button {
  width: 25%;
  border: none;
}
</style>