<template>
  <div class="m-search-box" :class="{ 'm-search-box-focus': isFocus }">
    <div class="search-icon">
      <div class="search"></div>
    </div>
    <input
      @focus="this.isFocus = true"
      @blur="this.isFocus = false"
      class="m-search"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>
<script>
export default {
  name: 'seach-box',
  props: ['placeholder'],
  methods: {
    inputFocus() {
      this.isFocus = true;
    },
  },

  data() {
    return {
      isFocus: false,
    };
  },
};
</script>
<style>
@import url(/src/css/base/search.css);
</style>
