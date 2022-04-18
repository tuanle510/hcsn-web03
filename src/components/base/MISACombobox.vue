<template>
  <div class="m-combobox">
    <div class="combobox-icon icon-box">
      <div class="filter"></div>
    </div>
    <div class="combobox-text">{{title}}</div>
    <div class="combobox-down down"></div>
  </div>
</template>
<script>
export default {
  name: "the-combobox",

  props: ['title']
};


</script>
<style>
@import url(/src/css/base/combobox.css);
</style>
