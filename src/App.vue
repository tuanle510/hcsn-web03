<template>
  <div>
    <div class="m-layout">
      <Navbar />
      <div class="m-main">
        <Header />
        <Content></Content>
      </div>
    </div>
  </div>
</template>

<script>

import Header from './components/layout/TheHeader.vue';
import Navbar from './components/layout/TheNavBar.vue';
import Content from './components/layout/TheContent.vue';

export default {
  name: 'App',
  components: {
    Header,
    Content,
  Navbar,
  },

  methods: {},

  data() {
    return {
    };
  },
};
</script>

<style>
@import url(./css/main.css);
</style>
