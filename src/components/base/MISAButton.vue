<template>
  <button class="m-button" :class="type">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "the-button",
  props: ["inputTitle", "type"],
};
</script>
<style>
@import url(/src/css/base/button.css);
</style>
