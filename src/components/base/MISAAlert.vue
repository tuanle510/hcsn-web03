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
      <div class="alert-button">
        <MISAButton type="outline-button" buttonTitle="Hủy bỏ"></MISAButton>
        <MISAButton type="sub-button" buttonTitle="Không"></MISAButton>
        <MISAButton @click="removeAsset" buttonTitle="Xóa"></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'the-alert',
  props: ['alertTitle'],
  inject: ['removeAsset'],
};
</script>
<style></style>
