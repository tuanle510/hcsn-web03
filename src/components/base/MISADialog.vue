<template>
  <div class="m-dialog" @keydown.esc="btnCloseDialog()">
    <div class="m-modal">
      <div class="m-nodal-title">{{ dialogTitle }}</div>
      <div class="m-modal-close" @click="btnCloseDialog">
        <div class="close"></div>
      </div>

      <div class="m-modal-centent">
        <div class="modal-field">
          <label for="input">Mã tài sản <span>*</span></label>
          <input
            class="m-input"
            ref="firstInput"
            type="text"
            maxlength="20"
            placeholder="Nhập mã tài sản"
            v-model="asset.code"
          />
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên tài sản <span>*</span></label>
          <input
            class="m-input"
            placeholder="Nhập tên tài sản"
            v-model="asset.name"
          />
        </div>
        <div class="modal-field">
          <label for="input">Mã bộ phận sử dụng <span>*</span></label>
          <MISACombobox
            :inputValue="asset.id"
            :hasIcon="false"
            placeholder="Chọm mã bộ phận sử dụng"
          ></MISACombobox>
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên bộ phận sử dụng</label>
          <input class="m-input" disabled />
        </div>
        <div class="modal-field">
          <label for="input">Mã loại tài sản</label>
          <MISACombobox
            :hasIcon="false"
            placeholder="Chọm mã loại tài sản"
          ></MISACombobox>
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên loại tài sản</label>
          <input class="m-input" disabled />
        </div>
        <div class="modal-field">
          <label for="input">Số lượng<span>*</span></label>
          <input class="m-input" v-model="asset.quantity" />
        </div>
        <div class="modal-field">
          <label for="input">Nguyên giá <span>*</span></label>
          <input
            class="m-input number-input"
            type="number"
            v-model="asset.price"
          />
        </div>
        <div class="modal-field">
          <label for="input">Số năm sử dụng <span>*</span></label>
          <input class="m-input number-input" v-model="asset.year" />
        </div>
        <div class="modal-field">
          <label for="input">Tỉ lệ hao mòn(%)<span>*</span></label>
          <input class="m-input" />
        </div>
        <div class="modal-field">
          <label for="input">Giá trị hao mòm năm <span>*</span></label>
          <input class="m-input number-input" />
        </div>
        <div class="modal-field">
          <label for="input">Năm theo dõi</label>
          <input class="m-input number-input" disabled :value="newYear" />
        </div>
        <div class="modal-field">
          <label for="input">Ngày mua <span>*</span></label>
          <input class="m-input" type="date" placeholder="DD-MM-YYYY" />
        </div>
        <div class="modal-field">
          <label for="input">Ngày bắt đầy sử dụng <span>*</span></label>
          <input class="m-input" type="date" placeholder="DD-MM-YYYY" />
        </div>
        <div class="modal-field">
          <label for="input">Ngày bắt đầy sử dụng <span>*</span></label>
          <Datepicker v-model="date"></Datepicker>
        </div>
      </div>

      <div class="m-modal-footer">
        <MISAButton type="outline-button" @click="btnCloseDialog"
          >Hủy</MISAButton
        >
        <MISAButton @click="btnSaveOnClick">Lưu</MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "the-dialog",
  props: ["isShow", "assetSelected", "dialogTitle"],

  watch: {
    /**
     *Theo dõi sự thay đổi dữ liệu ở biến assetSelected và
     *Truyền dữ liệu vào dialog khi double Click
     *CREATED BY: LTTUAN(18.04.2022)
     */
    assetSelected: function (newValue) {
      this.asset = newValue;
    },
  },

  methods: {
    /**
     *focus vào ô input đầu tiên khi hiển thị fỏrm
     *CREATED BY: LTTUAN(19.04.2022)
     */
    focusFirstInput() {
      this.$nextTick(() => {
        // this.$refs.firstInput.setFocus();
        this.$refs.firstInput.focus();
      });
    },

    /**
     * Đóng dialog
     * CREATED BY: LTTUAN(18.04.2022)
     */
    btnCloseDialog() {
      
      this.$emit("closeDialog", false);
      //xóa dữ liệu trong input khi đóng
      this.asset = {};
    },

    //Thêm asset mới
    async createNewAsset() {
      var me = this;
      await axios
        .post(
          "https://62616774327d3896e27b58d2.mockapi.io/api/asset",
          this.asset
        )
        .then(() => {
          me.$emit("showSaveToast", true);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    btnSaveOnClick() {
      console.log("click");
      this.createNewAsset();

      // set Toast tắt đi
      this.$emit("showSaveToast", false);
      //set lại giá trị trong dialog về trống
      this.asset = {};
    },
  },

  data() {
    return {
      asset: {},
      newYear: new Date().getFullYear(),
      date: null,
    };
  },
};
</script>
<style></style>
