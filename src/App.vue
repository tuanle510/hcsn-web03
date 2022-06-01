<template>
  <div>
    <!-- <div class="m-layout">
      <Navbar @onCloseNavBar="onCloseNavBar" :navBarWidth="navBarWidth" />
      <div
        class="m-main"
        :style="{ width: 'calc(100% - ' + this.navBarWidth + 'px)' }"
      >
        <Header />
        <Content></Content>
      </div>
    </div> -->

    <div class="m-login">
      <div class="grip-login">
        <div class="half-ctn left-grip"></div>
        <div class="half-ctn right-grip">
          <div class="main-login-ctn">
            <div class="logo"></div>
            <div class="logo-text">
              Đăng nhập để làm việc với <b>MISA QLTS</b>
            </div>

            <div id="normal-login">
              <form class="grid-login-normal">
                <div class="username-login">
                  <input
                    id="iptUserName"
                    class="input-login"
                    placeholder="Username, email hoặc số điện thoại"
                    v-model="this.loginForm.username"
                  />
                </div>
                <div class="password-login">
                  <input
                    autocomplete
                    id="iptPassword"
                    type="password"
                    placeholder="Mật khẩu"
                    class="input-login"
                    v-model="this.loginForm.password"
                  />
                  <div class="eye on-eye"></div>
                </div>

                <div class="button-login" style="margin-top: 20px">
                  <button
                    @click.prevent="onLoginClick()"
                    class="button"
                    id="login"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Header from "./components/layout/TheHeader.vue";
import Navbar from "./components/layout/TheNavBar.vue";
import Content from "./components/layout/TheContent.vue";

import axios from "axios";

export default {
  name: "App",
  components: {
    Header,
    Content,
    Navbar,
  },

  methods: {
    /**
     * Mô tả : login
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:02 31/05/2022
     */
    async onLoginClick() {
      console.log("first");
      try {
        const res = await axios.post(
          "http://localhost:5234/api/Users",
          this.loginForm,
          // {
          //   headers: {
          //     withCredentials: true,
          //     "Access-Control-Allow-Origin": "*",
          //     "Content-Type": "application/json",
          //   },
          // }
        );
        console.log(res);
      } catch (error) {}
    },
    /**
     * Đóng mở navbar
     */
    onCloseNavBar(isToggle) {
      if (isToggle == false) {
        this.navBarWidth = 226;
      } else {
        this.navBarWidth = 66;
      }
    },
  },

  data() {
    return {
      navBarWidth: 226,
      loginForm: {
        username: null,
        password: null,
      },
    };
  },
};
</script>

<style>
@import url(./css/main.css);
@import "@vuepic/vue-datepicker/dist/main.css";
</style>
