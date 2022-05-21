<template>
  <input class="m-search" :placeholder="placeholder" />
  <!-- @input="onChangeHandler"
    :value="this.modelValue" -->
</template>
<script>
export default {
  name: "seach-box",
  props: ["placeholder"],
  methods: {
    // Nhận thay đổi của component cha
    // onChangeHandler(e) {
    //   e.preventDefault();
    //   this.$emit("update:modelValue", e.target.value);
    // },
    
  },

  data() {
    return {
      isFocus: false,
    };
  },
};
</script>
<style></style>
