<template>
  <div class="m-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :class="{ 'number-input': type == 'number' }"
    />
  </div>
</template>
<script>
export default {
  name: "the-input",

  props: ["type", "placeholder"],
  data() {
    return {};
  },
};
</script>
<style>
@import url(/src/css/base/input.css);
</style>
