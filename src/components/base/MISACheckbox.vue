<template>
  <!-- Nếu true thì nhận giá trị css -->
  <div
    class="m-checkbox"
    :class="{
      'm-checkbox-selected': isChecked,
    }"
    @click="this.isChecked = !this.isChecked"
  ></div>
</template>
<script>
export default {
  name: 'the-checkbox',

  props: ['checked', 'id'],

  watch: {
    checked: function (newValue) {
      this.isChecked = newValue;
    },
  },

  methods: {},

  data() {
    return {
      isChecked: false,
    };
  },
};
</script>
<style>
@import url(/src/css/base/checkbox.css);
</style>
