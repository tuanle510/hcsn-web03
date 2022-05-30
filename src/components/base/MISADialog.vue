<template>
  <div class="m-dialog" v-shortkey="['ctrl', 's']" @shortkey="onSubmit()">
    <div class="m-modal">
      <div class="m-nodal-title">{{ dialogTitle }}</div>
      <div class="m-modal-close" @click="onCancel">
        <div class="close"></div>
      </div>

      <form class="m-modal-centent" ref="form" autocomplete="off">
        <div class="modal-row">
          <div class="modal-field">
            <label>Mã tài sản <span>*</span></label>
            <MISAInput
              :required="true"
              ref="FixedAssetCode"
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
              ref="FixedAssetName"
              maxlength="255"
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
              :maxlength="50"
              :name="'Mã bộ phận sử dụng'"
              ref="DepartmentCode"
              placeholder="Chọm mã bộ phận sử dụng"
              :optionList="departmentData"
              filterby="DepartmentCode"
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
              :maxlength="50"
              required="true"
              :optionList="categoryData"
              ref="FixedAssetCategoryCode"
              name="Mã loại tài sản"
              filterby="FixedAssetCategoryCode"
              placeholder="Chọm mã loại tài sản"
              @selectItem="autoFieldCombobox"
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
            <label for="input">Số lượng<span> *</span></label>
            <MISAInput
              :required="true"
              :isNumber="true"
              name="Số lượng"
              maxlength="11"
              ref="Quantity"
              classParent="number-input-icon"
              v-model="asset.Quantity"
              @keydown.down="
                asset.Quantity < 1 ? (asset.Quantity = 0) : asset.Quantity--
              "
              @keydown.up="asset.Quantity++"
            ></MISAInput>
            <div class="spin-button-container">
              <div class="up" @click="asset.Quantity++"></div>
              <div
                class="down"
                @click="
                  asset.Quantity < 1 ? (asset.Quantity = 0) : asset.Quantity--
                "
              ></div>
            </div>
          </div>
          <div class="modal-field">
            <label for="input">Nguyên giá <span>*</span></label>
            <MISAInput
              maxlength="25"
              :required="true"
              :isNumber="true"
              ref="Cost"
              name="Nguyên giá"
              classParent="number-input"
              v-model="Cost"
            ></MISAInput>
          </div>
          <div class="modal-field">
            <label for="input">Số năm sử dụng <span>*</span></label>
            <MISAInput
              ref="LifeTime"
              maxlength="11"
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
            <label for="input">Tỉ lệ hao mòn(%) <span>*</span></label>
            <MISAInput
              ref="DepreciationRate"
              maxlength="11"
              :isNumber="true"
              type="number"
              min="0"
              required="true"
              name="Tỉ lệ hao mòn"
              classParent="number-input-icon"
              v-model="DepreciationRate"
            ></MISAInput>

            <div class="spin-button-container">
              <div class="up" @click="DepreciationRate++"></div>
              <div
                class="down"
                @click="
                  DepreciationRate < 1
                    ? (DepreciationRate = 0)
                    : DepreciationRate--
                "
              ></div>
            </div>
          </div>

          <div class="modal-field">
            <label for="input">Giá trị hao mòm năm <span>*</span></label>
            <MISAInput
              ref="DepreciationValue"
              :required="true"
              :isNumber="true"
              type="text"
              maxlength="25"
              name="Giá trị hao mòm năm"
              classParent="number-input"
              v-model="DepreciationValue"
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
              <MISADatepicker
                required
                name="Ngày mua"
                ref="purchaseDate"
                v-model="asset.PurchaseDate"
              ></MISADatepicker>
              <div class="datepicker-icon"></div>
            </div>
          </div>
          <div class="modal-field">
            <label for="input">Ngày bắt đầy sử dụng <span>*</span></label>
            <div class="datepicker-container">
              <MISADatepicker
                required
                name="Ngày bắt đầu sử dụng"
                v-model="asset.UseDate"
              ></MISADatepicker>
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
        <!-- @keydown.tab="tabToFocus($event)" -->
        <MISAButton @click="onSubmit($event)" buttonTitle="Lưu"></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
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
  ],

  beforeMount() {
    // Gắn dữ liệu:
    this.asset = this.assetSelected;

    // Gán giá trị cho trường Năm theo dõi:
    this.asset.TrackedYear = new Date().getFullYear();
  },

  mounted() {
    // Focus vào ô input đầu
    this.$refs.FixedAssetCode.setFocus();

    // Tạo ra obj đầu vào để so sánh
    this.assetCopy = Object.assign({}, this.asset);
  },

  computed: {
    /**
     * Mô tả : Tính giá trị hao mòn năm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:07 19/05/2022
     */
    DepreciationValue: {
      get() {
        return this.formatSalary(this.asset.DepreciationValue.toString());
      },
      set(newValue) {
        newValue = newValue.replaceAll(".", "");
        this.asset.DepreciationValue = newValue;
      },
    },

    /**
     * Mô tả : format tiền (nguyên giá)
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:26 01/05/2022
     */
    Cost: {
      get() {
        return this.formatSalary(this.asset.Cost.toString());
      },
      set(newValue) {
        newValue = newValue.replaceAll(".", "");
        this.asset.Cost = newValue;
        // Tính giá trị hao mòn năm
        this.asset.DepreciationValue = Math.floor(
          this.asset.Cost * this.asset.DepreciationRate
        );
      },
    },

    /**
     * Mô tả : Hiển thị tỉ lệ hao mòm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:21 20/05/2022
     */
    DepreciationRate: {
      get() {
        return this.asset.DepreciationRate * 100;
      },
      set(newValue) {
        this.asset.DepreciationRate = newValue / 100;
        this.asset.DepreciationValue =
          this.asset.DepreciationRate * this.asset.Cost;
      },
    },
  },

  watch: {
    /**
     * Mô tả : Theo dõi sự thay đổi của mã loại tài sản để gán dữ liệu cho các trường input
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:29 20/05/2022
     */
    "asset.FixedAssetCategoryCode"(newValue) {
      var data = this.categoryData.find(
        (item) => item.FixedAssetCategoryCode == newValue
      );
      if (!data) {
        this.asset.FixedAssetCategoryName = "";
        this.asset.DepreciationRate = "";
        this.asset.LifeTime = "";
      }
    },
    /**
     * Mô tả : Theo dõi sự thay đổi của mã bộ phận sử dụng để gán dữ liệu cho các trường input
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:29 20/05/2022
     */
    "asset.DepartmentCode"(newValue) {
      var data = this.departmentData.find(
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
     * Mô tả : Validate DatePicker khi blur
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:09 25/05/2022
     */
    // checkDatePicker() {
    //   if (this.asset.PurchaseDate == "" || this.asset.PurchaseDate == null) {
    //     this.$refs.purchaseDate.inputClassName = "m-input-error";
    //   }
    // },
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
    },

    /**
     * Mô tả : Tính Giá trị hao mòn khi chọn combobox
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:24 24/05/2022
     */
    autoFieldCombobox(option) {
      this.asset.DepreciationRate = option.DepreciationRate;
      this.asset.FixedAssetCategoryName = option.FixedAssetCategoryName;
      this.asset.LifeTime = option.LifeTime;
      // Tính giá trị hao mòn năm:
      this.asset.DepreciationValue =
        this.asset.Cost * this.asset.DepreciationRate;
    },

    /**
     * Mô tả : Tính những giá trị còn lại để đẩy lên api
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:31 24/05/2022
     */
    autoFieldData() {
      // Ngày tạo
      if (!this.isEditing) {
        this.asset.CreatedDate = new Date();
      }
      // Ngày sứa
      this.asset.ModifiedDate = new Date();
      // Tính Năm sử dụng(Năm hiện tại - năm ngày bắt đầu sử dụng)
      this.asset.ProductionYear =
        this.asset.TrackedYear - new Date(this.asset.UseDate).getFullYear();
      // Tính Lũy kế
      this.asset.Accumulated =
        this.asset.Cost *
        this.asset.DepreciationRate *
        this.asset.ProductionYear;
    },

    /**
     * Mô tả : Thêm asset mới
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 20:31 26/04/2022
     */
    async onCreateAsset() {
      // Tính những giá trị cần lưu lên db
      this.autoFieldData();
      // Gửi dữ liệu lên api
      try {
        const res = await axios.post(
          "http://localhost:5234/api/v1/FixedAssets",
          this.asset
        );
        this.$emit("alertShow", false);
        this.$emit("dialogShow", false);
        if (res.statusText == "Created") {
          // Cập nhật lại bảng
          this.$emit("filterAsset");
          // Cập nhật lại tổng bản ghi
          this.$emit("getAssetData");
          // Hiên thị toast thành công
          this.$emit("toastShow", toast_msg.CREATE_SUCCESS);
        }
      } catch (error) {
        this.$emit("alertShow", true, error.response.data.data.data[0]);
      }
    },

    /**
     * Mô tả : Sửa asset
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 20:46 26/04/2022
     */
    async onUpdateAsset() {
      // Tính những giá trị cần lưu lên db
      this.autoFieldData();
      // Gửi dữ liệu lên api
      try {
        const res = await axios.put(
          `http://localhost:5234/api/v1/FixedAssets/${this.asset.FixedAssetId}`,
          this.asset
        );
        this.$emit("alertShow", false);
        this.$emit("dialogShow", false);
        if (res.statusText == "OK") {
          // Cập nhật lại bảng:
          this.$emit("filterAsset");
          // Cập nhật lại tổng bản ghi
          this.$emit("getAssetData");
          // Hiển thị thông báo thành công:
          this.$emit("toastShow", toast_msg.SAVE_SUCESS);
        }
      } catch (error) {
        console.log(error.response);
        this.$emit("alertShow", true, error.response.data.data.data[0]);
      }
    },

    /**
     * Mô tả : Ấn nút hủy, hiển thị thông báo
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 17:21 26/04/2022
     */
    onCancel() {
      // Kiểm tra sự thay đổi trong các ô input:
      // Nếu không có hiển thị thông báo đóng:
      if (JSON.stringify(this.assetCopy) === JSON.stringify(this.asset)) {
        this.$emit("alertShow", true, cancel_msg.CANCEL, "cancel");
      } else {
        // Nếu có sự thay đổi hiển thị cảnh báo báo:
        this.$emit("alertShow", true, cancel_msg.CANCEL_CHANGE, "cancelChange");
      }
    },

    /**
     * Mô tả : Validate dữ liệu
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:40 28/04/2022
     */
    onSubmit() {
      // Gắn lại giá trị cho erorr list về rỗng
      this.errorList = [];
      var first = true;

      // 1. Validate input rỗng:
      var form = this.$refs.form;
      // Vòng lặp trong form để lấy các input
      Array.from(form.elements).forEach((element) => {
        // Kiểm tra giá trị của input
        if (element.required && element.value.trim() == "") {
          if (first) {
            first = false;
            this.firstEmptyElement = element;
          }
          element.classList.add("m-input-error");
          this.errorList.push(`${error_msg.EMPTY_VALUE}${element.name}`);
        }
      });

      console.log(this.firstEmptyElement);

      // 2. Validate nghiệp vụ:
      // 2.1 Tỉ lệ hao mòn khác 1/số năm sử dụng:
      if (
        this.asset.DepreciationRate !== (1 / this.asset.LifeTime).toFixed(4)
      ) {
        this.errorList.push("Tỷ lệ hao mòn năm phải bằng 1/Số năm sử dụng");
      }

      // 2.2 Hao mòn năm nhỏ hơn nguyên giá:
      if (Number(this.asset.DepreciationValue) > Number(this.asset.Cost)) {
        this.errorList.push("Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá");
      }

      // console.log(Object.entries(this.$refs));

      // 3. Nếu không có lỗi gì thì thực hiện thêm hoặc sửa
      if (this.errorList.length != 0) {
        this.$emit("alertShow", true, this.errorList[0]);
      } else {
        this.isEditing ? this.onUpdateAsset() : this.onCreateAsset();
      }
    },

    /**
     * Mô tả : setFocus vào element đầu tiên
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:12 30/05/2022
     */
    setFocusEmpty() {
      this.firstEmptyElement.focus();
    },
  },

  data() {
    return {
      assetCopy: {},
      asset: {},
      errorList: [],
      firstEmptyElement: null,
    };
  },
};
</script>
<style></style>
