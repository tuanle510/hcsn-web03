<template>
  <div class="m-dialog">
    <div class="m-modal">
      <div class="m-nodal-title">{{ dialogTitle }}</div>
      <div class="m-modal-close" @click="onCancel">
        <div class="close"></div>
      </div>

      <form class="m-modal-centent" ref="form" autocomplete="off">
        <div class="modal-row">
          <div class="modal-field">
            <label for="assetCode">Mã tài sản <span>*</span></label>
            <MISAInput
              :required="true"
              ref="assetCode"
              type="text"
              maxlength="20"
              placeholder="Nhập mã tài sản"
              v-model="asset.FixedAssetCode"
              name="Mã tài sản"
            ></MISAInput>
          </div>
          <div class="modal-field modal-field-long">
            <label for="input">Tên tài sản <span>*</span></label>
            <MISAInput
              :required="true"
              :name="'Tên tài sản'"
              placeholder="Nhập tên tài sản"
              v-model="asset.FixedAssetName"
            >
            </MISAInput>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label for="input">Mã bộ phận sử dụng <span>*</span></label>

            <MISACombobox
              :required="true"
              :optionList="departmentData"
              name="Mã bộ phận sử dụng"
              filterby="DepartmentCode"
              placeholder="Chọm mã bộ phận sử dụng"
              v-model="asset.DepartmentCode"
            ></MISACombobox>
          </div>
          <div class="modal-field modal-field-long">
            <label for="input">Tên bộ phận sử dụng</label>
            <MISAInput disabled v-model="asset.DepartmentName"> </MISAInput>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label for="input">Mã loại tài sản <span>*</span></label>

            <MISACombobox
              required="true"
              :optionList="categoryData"
              name="Mã loại tài sản"
              filterby="FixedAssetCategoryCode"
              placeholder="Chọm mã loại tài sản"
              v-model="asset.FixedAssetCategoryCode"
            ></MISACombobox>
          </div>
          <div class="modal-field modal-field-long">
            <label for="input">Tên loại tài sản</label>
            <MISAInput
              disabled
              v-model="asset.FixedAssetCategoryName"
            ></MISAInput>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label for="input">Số lượng<span>*</span></label>
            <MISAInput
              ref="quantity"
              required="true"
              type="number"
              name="Số lượng"
              min="0"
              classParent="number-input-icon"
              v-model="asset.Quantity"
            ></MISAInput>
            <!-- @keydown.down="
                asset.quantity == 0 ? (asset.quantity = 0) : asset.quantity--
              "
              @keydown.up="asset.quantity++" -->
            <div class="spin-button-container">
              <div class="up" @click="asset.Quantity++"></div>
              <div
                class="down"
                @click="
                  asset.quantity == 0 ? (asset.Quantity = 0) : asset.Quantity--
                "
              ></div>
            </div>
          </div>
          <!-- type="number" -->
          <div class="modal-field">
            <label for="input">Nguyên giá <span>*</span></label>
            <MISAInput
              :required="true"
              :isNumber="true"
              name="Nguyên giá"
              classParent="number-input"
              v-model="changeFormatPrice"
            ></MISAInput>
          </div>
          <div class="modal-field">
            <label for="input">Số năm sử dụng <span>*</span></label>
            <MISAInput
              :required="true"
              :isNumber="true"
              name="Số năm sử dụng"
              classParent="number-input"
              v-model="asset.LifeTime"
            ></MISAInput>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label for="input">Tỉ lệ hao mòn(%)<span>*</span></label>
            <MISAInput
              :isNumber="true"
              required="true"
              type="text"
              name="Tỉ lệ hao mòn"
              classParent="number-input-icon"
              v-model="asset.DepreciationRate"
              @keydown.down="
                asset.DepreciationRate == 0
                  ? (asset.DepreciationRate = 0)
                  : asset.DepreciationRate--
              "
              @keydown.up="asset.DepreciationRate++"
            ></MISAInput>

            <div class="spin-button-container">
              <div class="up" @click="asset.DepreciationRate++"></div>
              <div
                class="down"
                @click="
                  asset.DepreciationRate == 0
                    ? (asset.DepreciationRate = 0)
                    : asset.DepreciationRate--
                "
              ></div>
            </div>
          </div>

          <div class="modal-field">
            <label for="input">Giá trị hao mòm năm <span>*</span></label>
            <MISAInput
              :required="true"
              :isNumber="true"
              name="Giá trị hao mòm năm"
              classParent="number-input"
              v-model="annualDepreciationRate"
            ></MISAInput>
          </div>
          <div class="modal-field">
            <label for="input">Năm theo dõi</label>
            <MISAInput
              classParent="number-input"
              disabled
              v-model="asset.TrackedYear"
            ></MISAInput>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label for="input">Ngày mua <span>*</span></label>
            <div class="datepicker-container">
              <Datepicker
                class="mt-input input-datepicker"
                v-model="asset.PurchaseDate"
                format="dd/MM/yyyy"
                :maxDate="new Date()"
              ></Datepicker>
              <div class="datepicker-icon"></div>
            </div>
          </div>
          <div class="modal-field">
            <label for="input">Ngày bắt đầy sử dụng <span>*</span></label>
            <div class="datepicker-container">
              <Datepicker
                class="mt-input input-datepicker"
                format="dd/MM/yyyy"
                :maxDate="new Date()"
              ></Datepicker>
              <div class="datepicker-icon"></div>
            </div>
          </div>
        </div>
      </form>

      <div class="m-modal-footer">
        <MISAButton
          style="border: none"
          type="outline-button"
          @click="onCancel"
          buttonTitle="Hủy"
        ></MISAButton>
        <MISAButton @click="onSubmit($event)" buttonTitle="Lưu"></MISAButton>
        <div tabindex="-1"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import moment from "moment";
