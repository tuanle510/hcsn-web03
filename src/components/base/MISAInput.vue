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
      @blur="outFocus($event)"
      @click="this.$refs.input.select()"
      @input="onChangeHandler"
      :value="this.modelValue"
    />
    <div v-if="this.errorMsg != null" class="m-input-msg">{{ errorMsg }}</div>
  </div>
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
    "maxlength",
    "required",
    "name",
    "isNumber",
  ],

  emits: [
    "setIsValid",
    "update:modelValue",
    "keypress",
    "keydown.down",
    "keydown.up",
    "blur",
  ],

  /**
   * Mô tả : Validate khi giá trị input thay đổi
   * @param
   * @return
   * Created by: Lê Thiện Tuấn - MF1118
   * Created date: 09:46 31/05/2022
   */
  updated() {
    this.validateRequired();
  },

  methods: {
    // Nhận thay đổi của component cha
    onChangeHandler(e) {
      e.preventDefault();
      this.$emit("update:modelValue", e.target.value);
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
     * Mô tả : kiểm tra input có trống không
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 19:29 05/05/2022
     */
    outFocus($event) {
      this.validateRequired();
      this.$emit("blur", $event);
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
      if (
        this.required &&
        (value === undefined || value.toString().trim() === "")
      ) {
        this.$refs.input.classList.add("m-input-error");
        this.createErrorMsg();
      } else {
        this.$refs.input.classList.remove("m-input-error");
        this.errorMsg = null;
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
      if (inputName == undefined || inputName == "") {
        this.errorMsg = "Ô này không được để trống!";
      } else {
        this.errorMsg = `${inputName} không được để trống!`;
      }
    },
  },

  data() {
    return {
      errorMsg: null,
    };
  },
};
</script>
<style></style>
