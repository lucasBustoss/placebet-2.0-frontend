<template>
  <b-modal
    id="method-insert-modal"
    header-bg-variant="dark"
    header-text-variant="light"
    title="Criar estratégia"
  >
    <div class="modal-row">
      <b-form-group
        class="method-name-input"
        label="Nome"
        label-for="method-name"
      >
        <b-form-input
          id="method-name"
          v-model="name"
          trim
          placeholder="Digite o nome da nova estratégia"
        ></b-form-input>
      </b-form-group>
    </div>

    <template #modal-footer>
      <div class="">
        <b-button
          variant="danger"
          class="method-modal-cancel"
          @click="hideModal"
        >
          Cancelar
        </b-button>
        <b-button
          variant="warning"
          class="method-modal-insert"
          @click="insertMethod"
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
    insertMethod() {
      this.$emit("insertMethod", this.name);
      this.hideModal();
    },
    hideModal() {
      this.$bvModal.hide("method-insert-modal");
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

.method-name-input {
  width: 100%;
}

.method-modal-insert,
.method-modal-cancel {
  border: none;
}

.method-modal-insert {
  margin-left: 15px;
}
</style>