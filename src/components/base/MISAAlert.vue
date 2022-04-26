<template>
  <div class="m-alert">
    <div class="m-alert-container">
      <div class="alert-content">
        <div class="content-left">
          <div class="alert"></div>
        </div>
        <div class="content-right">
          {{ alertTitle }}
        </div>
      </div>

      <div v-if="isDelete" class="alert-button btn-remove">
        <MISAButton
          @click="this.$emit('btnAlert', false)"
          type="outline-button"
          buttonTitle="Không"
        ></MISAButton>
        <MISAButton @click="btnDelete" buttonTitle="Xóa"></MISAButton>
      </div>

      <div v-else class="alert-button btn-cancel">
        <!-- <MISAButton type="outline-button" buttonTitle="Hủy bỏ"></MISAButton> -->
        <MISAButton
          @click="this.$emit('btnAlert', false)"
          type="sub-button"
          buttonTitle="Không"
        ></MISAButton>
        <MISAButton @click="btnCancel" buttonTitle="Hủy bỏ"></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "the-alert",
  props: ["alertTitle", "isDelete"],
  methods: {
    /**
     * Mô tả : Đóng cả cảnh báo, dialog khi user chọn hủy
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 13:59 26/04/2022
     */
    btnCancel() {
      this.$emit("btnAlert", false);
      this.$emit("btnDialog", false);
    },

    /**
     * Mô tả : Xóa tài sản đã chọn, tắt alert
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 14:00 26/04/2022
     */
    btnDelete() {
      // xóa asset
      this.$emit("removeAsset");
      // tắt alert
      this.$emit("btnAlert", false);
    },
  },
};
</script>
<style></style>
