<template>
  <div class="m-combobox">
    <div class="combobox-contaner">
      <div v-if="hasIcon" class="combobox-icon">
        <div class="filter"></div>
      </div>
      <input
        class="combobox-text"
        :class="{ 'input-no-icon': !hasIcon }"
        :placeholder="placeholder"
        v-model="optionSeleced"
      />
      <div @click="isOptionShow = !isOptionShow" class="icon-box">
        <div v-if="isOptionShow" class="up"></div>
        <div v-else class="down"></div>
      </div>
    </div>
    <ul class="m-option-list" v-if="isOptionShow">
      <li
        v-for="(option, index) in optionFilter"
        :key="index"
        class="m-option-item"
        @click="onChoseOpton(option)"
        :class="{ 'm-item-selected': optionSeleced == option }"
      >
        <div
          class="option-item-box"
          :class="{ 'option-item-box-selected': optionSeleced == option }"
        >
          <div class="plus"></div>
        </div>
        {{ option }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'the-combobox',

  props: ['placeholder', 'hasIcon'],

  methods: {
    /**
     * Chọn giá trị cho dropdown
     */
    onChoseOpton(option) {
      this.optionSeleced = option;
      this.isOptionChecked = !this.isOptionChecked;
      this.isOptionShow = false;
    },
  },

  data() {
    return {
      isOptionShow: false,
      optionSeleced: '',
      optionList: ['Saab', 'Volvo', 'BMW', 'BMW', 'BMW'],
      optionFilter: [],
    };
  },
};
</script>
<style></style>
