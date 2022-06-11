<template>
  <div class="m-navbar" :style="{ width: navBarWidth + 'px' }">
    <div class="m-navbar-header">
      <div class="navbar-header-logo"></div>
      <div v-if="!isNavBarClose" class="navbar-header-title">MISA QLTS</div>
    </div>

    <ul class="m-navbar-list">
      <li v-for="(router, index) in routerList" :key="index">
        <router-link class="m-link" :to="{ path: router.link }">
          <div class="navbar-logo">
            <!-- this.refs.router.classList.includes("router-link-exact-active") ?
              router.class : `${router.class}-active`  -->
            <div :class="router.icon"></div>
          </div>
          <p v-if="!isNavBarClose">{{ router.name }}</p>
        </router-link>
      </li>
    </ul>

    <div class="close-navbar">
      <div class="close-navbar-box" @click="onClickToggleNavBar">
        <div v-if="!isNavBarClose" class="close-navbar-icon"></div>
        <div v-else class="open-navbar-icon"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'the-navbar',
  props: ['navBarWidth'],

  methods: {
    onClickToggleNavBar() {
      this.isNavBarClose = !this.isNavBarClose;
      this.$emit('onCloseNavBar', this.isNavBarClose);
    },
  },
  data() {
    return {
      isNavBarClose: false, //đóng mở navbar
      routerList: [
        {
          link: '/asset',
          icon: 'asset',
          name: 'Tài sản',
        },
        {
          link: '/license',
          icon: 'setting',
          name: 'Ghi tăng',
        },
      ],
    };
  },
};
</script>
<style></style>
