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
      <!-- Thông báo khi xóa -->
      <div v-if="alertType == 'remove'" class="alert-button">
        <MISAButton
          @click="this.$emit('alertShow', false)"
          type="outline-button"
          buttonTitle="Không"
        ></MISAButton>
        <MISAButton
          ref="focusBtn"
          @click="btnDelete"
          buttonTitle="Xóa"
        ></MISAButton>
      </div>

      <!-- Thông báo khi hủy và không có sự thay đổi -->
      <div v-else-if="alertType == 'cancel'" class="alert-button">
        <MISAButton
          @click="this.$emit('alertShow', false)"
          type="outline-button"
          buttonTitle="Không"
        ></MISAButton>
        <MISAButton
          ref="focusBtn"
          @click="btnCancel"
          buttonTitle="Hủy bỏ"
        ></MISAButton>
      </div>

      <!-- Thông báo khi hủy và có sự thay đổi  -->
      <div v-else-if="alertType == 'cancelChange'" class="alert-button">
        <MISAButton
          @click="btnCancel"
          type="outline-button"
          buttonTitle="Hủy bỏ"
        ></MISAButton>
        <MISAButton
          @click="this.$emit('alertShow', false)"
          type="sub-button"
          buttonTitle="Không lưu"
        ></MISAButton>
        <MISAButton
          ref="focusBtn"
          @click="this.$emit('onSubmit')"
          buttonTitle="Lưu"
        ></MISAButton>
      </div>

      <!-- Thông báo lỗi, chỉ có thể đóng -->
      <div v-else class="alert-button">
        <MISAButton
          ref="focusBtn"
          @click="closeBtn"
          buttonTitle="Đóng"
        ></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "the-alert",
  props: ["alertTitle", "alertType", "isEditing", "isCloseOnly"],
  mounted() {
    // focus
    this.$refs.focusBtn.setFocus();
  },

  methods: {
    /**
     * Mô tả : Đóng cả cảnh báo và dialog
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 13:59 26/04/2022
     */
    btnCancel() {
      this.$emit("alertShow", false);
      this.$emit("dialogShow", false);
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
    },

    /**
     * Mô tả : Xử lí sự kiện nút Đóng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:38 30/05/2022
     */
    closeBtn() {
      this.$emit("alertShow", false);
      if (this.isCloseOnly == false) {
        this.$emit("setFocusEmpty");
      }
      this.$emit("setCloseOnly", false);
    },
  },
};
</script>
<style></style>
