<template>
  <div class="search-field">
    <div class="icon-box-36 search-icon">
      <div class="search"></div>
    </div>
    <input
      class="m-search"
      :placeholder="placeholder"
      @input="onChangeHandler"
      :value="this.modelValue"
    />
  </div>
</template>
<script>
export default {
  name: 'seach-box',
  props: ['placeholder'],
  emits: ['input', 'update:modelValue'],
  methods: {
    // Nhận thay đổi của component cha
    onChangeHandler(e) {
      e.preventDefault();
      this.$emit('update:modelValue', e.target.value);
    },
  },

  data() {
    return {};
  },
};
</script>
<style></style>
