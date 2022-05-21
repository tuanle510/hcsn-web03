<template>
  <div
    v-on:clickout="this.isOptionShow = false"
    class="m-combobox"
    ref="combobox"
  >
    <div class="combobox-contaner">
      <div v-if="hasIcon" class="combobox-icon">
        <div class="filter"></div>
      </div>
      <input
        type="text"
        ref="input"
        :required="required"
        :class="!hasIcon ? 'input-no-icon' : 'input-icon'"
        :name="name"
        :title="title"
        :maxlength="maxlength"
        :placeholder="placeholder"
        @keydown.tab="tab"
        @focus="setFocus"
        @blur="outFocus"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="selectItem"
        @input="onChangeHandler"
        :value="this.modelValue"
      />

      <div
        style="position: absolute; right: 0"
        @click="toggleCbb()"
        class="icon-combobox"
      >
        <div v-if="isOptionShow" class="up"></div>
        <div v-else class="down"></div>
      </div>
    </div>
    <ul class="m-option-list" v-if="isOptionShow" ref="optionList">
      <li
        v-for="(option, index) in matches"
        :key="index"
        class="m-option-item"
        @keydown.down="down"
        @keydown.up="up"
        @keydown.enter="selectItem"
        @click="choseOpton(index)"
        :class="{ 'm-item-selected': this.selecedIndex == index }"
      >
        {{ option[this.filterby] }}
      </li>
    </ul>
  </div>
</template>
<script>
import "clickout-event";
export default {
  name: "the-combobox",
  emits: ["blur", "keydown", "update:modelValue"],

  props: [
    "hasIcon",
    "placeholder",
    "filterby",
    "optionList",
    "modelValue",
    "name",
    "required",
    "title",
    "maxlength",
  ],

  watch: {
    matches: function (newValue, oldValue) {
      if (newValue.length != oldValue.length) {
        this.selecedIndex = 0;
      }
    },

    // Theo dõi giá trị mới của input để hiển thị optionList
    modelValue: function (newValue) {
      this.validateRequired();
      if (newValue == undefined || newValue == "") {
        this.matches = [...this.optionList];
      } else {
        this.matches = this.optionList.filter((item) =>
          item[this.filterby]
            .toLowerCase()
            .includes(this.modelValue.toLowerCase())
        );
      }
    },
  },

  methods: {
    /**
     * Mô tả : Lấy giá trị từ v-model bên cha
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:00 02/05/2022
     */
    onChangeHandler(e) {
      e.preventDefault();
      //gán lại giá trị
      this.$emit("update:modelValue", e.target.value);
    },

    /**
     * Mô tả : khi focus vào thì hiện out line, blur thì bỏ outline
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:23 30/04/2022
     */
    setFocus() {
      this.isOptionShow = true;
      this.matches = [...this.optionList];
      this.$nextTick(() => {
        this.$refs.optionList.scrollTop = this.selecedIndex * 36;
      });
    },

    /**
     * Mô tả : Xử lí sự kiệm blur
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 21:02 10/05/2022
     */
    outFocus() {
      this.validateRequired();
    },
    /**
     * Mô tả : Validate required
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:54 06/05/2022
     */
    validateRequired() {
      if (
        this.required &&
        (this.modelValue === "" || this.modelValue === undefined)
      ) {
        this.$refs.input.classList.add("m-input-error");
      } else {
        this.$refs.input.classList.remove("m-input-error");
      }
    },

    /**
    //  * Mô tả : clear input
    //  * @param
    //  * @return
    //  * Created by: Lê Thiện Tuấn - MF1118
    //  * Created date: 14:52 28/04/2022
    //  */
    // clearInput() {
    //   this.$emit("update:modelValue");
    //   this.isOptionShow = false;
    //   // this.validateRequired();
    //   this.selecedIndex = 0;
    // },

    /**
     * Mô tả : Chọn option
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:31 28/04/2022
     */
    choseOpton(index) {
      this.selecedIndex = index;
      this.selectItem();
    },

    selectItem() {
      this.$emit(
        "update:modelValue",
        this.matches[this.selecedIndex][this.filterby]
      );
      this.$refs.input.blur();
      this.isOptionShow = false;
    },

    up() {
      if (this.selecedIndex == 0) {
        return;
      }
      this.selecedIndex -= 1;

      this.scrollToItem();
    },

    down() {
      if (this.selecedIndex >= this.matches.length - 1) {
        return;
      }
      this.selecedIndex += 1;
      this.scrollToItem();
    },

    tab() {
      this.isOptionShow = false;
    },

    /**
     * Mô tả : Ấn vào nút mũi tên hiển thị/ tắt optionList
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:21 08/05/2022
     */
    toggleCbb() {
      this.isOptionShow = !this.isOptionShow;
      this.matches = [...this.optionList];
    },

    scrollToItem() {
      if (this.isOptionShow == true) {
        this.$refs.optionList.scrollTop = this.selecedIndex * 36;
      }
    },
  },

  data() {
    return {
      selecedIndex: 0,
      matches: [],
      isOptionShow: false,
    };
  },
};
</script>
<style></style>
