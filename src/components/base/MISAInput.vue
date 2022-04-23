<template>
  <input
    ref="input"
    :type="type"
    class="m-input"
    :placeholder="placeholder"
    @input="onChangeHandler"
    :value="this.modelValue"
  />
</template>
<script>
export default {
  name: "the-input",

  props: ["placeholder", "type", "modelValue"],

  methods: {
    setFocus() {
      this.$refs.input.focus();
    },
    
    onChangeHandler(e) {
      e.preventDefault();
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>
<style></style>
