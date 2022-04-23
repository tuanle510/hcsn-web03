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
      <div class="alert-button">
        <MISAButton type="outline-button">Hủy bỏ</MISAButton>
        <MISAButton type="sub-button">Không lưu</MISAButton>
        <MISAButton @click="removeAsset">Xóa</MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'the-alert',
  props: ['alert', 'type'],
  inject: ['removeAsset'],
};
</script>
<style></style>
