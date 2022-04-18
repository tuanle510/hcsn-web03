<template>
  <div class="m-dialog" :class="{ 'm-dialog-showed': isShow }">
    <div class="m-modal">
      <div class="m-nodal-title">Sửa tài sản</div>
      <div class="m-modal-close" @click="btnCloseDialog">
        <div class="close"></div>
      </div>
      <div class="m-modal-centent">
        <div class="modal-field">
          <label for="input">Mã tài sản</label>
          <Input placeholder="Nhập mã tài sản"></Input>
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên tài sản</label>
          <Input placeholder="Nhập tên tài sản"></Input>
        </div>
        <div class="modal-field">
          <label for="input">Mã bộ phận sử dụng</label>
          <Input></Input>
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên bộ phận sử dụng</label>
          <Input></Input>
        </div>
        <div class="modal-field">
          <label for="input">Mã loại tài sản</label>
          <Input></Input>
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên loại tài sản</label>
          <Input></Input>
        </div>
        <div class="modal-field">
          <label for="input">Số lượng</label>
          <Input></Input>
        </div>
        <div class="modal-field">
          <label for="input">Nguyên giá</label>
          <Input type="number"></Input>
        </div>
        <div class="modal-field">
          <label for="input">Số năm sử dụng</label>
          <Input></Input>
        </div>
        <div class="modal-field">
          <label for="input">Tỉ lệ hao mòn(%)</label>
          <Input></Input>
        </div>
        <div class="modal-field">
          <label for="input">Giá trị hao mòm năm</label>
          <Input></Input>
        </div>
        <div class="modal-field">
          <label for="input">Năm theo dõi</label>
          <Input></Input>
        </div>
        <div class="modal-field">
          <label for="input">Ngày mua</label>
          <Input></Input>
        </div>
        <div class="modal-field">
          <label for="input">Ngày bắt đầy sử dụng</label>
          <Input></Input>
        </div>
      </div>
      <div class="m-modal-footer">
        <Button type="outline-button" @click="btnCloseDialog">Hủy</Button>
        <Button>Lưu</Button>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "./MISAInput.vue";
import Button from "./MISAButton.vue";

export default {
  name: "the-dialog",
  components: {
    Input,
    Button,
  },
  props: ["isShow"],

  methods: {
    btnCloseDialog() {
      this.$emit("closeDialog", false);
    },
  },
};
</script>
<style>
@import url("../../css/base/dialog.css");
</style>
