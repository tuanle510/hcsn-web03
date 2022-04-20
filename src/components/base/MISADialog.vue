<template>
  <div class="m-dialog">
    <div class="m-modal">
      <div class="m-nodal-title">Sửa tài sản</div>
      <div class="m-modal-close" @click="btnCloseDialog">
        <div class="close"></div>
      </div>
      <div class="m-modal-centent">
        <div class="modal-field">
          <label for="input">Mã tài sản</label>
          <input
            ref="firstInput"
            class="m-input"
            type="text"
            placeholder="Nhập mã tài sản"
            :value="product.id"
          />
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên tài sản</label>
          <input
            v-model="product.name"
            class="m-input"
            placeholder="Nhập tên tài sản"
          />
        </div>
        <div class="modal-field">
          <label for="input">Mã tài sản</label>
          <MISACombobox
            :hasIcon="false"
            title="Chọm mã bộ phận sử dụng"
          ></MISACombobox>
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên bộ phận sử dụng</label>

          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Mã loại tài sản</label>
          <MISACombobox
            :hasIcon="false"
            title="Chọm mã loại tài sản"
          ></MISACombobox>
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
        <MISAButton type="outline-button" @click="btnCloseDialog"
          >Hủy</MISAButton
        >
        <MISAButton>Lưu</MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'the-dialog',
  props: ['isShow', 'productSelected'],

  watch: {
    /**
     *Theo dõi sự thay đổi dữ liệu ở biến productSelected và
     *Truyền dữ liệu vào dialog khi double Click
     *CREATED BY: LTTUAN(18.04.2022)
     */
    productSelected: function (newValue) {
      this.product = newValue;
    },

    /**
     *  validate: kiểm tra khi có sự thay đổi mà người dùng ấn tắt => hiện cảnh báo
     * CREATED BY: LTTUAN(19.04.2022)
     */
    // product: function (newValue, oldValue) {
    //   if (oldValue != newValue) {
    //     console.log("true");
    //   }
    //   console.log(newValue);
    //   console.log(oldValue);
    // },
  },

  methods: {
    /**
     *focus vào ô input đầu tiên khi hiển thị fỏrm
     *CREATED BY: LTTUAN(19.04.2022)
     */
    focusFirstInput() {
      this.$nextTick(() => {
        this.$refs.firstInput.focus();
      });
    },

    /**
     * Đóng dialog
     * CREATED BY: LTTUAN(18.04.2022)
     */
    btnCloseDialog() {
      // Kiếm tra xem là thêm mới sản phẩm hay sửa sản phẩm
      // nếu là sửa sản phẩm
      if (this.$refs.firstInput.value !== '') {
        this.checkForm(this.product.id);
      }
      // nếu là thêm mới sản phẩm
      else {
        this.checkForm('');
        this.closeDialog();
      }
    },

    /**
     *kiểm tra có thay đổi trong form không
     */
    checkForm(inputValue) {
      if (this.$refs.firstInput.value == inputValue) {
        this.closeDialog();
      }
      // Nếu có thì hiện thông báo
      else {
        alert('bạn đa thay đổi form ');
      }
    },

    /**
     * Đóng dialog
     */
    closeDialog() {
      this.$emit('closeDialog', false);
      //xóa dữ liệu trong input khi đóng
      this.product = {};
    },
  },

  data() {
    return {
      isFormInputChange: false,
      product: {},
      productChanged: {},
    };
  },
};
</script>
<style></style>
