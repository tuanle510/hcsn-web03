<template>
  <div>
    <div class="m-layout">
      <Navbar />
      <div class="m-main">
        <Header />
        <Content @showDialog="btnAddDialog"></Content>
      </div>
    </div>
    <Dialog :isShow="isShowDialog" @closeDialog="btnDialog"></Dialog>
  </div>
</template>

<script>
import Header from "./components/layout/TheHeader.vue";
import Navbar from "./components/layout/TheNavBar.vue";
import Content from "./components/layout/TheContent.vue";
import Dialog from "./components/base/MISADialog.vue";

export default {
  name: "App",
  components: {
    Header,
    Content,
    Navbar,
    Dialog,
  },

  methods: {
    btnAddDialog() {
      this.btnDialog(true);
    },

    btnDialog(isShow) {
      this.isShowDialog = isShow;
    },
  },

  data() {
    return {
      isShowDialog: false,
    };
  },
};
</script>

<style>
@import url(./css/main.css);
</style>
