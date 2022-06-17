<template>
  <div class="m-alert">
    <div class="m-alert-container">
      <div class="alert-content">
        <div class="content-left">
          <div class="alert"></div>
        </div>
        <div class="content-right">
          {{ alert }}
        </div>
      </div>

      <!-- Thông báo khi hủy và có sự thay đổi  -->
      <div class="alert-button">
        <MISAButton
          v-if="alertType == '2btn' || alertType == '3btn'"
          type="outline-button"
          @click="this.$emit('rightBtnClick')"
          :buttonTitle="leftBtnTitle"
        ></MISAButton>
        <MISAButton
          v-if="alertType == '3btn'"
          type="sub-button"
          @click="this.$emit('centerBtnClick')"
          :buttonTitle="centerBtnTitle"
        ></MISAButton>
        <MISAButton
          ref="focusBtn"
          @click="this.$emit('rightBtnClick')"
          :buttonTitle="rightBtnTitle"
        ></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "the-alert",
  props: [
    "rightBtnTitle",
    "leftBtnTitle",
    "centerBtnTitle",
    "alertType",
    "alert",
  ],
  mounted() {
    // focus
    this.$refs.focusBtn.setFocus();
  },
};
</script>
<style></style>
