<template>
  <div class="m-dialog">
    <div class="m-modal">
      <div class="m-nodal-title">Sửa tài sản</div>
      <div class="m-modal-close" @click="btnCloseDialog">
        <div class="close"></div>
      </div>
      <div class="m-modal-centent">
        <div class="modal-field">
          <label for="input">Mã tài sản <span>*</span></label>
          <MISAInput
            ref="firstInput"
            type="text"
            placeholder="Nhập mã tài sản"
            v-model="product.id"
          />
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên tài sản <span>*</span></label>
          <MISAInput v-model="product.name" placeholder="Nhập tên tài sản" />
        </div>
        <div class="modal-field">
          <label for="input">Mã bộ phận sử dụng <span>*</span></label>
          <MISACombobox
            :inputValue="product.id"
            :hasIcon="false"
            title="Chọm mã bộ phận sử dụng"
          ></MISACombobox>
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên bộ phận sử dụng</label>
          <MISAInput disabled />
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
          <MISAInput disabled />
        </div>
        <div class="modal-field">
          <label for="input">Số lượng<span>*</span></label>
          <MISAInput />
        </div>
        <div class="modal-field">
          <label for="input">Nguyên giá <span>*</span></label>
          <MISAInput class="m-input number-input" type="number" value="0" />
        </div>
        <div class="modal-field">
          <label for="input">Số năm sử dụng <span>*</span></label>
          <MISAInput class="m-input number-input" />
        </div>
        <div class="modal-field">
          <label for="input">Tỉ lệ hao mòn(%)<span>*</span></label>
          <MISAInput />
        </div>
        <div class="modal-field">
          <label for="input">Giá trị hao mòm năm <span>*</span></label>
          <MISAInput class="m-input number-input" />
        </div>
        <div class="modal-field">
          <label for="input">Năm theo dõi</label>
          <MISAInput class="m-input number-input" disabled :value="newYear" />
        </div>
        <div class="modal-field">
          <label for="input">Ngày mua <span>*</span></label>
          <MISAInput type="date" placeholder="DD-MM-YYYY" />
        </div>
        <div class="modal-field">
          <label for="input">Ngày bắt đầy sử dụng <span>*</span></label>
          <MISAInput type="date" placeholder="DD-MM-YYYY" />
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
  name: "the-dialog",
  props: ["isShow", "productSelected"],

  watch: {
    /**
     *Theo dõi sự thay đổi dữ liệu ở biến productSelected và
     *Truyền dữ liệu vào dialog khi double Click
     *CREATED BY: LTTUAN(18.04.2022)
     */
    productSelected: function (newValue) {
      this.product = newValue;
    },
  },

  methods: {
    /**
     *focus vào ô input đầu tiên khi hiển thị fỏrm
     *CREATED BY: LTTUAN(19.04.2022)
     */
    focusFirstInput() {
      this.$nextTick(() => {
        this.$refs.firstInput.setFocus();
      });
    },

    /**
     * Đóng dialog
     * CREATED BY: LTTUAN(18.04.2022)
     */
    btnCloseDialog() {
      this.$emit("closeDialog", false);
      //xóa dữ liệu trong input khi đóng
      this.product = {};
    },
  },

  data() {
    return {
      isFormInputChange: false,
      product: {},
      productChanged: {},
      newYear: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
