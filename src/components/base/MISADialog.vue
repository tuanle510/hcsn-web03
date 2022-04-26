<template>
  <div class="m-dialog">
    <div class="m-modal">
      <div class="m-nodal-title">{{ dialogTitle }}</div>
      <div class="m-modal-close" @click="onCancelAsset">
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
        <MISAButton
          type="outline-button"
          @click="onCancelAsset"
          buttonTitle="Hủy"
        ></MISAButton>
        <MISAButton
          @click="!isEditing ? onAddAsset() : onUpdateAsset()"
          buttonTitle="Lưu"
        ></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "the-dialog",
  props: ["assetSelected", "dialogTitle", "isEditing"],

  // watch: {
  //   /**
  //    *Theo dõi sự thay đổi dữ liệu ở biến assetSelected và
  //    *Truyền dữ liệu vào dialog khi double Click
  //    *CREATED BY: LTTUAN(18.04.2022)
  //    */
  //   assetSelected: function (newValue) {
  //     this.asset = newValue;
  //   },
  // },

  mounted() {
    this.asset = this.assetSelected;
    //Focus vào ô input đầu
    this.$refs.firstInput.focus();

    // Tạo ra obj đầu vào để so sánh
    this.assetCopy = Object.assign({}, this.asset);
  },

  beforeUnmount() {
    this.asset = {};
  },

  methods: {
    /**
     *focus vào ô input đầu tiên khi hiển thị fỏrm
     *CREATED BY: LTTUAN(19.04.2022)
     */
    // focusFirstInput() {
    //   this.$nextTick(() => {
    //     this.$refs.firstInput.focus();
    //   });
    // },

    /**
     * Mô tả : Thêm asset mới
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 14:01 26/04/2022
     */
    async createNewAsset() {
      var me = this;
      await axios
        .post("https://62616774327d3896e27b58d2.mockapi.io/api/asset", me.asset)
        .then(() => {
          me.$emit("toastShow", true, "Thêm mới dữ liệu thành công");
          setTimeout(() => {
            me.$emit("toastShow", false);
          }, 2300);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Mô tả : Sửa tài sản
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 08:36 25/04/2022
     */
    async updateAsset() {
      var me = this;
      await axios
        .put(
          `https://62616774327d3896e27b58d2.mockapi.io/api/asset/${me.asset.id}`,
          me.asset
        )
        .then(() => {
          me.$emit("toastShow", true, "Sửa dữ liệu thành công");

          setTimeout(() => {
            me.$emit("toastShow", false);
          }, 2300);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Mô tả :Ấn Nút thêm mới sản phẩm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:03 25/04/2022
     */
    onAddAsset() {
      console.log("thêm");
      // thêm mới asset
      this.createNewAsset();
      //set lại giá trị trong dialog về trống
      this.asset = {};
      this.$emit("btnDialog", false);
    },

    /**
     * Mô tả : Ấn lưu khi sửa sản phẩm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:04 26/04/2022
     */
    onUpdateAsset() {
      console.log("sửa");
      // Sửa tài sản
      this.updateAsset();
    },

    /**
     * Mô tả : Ấn nút hủy, hiển thị thông báo
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 17:21 26/04/2022
     */
    onCancelAsset() {
      console.log(this.assetCopy);
      console.log(this.asset);
      console.log(
        JSON.stringify(this.assetCopy) === JSON.stringify(this.asset)
      );
      if (JSON.stringify(this.assetCopy) === JSON.stringify(this.asset)) {
        this.$emit("btnAlert", true, "Bạn có muốn hủy bỏ khai báo này?");
      } else {
        this.$emit(
          "btnAlert",
          true,
          "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu nhũng thay đổi này?"
        );
      }
    },
  },

  data() {
    return {
      assetCopy: {},
      asset: {},
      newYear: new Date().getFullYear(),
      date: null,
    };
  },
};
</script>
<style></style>
