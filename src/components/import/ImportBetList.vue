<template>
  <b-card :key="tableKey">
    <b-table
      id="import-table"
      striped
      hover
      :items="bets"
      :fields="betFields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #cell(date)="data">{{
        getDateFormatted(data.item.date)
      }}</template>
      <template #cell(sport)="data">{{ data.item.sport }}</template>
      <template #cell(eventDescription)="data">{{
        data.item.eventDescription
      }}</template>
      <template #cell(marketDesc)="data">{{ data.item.marketDesc }}</template>
      <template v-slot:head(method)="">
        <div class="dropdown-selector-all">
          <div>Estratégia</div>
          <b-dropdown
            text="(Alterar todos)"
            id="dropdown-form"
            ref="dropdownMarketAll"
            class="dropdown-selector dropdown-selector-all-button"
            no-caret
          >
            <b-dropdown-form>
              <b-form-group label="Informe o metodo" @submit.stop.prevent>
                <b-form-select
                  size="sm"
                  class="dropdown-selector-select"
                  :options="methods"
                  v-model="selectedMethod"
                ></b-form-select>
                <div class="dropdown-selector-buttons">
                  <b-button
                    variant="success"
                    @click="changeMethod('dropdownMarketAll', null)"
                    ><i class="fa fa-check" aria-hidden="true"></i
                  ></b-button>
                  <b-button
                    variant="danger"
                    @click="onClose('dropdownMarketAll', '')"
                    ><i class="fa fa-times" aria-hidden="true"></i
                  ></b-button>
                </div>
              </b-form-group>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </template>
      <template #cell(method)="data">
        <b-dropdown
          id="dropdown-form"
          :text="getMethodName(data.item)"
          :ref="'dropdownMarket' + data.item.uuid"
          class="dropdown-selector"
          no-caret
        >
          <b-dropdown-form>
            <b-form-group label="Informe o metodo" @submit.stop.prevent>
              <b-form-select
                size="sm"
                class="dropdown-selector-select"
                :options="methods"
                v-model="selectedMethod"
              ></b-form-select>
              <div class="dropdown-selector-buttons">
                <b-button
                  variant="success"
                  @click="changeMethod('dropdownMarket', data.item.uuid)"
                  ><i class="fa fa-check" aria-hidden="true"></i
                ></b-button>
                <b-button
                  variant="danger"
                  @click="onClose('dropdownMarket', data.item.uuid)"
                  ><i class="fa fa-times" aria-hidden="true"></i
                ></b-button>
              </div>
            </b-form-group>
          </b-dropdown-form>
        </b-dropdown>
      </template>
      <template v-slot:head(league)="">
        <div class="dropdown-selector-all">
          <div>Campeonato</div>
          <b-dropdown
            text="(Alterar todos)"
            id="dropdown-form"
            ref="dropdownLeagueAll"
            class="dropdown-selector dropdown-selector-all-button"
            no-caret
          >
            <b-dropdown-form>
              <b-form-group label="Informe a liga" @submit.stop.prevent>
                <b-form-select
                  size="sm"
                  class="dropdown-selector-select"
                  :options="leagues"
                  v-model="selectedLeague"
                ></b-form-select>
                <div class="dropdown-selector-buttons">
                  <b-button
                    variant="success"
                    @click="changeLeague('dropdownLeagueAll', null)"
                    ><i class="fa fa-check" aria-hidden="true"></i
                  ></b-button>
                  <b-button
                    variant="danger"
                    @click="onClose('dropdownLeagueAll', '')"
                    ><i class="fa fa-times" aria-hidden="true"></i
                  ></b-button>
                </div>
              </b-form-group>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </template>
      <template #cell(league)="data">
        <b-dropdown
          :text="getLeagueName(data.item)"
          :ref="'dropdownLeague' + data.item.uuid"
          class="dropdown-selector"
          no-caret
        >
          <b-dropdown-form>
            <b-form-group label="Informe a liga" @submit.stop.prevent>
              <b-form-select
                size="sm"
                class="dropdown-selector-select"
                :options="leagues"
                v-model="selectedLeague"
              ></b-form-select>
              <div class="dropdown-selector-buttons">
                <b-button
                  variant="success"
                  @click="changeLeague('dropdownLeague', data.item.uuid)"
                  ><i class="fa fa-check" aria-hidden="true"></i
                ></b-button>
                <b-button
                  variant="danger"
                  @click="onClose('dropdownLeague', data.item.uuid)"
                  ><i class="fa fa-times" aria-hidden="true"></i
                ></b-button>
              </div>
            </b-form-group>
          </b-dropdown-form>
        </b-dropdown>
      </template>
      <template v-slot:head(stake)="">
        <div class="dropdown-selector-all">
          <div>Stake</div>
          <b-dropdown
            text="(Alterar todos)"
            id="dropdown-form"
            ref="dropdownStakeAll"
            class="dropdown-selector dropdown-selector-all-button"
            no-caret
          >
            <b-dropdown-form @submit.stop.prevent>
              <b-form-group label="Informe a stake">
                <b-form-input size="sm" v-model="selectedStake"></b-form-input>
                <div class="dropdown-selector-buttons">
                  <b-button
                    variant="success"
                    @click="changeStake('dropdownStakeAll', null)"
                    ><i class="fa fa-check" aria-hidden="true"></i
                  ></b-button>
                  <b-button
                    variant="danger"
                    @click="onClose('dropdownStakeAll', '')"
                    ><i class="fa fa-times" aria-hidden="true"></i
                  ></b-button>
                </div>
              </b-form-group>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </template>
      <template #cell(stake)="data">
        <div class="dropdown-content">
          <b-dropdown
            :text="getStakeValue(data.item)"
            :ref="'dropdownStake' + data.item.uuid"
            class="dropdown-selector"
            no-caret
          >
            <b-dropdown-form @submit.stop.prevent>
              <b-form-group label="Informe a stake">
                <b-form-input size="sm" v-model="selectedStake"></b-form-input>
                <div class="dropdown-selector-buttons">
                  <b-button
                    variant="success"
                    @click="changeStake('dropdownStake', data.item.uuid)"
                    ><i class="fa fa-check" aria-hidden="true"></i
                  ></b-button>
                  <b-button
                    variant="danger"
                    @click="onClose('dropdownStake', data.item.uuid)"
                    ><i class="fa fa-times" aria-hidden="true"></i
                  ></b-button>
                </div>
              </b-form-group>
            </b-dropdown-form>
          </b-dropdown>
          <span
            v-b-tooltip.hover
            v-show="!data.item.stake"
            title="É necessário informar a stake utilizada"
          >
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          </span>
        </div>
      </template>
      <template #cell(result)="data"
        ><div :class="getResultClass(data.item.profitLoss)">
          $ {{ formattedDecimalValue(data.item.profitLoss) }}
        </div></template
      >
      <template v-slot:head(goalsScored)="">
        <div class="dropdown-selector-all">
          <div>GP</div>
          <span v-b-tooltip.hover title="Gols pegos">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </span>
        </div>
      </template>
      <template #cell(goalsScored)="data">
        <b-dropdown
          dropleft
          :text="getGoalsScored(data.item)"
          :ref="'dropdownGoalsScored' + data.item.uuid"
          class="dropdown-selector"
          no-caret
        >
          <b-dropdown-form @submit.stop.prevent>
            <b-form-group label="Informe quantos gols pegou">
              <b-form-input
                size="sm"
                v-model="selectedGoalsScored"
              ></b-form-input>
              <div class="dropdown-selector-buttons">
                <b-button
                  variant="success"
                  @click="
                    changeGoalsScored('dropdownGoalsScored', data.item.uuid)
                  "
                  ><i class="fa fa-check" aria-hidden="true"></i
                ></b-button>
                <b-button
                  variant="danger"
                  @click="onClose('dropdownGoalsScored', data.item.uuid)"
                  ><i class="fa fa-times" aria-hidden="true"></i
                ></b-button>
              </div>
            </b-form-group>
          </b-dropdown-form>
        </b-dropdown>
      </template>
      <template v-slot:head(goalsConceded)="">
        <div class="dropdown-selector-all">
          <div>GT</div>
          <span v-b-tooltip.hover title="Gols tomados">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </span>
        </div>
      </template>
      <template #cell(goalsConceded)="data">
        <b-dropdown
          dropleft
          :text="getGoalsConceded(data.item)"
          :ref="'dropdownGoalsConceded' + data.item.uuid"
          class="dropdown-selector"
          no-caret
        >
          <b-dropdown-form @submit.stop.prevent>
            <b-form-group label="Informe quantos gols tomou">
              <b-form-input
                size="sm"
                v-model="selectedGoalsConceded"
              ></b-form-input>
              <div class="dropdown-selector-buttons">
                <b-button
                  variant="success"
                  @click="
                    changeGoalsConceded('dropdownGoalsConceded', data.item.uuid)
                  "
                  ><i class="fa fa-check" aria-hidden="true"></i
                ></b-button>
                <b-button
                  variant="danger"
                  @click="onClose('dropdownGoalsConceded', data.item.uuid)"
                  ><i class="fa fa-times" aria-hidden="true"></i
                ></b-button>
              </div>
            </b-form-group>
          </b-dropdown-form>
        </b-dropdown>
      </template>
      >
      <template #cell(delete)="data"
        ><i
          class="fa fa-trash-o"
          aria-hidden="true"
          @click="deleteBet(data.item.uuid)"
        ></i
      ></template>
    </b-table>

    <div class="import-buttons">
      <b-button class="btn btn-warning" @click="importBets">
        <div v-if="!loadingImport">Importar</div>
        <b-spinner v-else variant="secondary"></b-spinner
      ></b-button>
      <b-button class="btn btn-danger" @click="cancelImport">Cancelar</b-button>
    </div>

    <div class="pagination-buttons">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="result-table"
      >
      </b-pagination>
    </div>
  </b-card>
