<template>
  <div class="m-search-box">
    <div class="search-icon">
      <div class="search"></div>
    </div>
    <input class="m-search" type="text" :placeholder="placeholder" />
  </div>
</template>
<script>
export default {
  props: ["placeholder"],

  name: "seach-box",
};
</script>
<style>
@import url(/src/css/base/search.css);
</style>
