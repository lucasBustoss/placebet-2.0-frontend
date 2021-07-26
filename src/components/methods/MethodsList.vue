<template>
  <div class="methods-list">
    <b-table striped hover :items="methods" :fields="fields">
      <template #cell(name)="data">{{ data.item.name }}</template>
      <template #cell(entrance)="data">{{ data.item.entrance }}</template>
      <template #cell(greens)="data">{{ data.item.greens }}</template>
      <template #cell(reds)="data"> {{ data.item.reds }}</template>
      <template #cell(result)="data">
        $ {{ formattedDecimalValue(data.item.result) }}</template
      >
      <template #cell(roi)="data"
        >{{ formattedDecimalValue(data.item.roi) }}%</template
      >
      <template #cell(greenPercent)="data"
        >{{ formattedDecimalValue(data.item.greenPercent) }}%</template
      >
      <template #cell(redPercent)="data"
        >{{ formattedDecimalValue(data.item.redPercent) }}%</template
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
    <div class="methods-buttons">
      <b-button variant="warning" @click="showInsertModal">
        Criar estratégia</b-button
      >
    </div>

    <MethodsListInsertModal @insertMethod="insertMethod" />
    <MethodsDeleteModal @deleteMethod="deleteMethod" />
  </div>
</template>

<script>
import MethodsListInsertModal from "./MethodsListInsertModal";
import MethodsDeleteModal from "./MethodsDeleteModal";

export default {
  props: ["methods"],
  components: { MethodsListInsertModal, MethodsDeleteModal },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Estratégia",
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
      method: null,
    };
  },
  methods: {
    showInsertModal() {
      this.$bvModal.show("method-insert-modal");
    },
    showDeleteModal(data) {
      this.method = data.item;

      this.$bvModal.show("method-delete-modal");
    },
    insertMethod(name) {
      this.$emit("insertMethod", name);
    },
    deleteMethod() {
      this.$emit("deleteMethod", this.method.id);
    },
    formattedDecimalValue(value) {
      const numberValue = Number(value);
      return numberValue.toFixed(2);
    },
  },
};
</script>

<style>
.methods-list {
  padding: 30px;
  border: 1px solid #aaa;
  border-radius: 10px;
  width: 100%;
}

.methods-buttons {
  display: flex;
  justify-content: flex-end;
}

.methods-buttons > button {
  width: 25%;
  border: none;
}
</style>