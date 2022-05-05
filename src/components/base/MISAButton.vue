<template>
  <button :disabled="disabled" class="m-button" :class="type">
    {{ buttonTitle }}
  </button>
</template>
<script>
export default {
  name: 'the-button',
  props: ['buttonTitle', 'type', 'disabled'],
};
</script>
<style></style>
