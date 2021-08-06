<template>
  <b-card border-variant="secondary" class="text-center cards-info">
    <i
      :class="
        'fa ' +
        infoIcon +
        ' card-icon card-icon-markets ' +
        getClass(infoNumber)
      "
      aria-hidden="true"
    ></i>
    <b-card-text class="card-text">
      <div :class="'card-text-number ' + getClass(infoNumber)">
        <div v-if="!isLoading">
          <div v-if="shouldNotShowResults">--</div>
          <div v-else>
            {{ useMoneySymbol ? this.moneySymbol : "" }}
            {{
              useFormattedDecimalValue
                ? formatDecimal(decimalType, infoNumber)
                : infoNumber
            }}
            {{ usePercentageSymbol ? "%" : "" }}
          </div>
        </div>
        <div v-else>--</div>
      </div>
      <div class="card-text-stat">
        {{ infoDescription }}
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import { mapGetters } from "vuex";
import { mixin } from "@/mixins";

export default {
  mixins: [mixin],
  props: [
    "isLoading",
    "infoNumber",
    "infoDescription",
    "infoIcon",
    "applyColorStyle",
    "useMoneySymbol",
    "usePercentageSymbol",
    "useFormattedDecimalValue",
    "showResults",
  ],
  computed: {
    ...mapGetters(["moneySymbol", "decimalType"]),
    shouldNotShowResults() {
      return (
        !this.showResults &&
        (this.useMoneySymbol ||
          this.usePercentageSymbol ||
          this.applyColorStyle)
      );
    },
  },
  methods: {
    getClass(number) {
      if (!this.shouldNotShowResults && this.applyColorStyle === "per-result") {
        if (number > 0) return "card-green";
        if (number < 0) return "card-red";
      } else if (this.applyColorStyle === "green") {
        return "card-green";
      } else if (this.applyColorStyle === "red") {
        return "card-red";
      }

      return "";
    },
  },
};
</script>

<style>
.cards-info {
  width: 100%;
  height: 9vh;
}

.cards-info > .card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.card-icon {
  font-size: 2em;
}

.card-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  cursor: default;
}

.card-text-number {
  font-size: 1.7em;
  font-weight: bold;
  color: #555;
}

.card-text-stat {
  font-size: 0.9em;
  font-weight: 300;
}

.card-icon-markets {
  color: #e9b301;
}

.card-green {
  color: green !important;
}

.card-red {
  color: rgb(197, 1, 1) !important;
}
</style>