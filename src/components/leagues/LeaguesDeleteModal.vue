<template>
  <b-modal id="league-delete-modal">
    <template #modal-title> Deletar campeonato </template>
    Deseja realmente excluir este campeonato?
    <template #modal-footer>
      <div class="league-delete-modal-footer">
        <b-button variant="secondary" @click="hideModal" size="md">
          Cancelar
        </b-button>
        <b-button
          variant="danger"
          @click="deleteLeague"
          class="league-delete-modal-deletebutton"
          size="md"
        >
          Excluir
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  methods: {
    hideModal() {
      this.$bvModal.hide("league-delete-modal");
    },
    deleteLeague() {
      this.$emit("deleteLeague");
      this.hideModal();
    },
  },
};
</script>

<style>
.league-delete-modal-deletebutton {
  margin-left: 15px;
}
</style>