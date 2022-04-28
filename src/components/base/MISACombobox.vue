<template>
  <div class="m-combobox">
    <div class="combobox-contaner">
      <div v-if="hasIcon" class="combobox-icon">
        <div class="filter"></div>
      </div>
      <input
        class="combobox-text"
        :class="{ 'input-no-icon': !hasIcon }"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="selectItem"
        :placeholder="placeholder"
        v-model="optionInput"
      />
      <div @click="isOptionShow = !isOptionShow" class="icon-box">
        <div v-if="isOptionShow" class="up"></div>
        <div v-else class="down"></div>
      </div>
    </div>
    <ul class="m-option-list" v-if="matches.length != 0">
      <li
        v-for="(option, index) in matches"
        :key="index"
        class="m-option-item"
        @click="onChoseOpton(option)"
        :class="{ 'm-item-selected': index == 0 }"
      >
        {{ option.name }}
        <div
          class="option-item-box"
          :class="{ 'option-item-box-selected': optionSeleced == option }"
        >
          <div class="plus"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'the-combobox',

  props: ['placeholder', 'hasIcon', 'filterby', 'optionList'],

  computed: {
    matches() {
      if (this.optionInput == '') {
        return [];
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
     * Chọn giá trị cho dropdown
     */
    onChoseOpton(option) {
      this.optionInput = option.name;
      this.isOptionChecked = !this.isOptionChecked;
      this.isOptionShow = false;
    },
  },

  data() {
    return {
      optionSeleced: '',
      isOptionShow: false,
      optionInput: '',
    };
  },
};
</script>
<style></style>
