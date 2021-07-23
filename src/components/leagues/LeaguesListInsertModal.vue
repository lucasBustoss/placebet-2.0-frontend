<template>
  <b-modal
    id="league-insert-modal"
    header-bg-variant="dark"
    header-text-variant="light"
    title="Criar campeonato"
  >
    <div class="modal-row">
      <b-form-group
        class="league-name-input"
        label="Nome"
        label-for="league-name"
      >
        <b-form-input
          id="league-name"
          v-model="name"
          trim
          placeholder="Digite o nome do novo campeonato"
        ></b-form-input>
      </b-form-group>
    </div>

    <template #modal-footer>
      <div class="">
        <b-button
          variant="danger"
          class="league-modal-cancel"
          @click="hideModal"
        >
          Cancelar
        </b-button>
        <b-button
          variant="warning"
          class="league-modal-insert"
          @click="insertLeague"
        >
          Inserir
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    insertLeague() {
      this.$emit("insertLeague", this.name);
      this.hideModal();
    },
    hideModal() {
      this.$bvModal.hide("league-insert-modal");
    },
  },
};
</script>

<style>
.modal-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.league-name-input {
  width: 100%;
}

.league-modal-insert,
.league-modal-cancel {
  border: none;
}

.league-modal-insert {
  margin-left: 15px;
}
</style>