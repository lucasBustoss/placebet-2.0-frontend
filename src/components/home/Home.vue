<template>
  <div>
    <h1>Home</h1>
    <div class="home-lists">
      <HomeBank :formattedDecimalValue="formattedDecimalValue" />
      <HomeBetfair :formattedDecimalValue="formattedDecimalValue" />
    </div>
  </div>
</template>

<script>
import HomeBank from "./HomeBank";
import HomeBetfair from "./HomeBetfair";

export default {
  components: { HomeBank, HomeBetfair },
  methods: {
    formattedDecimalValue(value) {
      const numberValue = Number(value);
      return numberValue.toFixed(2).replace(".", ",");
    },
  },
};
</script>

<style>
.home-lists {
  display: flex;
  justify-content: space-between;
}
</style>