import {
  cancel_msg,
  error_msg,
  toast_msg,
} from "../../assets/resource/ResourceMsg";

export default {
  name: "the-dialog",
  props: [
    "assetSelected",
    "dialogTitle",
    "isEditing",
    "departmentData",
    "categoryData",
    "assetCodes",
  ],

  beforeMount() {
    // mounted mới gắn dữ liệu
    this.asset = this.assetSelected;

    this.asset.TrackedYear = new Date().getFullYear();
  },

  mounted() {
    // Focus vào ô input đầu
    this.$refs.assetCode.setFocus();

    // Tạo ra obj đầu vào để so sánh
    this.assetCopy = Object.assign({}, this.asset);
  },

  computed: {
    annualDepreciationRate: function () {
      return this.formatSalary(
        Math.floor(
          this.asset.Cost * (this.asset.DepreciationRate / 100)
        ).toString()
      );
    },
    /**
     * Mô tả : format tiền
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:26 01/05/2022
     */
    changeFormatPrice: {
      get() {
        return this.formatSalary(this.asset.Cost.toString());
      },
      set(newValue) {
        newValue = newValue.replaceAll(".", "");
        this.asset.Cost = Number(newValue);
      },
    },
  },

  /**
   * Mô tả : hiển thị dữ liệu từ code của combobox lên cột còn lại
   * @param
   * @return
   * Created by: Lê Thiện Tuấn - MF1118
   * Created date: 00:43 03/05/2022
   */
  watch: {
    "asset.FixedAssetCategoryCode"(newValue) {
      let data = this.categoryData.find(
        (item) => item.FixedAssetCategoryCode == newValue
      );
      if (data) {
        this.asset.FixedAssetCategoryName = data.FixedAssetCategoryName;
        this.asset.DepreciationRate = data.DepreciationRate;
        this.asset.LifeTime = data.LifeTime;
      } else {
        this.asset.FixedAssetCategoryName = "";
        this.asset.DepreciationRate = "";
        this.asset.LifeTime = "";
      }
    },

    "asset.DepartmentCode"(newValue) {
      let data = this.departmentData.find(
        (item) => item.DepartmentCode == newValue
      );
      if (data) {
        this.asset.DepartmentName = data.DepartmentName;
      } else {
        this.asset.DepartmentName = "";
      }
    },
  },

  methods: {
    /**
     * Mô tả : format tiền
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:35 03/05/2022
     */
    formatSalary(value) {
      var format = `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      return format;
      // var formatter = new Intl.NumberFormat('vi-VN', {
      //   currency: 'VND',
      // });
      // return formatter.format(value);
    },

    /**
     * Mô tả : Thêm asset mới
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 20:31 26/04/2022
     */
    async onCreateAsset() {
      try {
        const res = await axios.post(
          "http://localhost:5234/api/v1/FixedAssets",
          this.asset
        );
        this.$emit("alertShow", false);
        this.$emit("dialogShow", false);
        if (res.statusText == "Created") {
          this.$emit("toastShow", true, toast_msg.CREATE_SUCCESS);
          setTimeout(() => {
            this.$emit("toastShow", false);
          }, 2300);
        }
      } catch (error) {
        console.log(error.response.data.data.data[0]);
      }
      // Cập nhật lại bảng
      this.$emit("getAssetData");
    },

    /**
     * Mô tả : Sửa asset
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 20:46 26/04/2022
     */
    async onUpdateAsset() {
      console.log(this.asset);
      try {
        const res = await axios.put(
          `http://localhost:5234/api/v1/FixedAssets/${this.asset.fixed_asset_id}`,
          this.asset
        );
        this.$emit("alertShow", false);
        this.$emit("dialogShow", false);
        console.log(res);
        if (res.statusText == "OK") {
          this.$emit("toastShow", true, toast_msg.SAVE_SUCESS);
          setTimeout(() => {
            this.$emit("toastShow", false);
          }, 2300);
        }
        this.$emit("getAssetData");
      } catch (error) {
        // console.log(error);
        this.$emit("alertShow", true, error.response.data.data.data[0]);
      }
      // Cập nhật lại bảng
    },

    /**
     * Mô tả : Ấn nút hủy, hiển thị thông báo
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 17:21 26/04/2022
     */
    onCancel() {
      if (JSON.stringify(this.assetCopy) === JSON.stringify(this.asset)) {
        this.$emit("alertShow", true, cancel_msg.CANCEL, "cancel");
      } else {
        this.$emit("alertShow", true, cancel_msg.CANCEL_CHANGE, "cancelChange");
      }
    },

    /**
     * Mô tả : Validate()
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:40 28/04/2022
     */
    onSubmit() {
      console.log(this.asset);
      // console.log(this.asset.PurchaseDate);
      /**
       * Mô tả : Kiểm tra requỉed
       * @param
       * @return
       * Created by: Lê Thiện Tuấn - MF1118
       * Created date: 22:53 07/05/2022
       */
      // Gắn lại giá trị cho erorr list về rỗng
      this.errorList = [];
      var form = this.$refs.form;
      // Vòng lặp trong form để lấy các input
      Array.from(form.elements).forEach((element) => {
        // Kiểm tra giá trị của input
        // console.log(element);
        if (element.required && element.value == "") {
          element.classList.add("m-input-error");
          this.errorList.push(`${error_msg.EMPTY_VALUE}${element.name}`);
        }
      });
      // Nếu không có lỗi gì thì thực hiện thêm hoặc sửa
      if (this.errorList.length != 0) {
        this.$emit("alertShow", true, this.errorList[0]);
      } else {
        console.log(this.asset.PurchaseDate);
        this.isEditing ? this.onUpdateAsset() : this.onCreateAsset();
      }
    },
  },

  data() {
    return {
      assetCopy: {},
      asset: {},
      priceFormat: "",
      errorList: [],
    };
  },
};
</script>
<style></style>
