<template>
  <div class="m-dialog license-dialog">
    <div class="m-modal license-modal">
      <div class="m-modal-title license-title">Sửa tài sản</div>
      <div class="m-modal-close">
        <div class="close"></div>
      </div>
      <div class="m-modal-centent">
        <div class="modal-row">
          <div class="modal-field modal-field-long">
            <label>Bộ phận sử dụng</label>
            <MISAInput disabled></MISAInput>
          </div>
        </div>
        <div style="font-size: 16px; margin-bottom: 16px">
          <strong>Nguyên giá</strong>
        </div>
        <form autocomplete="off" ref="form">
          <div class="modal-row modal-field-long">
            <div class="modal-field modal-field-long">
              <label>Bộ phận sử dụng</label>
              <MISACombobox></MISACombobox>
            </div>
            <div class="modal-field">
              <label>Giá trị</label>
              <MISAInput></MISAInput>
            </div>
          </div>
        </form>
      </div>
      <div class="m-modal-footer">
        <MISAButton
          type="outline-button"
          buttonTitle="Hủy"
          @click="onCancel"
        ></MISAButton>
        <MISAButton buttonTitle="Lưu"></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * Mô tả : Ấn hủy
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:00 10/06/2022
     */
    onCancel() {
      this.$emit("editAssetDialogShow", false);
    },
  },
};
</script>
<style></style>
