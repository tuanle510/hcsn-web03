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
        class="combobox-text"
        :class="{ 'input-no-icon': !hasIcon }"
        @keydown.tab="this.isOptionShow = false"
        @focus="setFocus"
        @blur="outFoucs"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="selectItem"
        :placeholder="placeholder"
        @input="onChangeHandler"
        :value="this.modelValue"
      />

      <div
        style="position: absolute; right: 20px"
        @click="clearInput"
        v-if="hasInput"
        class="icon-combobox"
      >
        <div class="clear"></div>
      </div>
      <div
        style="position: absolute; right: 0"
        @click="clickComboBox()"
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

  props: ["hasIcon", "placeholder", "filterby", "optionList", "modelValue"],

  // computed: {
  //   matches() {
  //     if (this.modelValue == undefined) {
  //       return this.optionList;
  //     } else {
  //       return this.optionList.filter((item) =>
  //         item[this.filterby]
  //           .toLowerCase()
  //           .includes(this.modelValue.toLowerCase())
  //       );
  //     }
  //   },
  // },

  watch: {
    modelValue: function (newValue, oldValue) {
      console.log(newValue, oldValue);
      if (newValue == undefined || newValue == "") {
        this.hasInput = false;
      } else {
        this.hasInput = true;
      }
    },

    matches: function (newValue) {
      if (newValue.length != this.optionList.length) {
        this.selecedIndex = 0;
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
      // this.isInputing = true;
      this.$emit("update:modelValue", e.target.value);
      this.matches = this.optionList.filter((item) =>
        item[this.filterby]
          .toLowerCase()
          .includes(this.modelValue.toLowerCase())
      );
    },

    /**
     * Mô tả : khi focus vào thì hiện out line, blur thì bỏ outline
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:23 30/04/2022
     */
    setFocus() {
      this.$refs.combobox.style.border = "1px solid #22a7ca";
      // this.matches = this.optionList;
      // this.isInputing = false;
      this.$emit("update:modelValue", this.modelValue);
      this.clickComboBox();
    },
    outFoucs() {
      this.$refs.combobox.style.border = "1px solid #afafaf";
    },

    /**
     * Mô tả : clear input
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 14:52 28/04/2022
     */
    clearInput() {
      this.$emit("update:modelValue");
      this.hasInput = false;
      this.isOptionShow = false;
      this.selecedIndex = 0;
    },

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
      try {
        this.$emit(
          "update:modelValue",
          this.matches[this.selecedIndex][this.filterby]
        );
        this.isOptionShow = false;

        this.$refs.input.blur();
      } catch (error) {
        console.log(error);
      }
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

    clickComboBox() {
      this.isOptionShow = !this.isOptionShow;
      this.matches = [...this.optionList];
      // console.log(`list ${this.optionList}`);
      // console.log(this.matches);
      this.$nextTick(() => {
        this.$refs.optionList.scrollTop = this.selecedIndex * 36;
      });
    },

    scrollToItem() {
      this.$refs.optionList.scrollTop = this.selecedIndex * 36;
    },
  },

  data() {
    return {
      selecedIndex: 0,
      matches: [],
      // isInputing: false,
      isOptionShow: false,
      hasInput: false,
    };
  },
};
</script>
<style></style>