</template>

<script>
import { showError } from "@/global";

export default {
  props: [
    "bets",
    "methods",
    "leagues",
    "getDateFormatted",
    "formattedDecimalValue",
    "loadingImport",
  ],
  computed: {
    rows() {
      return this.toImportBets.length;
    },
    toImportBets() {
      return this.bets;
    },
  },
  data() {
    return {
      tableKey: 0,
      selectedMethod: null,
      selectedLeague: null,
      selectedStake: null,
      selectedGoalsScored: null,
      selectedGoalsConceded: null,
      betFields: [
        {
          key: "date",
          label: "Data",
        },
        {
          key: "sport",
          label: "Esporte",
        },
        {
          key: "eventDescription",
          label: "Jogo",
        },
        {
          key: "marketDesc",
          label: "Mercado",
        },
        {
          key: "method",
          label: "Método",
        },
        {
          key: "league",
          label: "Campeonato",
        },
        {
          key: "stake",
          label: "Stake",
        },
        {
          key: "result",
          label: "Resultado",
        },
        {
          key: "goalsScored",
          label: "GP",
        },
        {
          key: "goalsConceded",
          label: "GT",
        },
        {
          key: "delete",
          label: "",
        },
      ],
      perPage: 14,
      currentPage: 1,
    };
  },
  methods: {
    changeMethod(name, bet_id) {
      try {
        if (!this.selectedMethod) {
          showError("Método não selecionado");
          return;
        }

        if (!bet_id) {
          for (let index = 0; index < this.toImportBets.length; index++) {
            const bet = this.toImportBets[index];
            bet.method_id = this.selectedMethod;
          }

          this.forceRerender();
          this.onClose(name, "");
        } else {
          const bet = this.toImportBets.filter((b) => b.uuid === bet_id);

          if (bet.length > 0) {
            bet[0].method_id = this.selectedMethod;

            this.forceRerender();
            this.onClose(name, bet_id);
          }
        }
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
    changeLeague(name, bet_id) {
      try {
        if (!this.selectedLeague) {
          showError("Liga não selecionada");
          return;
        }

        if (!bet_id) {
          for (let index = 0; index < this.toImportBets.length; index++) {
            const bet = this.toImportBets[index];
            bet.league_id = this.selectedLeague;
          }

          this.forceRerender();
          this.onClose(name, "");
        } else {
          const bet = this.toImportBets.filter((b) => b.uuid === bet_id);

          if (bet.length > 0) {
            bet[0].league_id = this.selectedLeague;

            this.forceRerender();
            this.onClose(name, bet_id);
          }
        }
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
    changeStake(name, bet_id) {
      try {
        if (!bet_id) {
          for (let index = 0; index < this.toImportBets.length; index++) {
            const bet = this.toImportBets[index];
            bet.stake = this.selectedStake;
          }

          this.forceRerender();
          this.onClose(name, "");
        } else {
          const bet = this.toImportBets.filter((b) => b.uuid === bet_id);

          if (bet.length > 0) {
            bet[0].stake = this.selectedStake;

            this.forceRerender();
            this.onClose(name, bet_id);
          }
        }
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
    changeGoalsScored(name, bet_id) {
      try {
        if (bet_id) {
          const bet = this.toImportBets.filter((b) => b.uuid === bet_id);

          if (bet.length > 0) {
            bet[0].goalsScored = this.selectedGoalsScored;

            this.forceRerender();
            this.onClose(name, bet_id);
          }
        } else {
          showError("Nenhuma aposta foi selecionada");
          return;
        }
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
    changeGoalsConceded(name, bet_id) {
      try {
        if (bet_id) {
          const bet = this.toImportBets.filter((b) => b.uuid === bet_id);

          if (bet.length > 0) {
            bet[0].goalsConceded = this.selectedGoalsConceded;

            this.forceRerender();
            this.onClose(name, bet_id);
          }
        } else {
          showError("Nenhuma aposta foi selecionada");
          return;
        }
      } catch (err) {
        console.log(err);
        showError(err);
      }
    },
    getMethodName(bet) {
      if (bet.method_id) {
        const method = this.methods.filter((m) => {
          return m.value === bet.method_id;
        });

        return method[0].text;
      } else {
        return "Selecione a estratégia";
      }
    },
    getLeagueName(bet) {
      if (bet.league_id) {
        const league = this.leagues.filter((m) => {
          return m.value === bet.league_id;
        });

        return league[0].text;
      } else {
        return "Selecione a liga";
      }
    },
    getStakeValue(bet) {
      if (bet.stake) {
        return "$ " + this.formattedDecimalValue(bet.stake);
      } else {
        return "$ 0.00";
      }
    },
    getGoalsScored(bet) {
      return bet.goalsScored || "0";
    },
    getGoalsConceded(bet) {
      return bet.goalsConceded || "0";
    },
    getResultClass(result) {
      if (Number(result) > 0) {
        return "bet-result bet-result-green";
      }

      if (Number(result) < 0) {
        return "bet-result bet-result-red";
      }

      return "bet-result";
    },
    onClose(name, uuid) {
      const drop = name + uuid;

      this.$refs[drop].hide(true);
    },
    async importBets() {
      if (!this.validateImport()) {
        showError(
          `Erro na importação. Verifique se não há alguma 
          aposta sem a stake informada e tente novamente.`
        );

        return;
      }

      await this.$emit("importBets", this.toImportBets);
    },
    cancelImport() {
      this.$router.push({ name: "results" });
    },
    validateImport() {
      for (let index = 0; index < this.toImportBets.length; index++) {
        const bet = this.toImportBets[index];

        if (!bet.stake) return false;
      }

      return true;
    },
    deleteBet(id) {
      for (let index = 0; index < this.toImportBets.length; index++) {
        const bet = this.toImportBets[index];

        if (bet.uuid === id) {
          this.toImportBets.splice(index, 1);
          break;
        }
      }

      this.forceRerender();
    },
    forceRerender() {
      this.selectedMethod = null;
      this.selectedLeague = null;
      this.selectedStake = null;
      this.selectedGoalsScored = null;
      this.selectedGoalsConceded = null;

      this.tableKey += 1;
    },
  },
};
</script>

<style>
.results-list > .card-body {
  font-size: 1.05rem;
}

.results-list-full {
  width: 100%;
  transition: 0.5s width;
  padding: 30px !important;
}

.results-list-half {
  width: 55%;
  transition: 0.5s width;
}

#result-table {
  margin-top: 15px;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
}

.bet-result {
  font-weight: bold;
}

.bet-result-green {
  color: rgb(0, 161, 0);
}

.bet-result-red {
  color: rgb(228, 1, 1);
}

.edit-column {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
}

.edit-result {
  cursor: pointer;
}

.b-dropdown-form:focus {
  outline: 0 !important;
}

.dropdown-selector-all {
  display: flex;
}
*/ .dropdown-selector-all-button > button,
.dropdown-selector-all-button > button:hover,
.dropdown-selector-all-button > button:active,
.dropdown-selector-all-button > button:focus {
  font-size: 0.6em !important;
  padding: 0 !important;
  height: 55%;
  margin-top: 4.5px !important;
  margin-left: 3px !important;
}

.dropdown-selector {
  vertical-align: unset;
}

.dropdown-selector > ul {
  width: 300px;
}

.dropdown-selector-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}

.dropdown-selector-buttons > .btn-success {
  margin-right: 5px;
}

.dropdown-selector-select {
  width: 100%;
}

.dropdown-toggle::after {
  border-top: none;
  padding: 0;
  content: none;
}

.dropdown-toggle,
.dropdown-toggle:active,
.dropdown-toggle:focus,
.dropdown-toggle:active + .dropdown-toggle:focus,
.dropdown-toggle:checked + .dropdown-toggle:focus {
  color: inherit !important;
  background: inherit !important;
  border: none !important;
  border-bottom: 1px dotted red !important;
  border-radius: 0px !important;
  padding: 0px !important;
  margin: 0px !important;
  box-shadow: none !important;
}

.popover {
  width: 29%;
  max-width: 900px;
}

.popover-method-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.popover-body > div > select {
  width: 99%;
}

.popover-buttons {
  display: flex;
  justify-content: flex-end;
  width: 60%;
}

.fa-exclamation-triangle {
  margin-left: 5px;
  color: rgb(196, 0, 0);
  font-size: 0.8em;
}

.fa-info-circle {
  color: #c29502;
  margin-left: 5px;
  font-size: 0.9em;
}

.dropdown-content {
  display: flex;
  align-items: center;
}

.import-buttons {
  display: flex;
  /* width: 50%; */
  justify-content: flex-end;
}

.import-buttons > button {
  width: 10%;
}

.import-buttons > .btn-warning {
  margin-right: 15px;
}

.import-buttons > .btn-warning:active,
.import-buttons > .btn-danger:active,
.import-buttons > .btn-warning:focus,
.import-buttons > .btn-danger:focus {
  box-shadow: none;
}

.fa-trash-o {
  cursor: pointer;
}
</style>