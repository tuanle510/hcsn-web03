<template>
  <div class="m-combobox">
    <div class="combobox-contaner">
      <div v-show="this.hasIcon" class="combobox-icon">
        <div class="filter"></div>
      </div>
      <input
        @focus="this.isOptionShow = true"
        @blur="this.isOptionShow = false"
        class="combobox-text"
        :class="{ 'input-no-icon': !this.hasIcon }"
        :placeholder="placeholder"
        :value="optionSeleced"
      />
      <div @click="this.isOptionShow = !this.isOptionShow" class="icon-box">
        <div class="down"></div>
      </div>
    </div>
    <ul class="m-option-list" v-show="isOptionShow">
      <li
        v-for="(option, index) in optionList"
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
// $(".input").autocomplete(
//   {
//     source: this.optionList,
//   },
//   {}
// );

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
      optionList: ['Saab', 'Volvo', 'BMW'],
    };
  },
};
</script>
<style></style>
