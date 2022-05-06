<template>
  <button :disabled="disabled" class="m-button" :class="type">
    {{ buttonTitle }}
  </button>
</template>
<script>
export default {
  name: "the-button",
  props: ["buttonTitle", "type", "disabled", "isValid"],
};
</script>
<style></style>
