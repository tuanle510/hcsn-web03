<template>
  <input
    ref="input"
    :type="type"
    class="m-input"
    :class="[{ 'm-input-error': isEmpty }]"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onChangeHandler"
    @blur="outFocus"
    :value="this.modelValue"
  />
  <div v-if="isEmpty" class="m-error">{{ errorMsg }}</div>
</template>
<script>
export default {
  name: 'the-input',

  props: [
    'number', //style number chuyền từ component cha
    'placeholder',
    'disabled',
    'type',
    'modelValue',
    'required',
    'maxlength',
    'errorMsg',
  ],

  emits: ['setIsValid', 'update:modelValue', 'keypress', ''],

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
      this.$emit('update:modelValue', e.target.value);
    },

    /**
     * Mô tả : kiểm tra input có trống không
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 19:29 05/05/2022
     */
    outFocus() {
      if (this.required && (this.modelValue == '' || this.modelValue == null)) {
        this.isEmpty = true;
        this.$emit('setIsValid', false);
      } else {
        this.isEmpty = false;
        this.$emit('setIsValid', true);
      }
    },
  },

  data() {
    return {
      isEmpty: false,
      errorList: [],
    };
  },
};
</script>
<style></style>
