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
          <input
            class="m-input"
            type="text"
            placeholder="Nhập mã tài sản"
            v-model="product.productCode"
          />
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên tài sản</label>
          <input class="m-input" placeholder="Nhập tên tài sản" />
        </div>
        <div class="modal-field">
          <label for="input">Mã bộ phận sử dụng</label>

          <input class="m-input" />
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên bộ phận sử dụng</label>

          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Mã loại tài sản</label>

          <input class="m-input" />
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên loại tài sản</label>
          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Số lượng</label>
          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Nguyên giá</label>
          <input class="m-input number-input" type="number" />
        </div>
        <div class="modal-field">
          <label for="input">Số năm sử dụng</label>
          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Tỉ lệ hao mòn(%)</label>
          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Giá trị hao mòm năm</label>
          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Năm theo dõi</label>
          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Ngày mua</label>
          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Ngày bắt đầy sử dụng</label>
          <input class="m-input" />
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
import Button from './MISAButton.vue';

export default {
  updated() {
    //this.loadMessages(this.room_id)
    console.log(this.product.productCode); //undefined;
  },
  name: 'the-dialog',
  components: {
    Button,
  },
  props: ['isShow', 'productSelected'],

  data() {
    return {
      product: {},
    };
  },

  methods: {
    /**
     * Đóng dialog
     * CREATED BY: LTTUAN(18.04.2022)
     */
    btnCloseDialog() {
      this.$emit('closeDialog', false);
    },
  },

  /**
   *Theo dõi sự thay đổi dữ liệu ở biến productSelected và
   *Truyền dữ liệu vào dialog khi double Click
   *CREATED BY: LTTUAN(18.04.2022)
   */
  watch: {
    productSelected: function (newValue) {
      console.log(newValue);
      this.product = newValue;
    },
  },
};
</script>
<style>
@import url('../../css/base/dialog.css');
</style>
