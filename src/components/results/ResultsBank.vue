<template>
  <b-card title="Banca no mês" class="results-bankroll">
    <div>
      <div class="results-bankroll-card">
        <b-card
          header="Banca"
          class="card-roi"
          border-variant="warning"
          header-bg-variant="warning"
          bg-variant="light"
          align="center"
        >
          <b-card
            header="Início"
            class="card-bankvalue"
            border-variant="warning"
            header-bg-variant="warning"
            bg-variant="light"
            align="center"
          >
            <b-card-text
              >R$ {{ formattedDecimalValue(stats.startBank) }}</b-card-text
            >
          </b-card>
          <b-card
            header="Atual"
            class="card-bankvalue"
            border-variant="warning"
            header-bg-variant="warning"
            bg-variant="light"
            align="center"
          >
            <b-card-text
              >R$ {{ formattedDecimalValue(stats.finalBank) }}</b-card-text
            >
          </b-card>
        </b-card>
      </div>
      <div class="results-bankroll-card">
        <b-card
          header="Banca (Betfair)"
          class="card-roi"
          border-variant="warning"
          header-bg-variant="warning"
          bg-variant="light"
          align="center"
        >
          <b-card
            header="Início"
            class="card-bankvalue"
            border-variant="warning"
            header-bg-variant="warning"
            bg-variant="light"
            align="center"
          >
            <b-card-text
              >R$
              {{ formattedDecimalValue(stats.startBankBetfair) }}</b-card-text
            >
          </b-card>
          <b-card
            header="Atual"
            class="card-bankvalue"
            border-variant="warning"
            header-bg-variant="warning"
            bg-variant="light"
            align="center"
          >
            <b-card-text
              >R$
              {{ formattedDecimalValue(stats.finalBankBetfair) }}</b-card-text
            >
          </b-card>
        </b-card>
      </div>

      <div class="results-bankroll-card">
        <b-card
          header="Stake Padrão"
          class="card-profitLoss"
          border-variant="warning"
          header-bg-variant="warning"
          bg-variant="light"
          align="center"
        >
          <b-card-text
            ><b>R$ {{ formattedDecimalValue(stats.stake) }}</b></b-card-text
          >
        </b-card>
      </div>

      <div class="results-bankroll-card">
        <b-card
          header="Lucro"
          class="card-profitLoss"
          bg-variant="light"
          align="center"
          header-text-variant="white"
          :border-variant="stats.profitLoss < 0 ? 'danger' : 'success'"
          :header-bg-variant="stats.profitLoss < 0 ? 'danger' : 'success'"
          :body-text-variant="stats.profitLoss < 0 ? 'danger' : 'success'"
        >
          <b-card-text
            ><b
              >R$ {{ formattedDecimalValue(stats.profitLoss) }}</b
            ></b-card-text
          >
        </b-card>
      </div>

      <div class="results-bankroll-card">
        <b-card
          header="ROI"
          class="card-roi"
          border-variant="warning"
          header-bg-variant="warning"
          bg-variant="light"
          align="center"
        >
          <b-card
            header="Banca"
            class="card-bankvalue"
            :border-variant="stats.roiBank < 0 ? 'danger' : 'success'"
            :header-bg-variant="stats.roiBank < 0 ? 'danger' : 'success'"
            header-text-variant="white"
            bg-variant="light"
            align="center"
          >
            <b-card-text
              >{{ formattedDecimalValue(stats.roiBank) }}%</b-card-text
            >
          </b-card>
          <b-card
            header="Stake"
            class="card-bankvalue"
            :border-variant="stats.roiStake < 0 ? 'danger' : 'success'"
            :header-bg-variant="stats.roiStake < 0 ? 'danger' : 'success'"
            header-text-variant="white"
            bg-variant="light"
            align="center"
          >
            <b-card-text
              >{{ formattedDecimalValue(stats.roiStake) }}%</b-card-text
            >
          </b-card>
        </b-card>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["stats", "formattedDecimalValue"],
};
</script>

<style>
.results-bankroll {
  width: 25%;
}

.results-bankroll-card {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.card-bankvalue {
  width: 48%;
}

.card-profitLoss {
  width: 100%;
}

.card-roi {
  width: 100%;
}

.card-roi > .card-body {
  display: flex;
  flex-direction: row;
}
</style>