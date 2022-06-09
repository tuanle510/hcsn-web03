<template>
  <div class="m-dialog lisence-dialog">
    <div class="m-modal lisence-modal">
      <div class="m-modal-title lisence-title">Sửa tài sản</div>
      <div class="m-modal-close">
        <div class="close"></div>
      </div>
      <div class="m-modal-centent">
        <form autocomplete="off" ref="form">
          <div class="modal-row">
            <div class="modal-field edit-field">
              <label>Bộ phận sử dụng</label>
              <MISAInput disabled></MISAInput>
            </div>
          </div>
          <div style="font-size: 16px"><strong>Nguyên giá</strong></div>
        </form>
      </div>
      <div class="m-modal-footer">
        <MISAButton type="outline-button" buttonTitle="Hủy"></MISAButton>
        <MISAButton buttonTitle="Lưu"></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
