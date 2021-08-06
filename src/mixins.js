var mixin = {
  methods: {
    formatDecimal(type, number) {
      const newNumber = Number(number);

      if (isNaN(newNumber)) {
        return;
      }

      if (Number(type) === 1) {
        return newNumber.toFixed(2).replace(".", ",");
      }

      return newNumber.toFixed(2);
    }
  }
}

export { mixin };