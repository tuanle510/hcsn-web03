<template>
  <input
    ref="input"
    :type="type"
    class="m-input"
    :class="[classParent]"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onChangeHandler"
    @blur="outFocus($event)"
    :value="this.modelValue"
  />
  <!-- <div v-if="isEmpty" class="m-error">{{ errorMsg }}</div> -->
</template>
<script>
export default {
  name: "the-input",

  props: [
    "number", //style number chuyền từ component cha
    "placeholder",
    "disabled",
    "classParent",
    "type",
    "modelValue",
    "required",
    "maxlength",
  ],

  emits: [
    "setIsValid",
    "update:modelValue",
    "keypress",
    "keydown.down",
    "keydown.up",
    "blur",
  ],

  methods: {
    /**
     * Mô tả : focus vào ô đầu tiên
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 19:46 05/05/2022
     */
    setFocus() {
      this.$refs.input.focus();
    },

    // Nhận thay đổi của component cha
    onChangeHandler(e) {
      e.preventDefault();
      this.$emit("update:modelValue", e.target.value);
    },

    /**
     * Mô tả : kiểm tra input có trống không
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 19:29 05/05/2022
     */
    outFocus($event) {
      this.$emit("blur", $event);
    },
  },

  data() {
    return {};
  },
};
</script>
<style></style>
