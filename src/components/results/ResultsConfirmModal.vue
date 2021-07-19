<template>
  <b-modal id="bet-delete-modal">
    <template #modal-title> Deletar entrada </template>
    Deseja realmente excluir esta entrada?
    <template #modal-footer>
      <div class="betmodal-footer">
        <b-button variant="secondary" @click="hideModal" size="md">
          Cancelar
        </b-button>
        <b-button variant="danger" @click="deleteBet" size="md">
          Excluir
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    hideModal() {
      this.$bvModal.hide("bet-delete-modal");
    },
    deleteBet() {
      this.$emit("deleteBet");
      this.hideModal();
    },
  },
};
</script>

<style>
</style>