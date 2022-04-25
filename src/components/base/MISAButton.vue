<template>
  <button class="m-button" :class="type">
    {{ buttonTitle }}
  </button>
</template>
<script>
export default {
  name: 'the-button',
  props: ['buttonTitle', 'type'],
};
</script>
<style></style>
