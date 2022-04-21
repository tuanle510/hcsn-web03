<template>
  <div class="m-combobox">
    <div class="combobox-contaner">
      <div v-show="this.iconCheck" class="combobox-icon">
        <div class="filter"></div>
      </div>
      <input
        class="combobox-text"
        :class="{ 'input-no-icon': !this.iconCheck }"
        :placeholder="title"
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
        @click="onClickDropDown(option)"
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

  data() {
    return {
      iconCheck: this.hasIcon,
      isOptionShow: false,
      optionSeleced: '',
      optionList: ['Saab', 'Volvo', 'BMW'],
    };
  },

  props: ['title', 'hasIcon'],

  methods: {
    /**
     * Chọn giá trị cho dropdown
     * 
     */
    onClickDropDown(option) {
      this.optionSeleced = option;
      this.isOptionChecked = !this.isOptionChecked;
      this.isOptionShow = false;
    },
  },
};
</script>
<style>
@import url(/src/css/base/combobox.css);
</style>
