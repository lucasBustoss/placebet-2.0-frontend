<template>
  <b-modal id="method-delete-modal">
    <template #modal-title> Deletar estratégia </template>
    Deseja realmente excluir esta estratégia?
    <template #modal-footer>
      <div class="method-delete-modal-footer">
        <b-button variant="secondary" @click="hideModal" size="md">
          Cancelar
        </b-button>
        <b-button
          variant="danger"
          @click="deleteMethod"
          class="method-delete-modal-deletebutton"
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
      this.$bvModal.hide("method-delete-modal");
    },
    deleteMethod() {
      this.$emit("deleteMethod");
      this.hideModal();
    },
  },
};
</script>

<style>
.method-delete-modal-deletebutton {
  margin-left: 15px;
}
</style>