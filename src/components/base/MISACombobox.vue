<template>
  <div class="m-combobox">
    <div class="combobox-contaner">
      <div v-if="hasIcon" class="combobox-icon">
        <div class="filter"></div>
      </div>
      <input
        ref="optionInput"
        class="combobox-text"
        :class="{ 'input-no-icon': !hasIcon }"
        @focus="this.isOptionShow = true"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="selectItem"
        :placeholder="placeholder"
        v-model="optionInput"
      />

      <div
        style="position: absolute; right: 20px"
        @click="clearInput"
        v-if="optionInput != ''"
        class="icon-combobox"
      >
        <div class="clear"></div>
      </div>
      <div
        style="position: absolute; right: 0"
        @click="isOptionShow = !isOptionShow"
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
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "the-combobox",

  props: ["placeholder", "hasIcon", "filterby", "optionList"],

  computed: {
    matches() {
      if (this.optionList == null) {
        return [];
      }
      if (this.optionInput == "") {
        return this.optionList;
      } else {
        return this.optionList.filter((item) =>
          item[this.filterby]
            .toLowerCase()
            .includes(this.optionInput.toLowerCase())
        );
      }
    },
  },

  methods: {
    /**
     * Mô tả : clear input
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 14:52 28/04/2022
     */
    clearInput() {
      this.optionInput = "";
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
      this.optionInput = this.matches[this.selecedIndex].name;
      this.isOptionShow = false;
      this.$refs.optionInput.blur();
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

    scrollToItem() {
      this.$refs.optionList.   = this.selecedIndex * 36;
    },
  },

  data() {
    return {
      selecedIndex: 0,
      isOptionShow: false,
      optionInput: "",
    };
  },
};
</script>
<style></style>
