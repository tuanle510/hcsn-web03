<template>
  <div class="m-navbar" :style="{ width: navBarWidth + 'px' }">
    <div class="m-navbar-header">
      <div class="navbar-header-logo"></div>
      <div v-if="!isNavBarClose" class="navbar-header-title">MISA QLTS</div>
    </div>

    <ul class="m-navbar-list">
      <li
        v-for="(navbar, index) in navBarList"
        @click="onClickNavBar(navbar)"
        :key="index"
        class="navbar-item"
        :class="{ 'navbar-selected': this.navBarSeleced == navbar }"
      >
        <div class="navbar-logo">
          <div
            v-if="this.navBarSeleced == navbar"
            :class="`${navbar.icon}-active`"
          ></div>
          <div v-else :class="navbar.icon"></div>
        </div>

        <div class="navbar-item-title">
          <router-link
            :to="'/' + navbar.link"
            style="line-height: 20px; padding: 10px 90px 10px 44px; z-index: 20"
          >
            <p v-show="!isNavBarClose">{{ navbar.title }}</p>
          </router-link>
          <div class="navbar-down" v-show="navbar.hasOwnProperty('childList')">
            <div class="dropdown"></div>
          </div>
        </div>
        <!-- <ul class="navbar-child"></ul> -->
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

  beforeMount() {
    this.navBarSeleced = this.navBarList[1];
  },

  methods: {
    onClickToggleNavBar() {
      this.isNavBarClose = !this.isNavBarClose;
      this.$emit('onCloseNavBar', this.isNavBarClose);
    },

    /**
     * Mô tả : Ấn vào từng dòng trong navbar
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 14:11 02/06/2022
     */
    onClickNavBar(navbar) {
      this.navBarSeleced = navbar;
    },
  },
  data() {
    return {
      isNavBarClose: false, //đóng mở navbar
      navBarSeleced: {},
      navBarList: [
        // {
        //   title: 'Tổng quan',
        //   icon: 'home',
        // },
        {
          title: 'Tài sản',
          icon: 'asset',
          link: 'asset',
          childList: [{ childTitle: 'Tổng quan 1' }],
        },
        {
          title: 'Ghi tăng',
          icon: 'setting',
          link: 'lisence',
        },
        // {
        //   title: 'Tài sản HT-ĐB',
        //   icon: 'line',
        //   childList: [{ childTitle: 'Tổng quan 1' }],
        // },
        // {
        //   title: 'Công cụ dụng cụ',
        //   icon: 'tool',
        //   childList: [{ childTitle: 'Tổng quan 1' }],
        // },
        // { title: 'Danh mục', icon: 'category' },
        // {
        //   title: 'Tra cứu',
        //   icon: 'search',
        //   childList: [{ childTitle: 'Tổng quan 1' }],
        // },
        // {
        //   title: 'Báo cáo',
        //   icon: 'report',
        //   childList: [{ childTitle: 'Tổng quan 1' }],
        // },
      ],
    };
  },
};
</script>
<style>
.text-show {
  visibility: hidden;
}
</style>
