<template>
  <div class="m-navbar" :style="{ width: navBarWidth + 'px' }">
    <div class="m-navbar-header">
      <div class="navbar-header-logo"></div>
      <div v-if="!isNavBarClose" class="navbar-header-title">MISA QLTS</div>
    </div>

    <div class="m-navbar-list">
      <div class="navbar-item navbar-selected">
        <div class="navbar-logo">
          <div class="home-active"></div>
        </div>
        <div class="navbar-item-title" v-if="!isNavBarClose">
          Tổng quan

          <!-- <div class="navbar-down">
          <div class="dropdown"></div>
        </div> -->
        </div>
      </div>
      <div class="navbar-item">
        <div class="navbar-logo">
          <div class="asset"></div>
        </div>
        <div class="navbar-item-title" v-if="!isNavBarClose">Tài sản</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-logo">
          <div class="line"></div>
        </div>
        <div class="navbar-item-title" v-if="!isNavBarClose">Tài sản HT-ĐB</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-logo">
          <div class="tool"></div>
        </div>
        <div class="navbar-item-title" v-if="!isNavBarClose">
          Công cụ dụng cụ
        </div>
      </div>
      <div class="navbar-item">
        <div class="navbar-logo">
          <div class="category"></div>
        </div>
        <div class="navbar-item-title" v-if="!isNavBarClose">Danh mục</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-logo">
          <div class="search"></div>
        </div>
        <div class="navbar-item-title" v-if="!isNavBarClose">Tra cứu</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-logo">
          <div class="report"></div>
        </div>
        <div class="navbar-item-title" v-if="!isNavBarClose">Báo cáo</div>
      </div>
    </div>

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
  name: "the-navbar",
  props: ["navBarWidth"],

  methods: {
    onClickToggleNavBar() { 
      this.isNavBarClose = !this.isNavBarClose;
      this.$emit("onCloseNavBar", this.isNavBarClose);
    },
  },
  data() {
    return {
      isNavBarClose: false,
      isActive: true,
    };
  },
};
</script>
<style></style>
