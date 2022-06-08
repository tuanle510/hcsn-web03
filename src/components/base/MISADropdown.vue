<template>
  <div
    class="m-dropdown"
    v-on:clickout="this.isOptionShow = false"
    ref="dropdown"
  >
    <div class="m-dropdown-main" @click.prevent="onClick">
      <div class="dropdown-title">{{ optionChose }}</div>
      <div class="dropdown-icon">
        <div :class="[this.isOptionShow ? 'up' : 'down']"></div>
      </div>
    </div>
    <ul
      v-if="isOptionShow"
      class="m-dropdown-option"
      :style="{
        top: this.optionPos.top + 'px',
        left: this.optionPos.left + 'px',
      }"
    >
      <li
        v-for="(option, index) in optionList"
        :key="index"
        @click="onChose(option)"
        class="option-item"
        :class="[this.optionChose == option ? 'option-item-seleced ' : '']"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["defaultValue"],
  beforeMount() {
    this.optionChose = this.defaultValue;
  },
  methods: {
    onClick() {
      let dropdown = this.$refs.dropdown.getBoundingClientRect();
      console.log(dropdown);
      this.optionPos = {
        top: dropdown.top - 100,
        left: dropdown.left,
      };

      this.isOptionShow = !this.isOptionShow;
    },
    onChose(option) {
      this.optionChose = option;
      this.isOptionShow = false;
      this.$emit("onChose", option);
    },
  },
  data() {
    return {
      optionList: [20, 30, 40, 100],
      isOptionShow: false,
      optionChose: null,
      optionPos: {},
    };
  },
};
</script>
<style></style>
