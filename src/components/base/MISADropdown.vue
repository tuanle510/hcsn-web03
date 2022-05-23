<template>
  <div class="m-dropdown" v-on:clickout="this.isOptionShow = false">
    <div
      class="m-dropdown-main"
      @click="this.isOptionShow = !this.isOptionShow"
    >
      <div class="dropdown-title">{{ optionChose }}</div>
      <div class="dropdown-icon">
        <div :class="[this.isOptionShow ? 'up' : 'down']"></div>
      </div>
    </div>
    <ul v-if="isOptionShow" class="m-dropdown-option">
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
    onChose(option) {
      this.optionChose = option;
      this.isOptionShow = false;
      this.$emit("onChose", option);
    },
  },
  data() {
    return {
      optionList: [10, 20, 40, 100],
      isOptionShow: false,
      optionChose: null,
    };
  },
};
</script>
<style></style>
