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
        :name="name"
        @keydown.tab="this.isOptionShow = false"
        @focus="setFocus"
        @blur="outFoucs($event)"
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
  ],

  watch: {
    modelValue: function (newValue) {
      if (newValue == undefined || newValue == "") {
        this.hasInput = false;
        this.matches = [...this.optionList];
      } else {
        this.hasInput = true;
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
      this.isFocus = true;
      this.$refs.combobox.style.border = "1px solid #22a7ca";
      this.isOptionShow = true;
      this.matches = [...this.optionList];
      this.$nextTick(() => {
        this.$refs.optionList.scrollTop = this.selecedIndex * 36;
      });
    },
    outFoucs($event) {
      this.isFocus = false;
      this.$refs.combobox.style.border = "1px solid #afafaf";
      this.validateRequired();
      this.$emit("blur", $event);
    },

    /**
     * Mô tả : Validate required
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:54 06/05/2022
     */
    validateRequired() {
      console.log(this.modelValue);
      if (
        this.required &&
        (this.modelValue === "" || this.modelValue == undefined)
      ) {
        this.$refs.combobox.style.border = "1px solid #ec4b4b";
      } else {
        this.$refs.combobox.style.border = "1px solid #afafaf";
      }
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
      this.validateRequired();
    },

    async selectItem() {
      try {
        await this.$emit(
          "update:modelValue",
          this.matches[this.selecedIndex][this.filterby]
        );
        this.validateRequired();
        this.isOptionShow = false;
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

    toggleCbb() {
      this.isOptionShow = !this.isOptionShow;
      this.matches = [...this.optionList];
      if (this.isOptionShow == true) {
        this.$nextTick(() => {
          this.$refs.optionList.scrollTop = this.selecedIndex * 36;
        });
      }
    },

    scrollToItem() {
      this.$refs.optionList.scrollTop = this.selecedIndex * 36;
    },
  },

  data() {
    return {
      selecedIndex: 0,
      matches: [],
      isOptionShow: false,
      hasInput: false,
      isFocus: false,
    };
  },
};
</script>
<style></style>
