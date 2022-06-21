<template>
  <div class="m-input-container">
    <input
      ref="input"
      class="m-input"
      title=""
      :type="type"
      :name="name"
      :class="classParent"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :isNumber="isNumber"
      @keypress="onlyNumber"
      @blur="blurInput($event)"
      @focus="focusInput($event)"
      @input="onChangeHandler"
      :value="this.modelValue"
    />
    <div v-if="this.errorMsg" class="m-input-msg">{{ errorMsg }}</div>
  </div>
</template>
<script>
export default {
  name: 'the-input',

  props: [
    'number', //style number chuyền từ component cha
    'placeholder',
    'disabled',
    'classParent',
    'type',
    'modelValue',
    'maxlength',
    'required',
    'name',
    'isNumber',
    'currencyFormat',
  ],

  emits: [
    'setIsValid',
    'update:modelValue',
    'keypress',
    'keydown.down',
    'keydown.up',
    'blur',
  ],

  mounted() {
    if (this.currencyFormat) {
      var value = this.$refs.input.value.replaceAll('.', '');
      this.$refs.input.value = `${value
        ?.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    }
  },

  updated() {
    if (this.$refs.input.value != '') {
      this.validateRequired();
    }
  },

  methods: {
    // Nhận thay đổi của component cha
    onChangeHandler(e) {
      e.preventDefault();
      if (this.currencyFormat) {
        var value = e.target.value.replaceAll('.', '');
        e.target.value = `${value
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
      }
      this.$emit('update:modelValue', e.target.value);
    },

    /**
     * Mô tả : Chỉ nhận input
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 23:44 02/05/2022
     */
    onlyNumber($event) {
      if (this.isNumber == true) {
        let keyCode = $event.keyCode ? $event.keyCode : $event.which;
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
          $event.preventDefault();
        }
      }
    },

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

    /**
     * Mô tả : Xử lí sự kiện blur
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 19:29 05/05/2022
     */
    blurInput($event) {
      this.validateRequired();
      this.$emit('blur', $event);
    },

    focusInput() {
      this.errorMsg = '';
      this.$refs.input.selected();
    },

    /**
     * Mô tả : validate input trống
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:54 11/06/2022
     */
    validateRequired() {
      var value = this.$refs.input.value;
      if (this.required && (value === undefined || value.toString() == '')) {
        this.$refs.input.classList.add('m-input-error');
        this.createErrorMsg();
      } else {
        this.$refs.input.classList.remove('m-input-error');
        this.errorMsg = '';
      }
    },

    /**
     * Mô tả : Tạo error msg
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:54 11/06/2022
     */
    createErrorMsg() {
      var inputName = this.$refs.input.name;
      if (inputName == undefined || inputName == '') {
        this.errorMsg = 'Ô này không được để trống!';
      } else {
        this.errorMsg = `${inputName} không được để trống!`;
      }
    },
  },

  data() {
    return {
      errorMsg: '',
    };
  },
};
</script>
<style></style>
