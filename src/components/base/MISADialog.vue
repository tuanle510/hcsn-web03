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
              v-model="asset.code"
              name="Mã tài sản"
            ></MISAInput>
          </div>
          <div class="modal-field modal-field-long">
            <label for="input">Tên tài sản <span>*</span></label>
            <MISAInput
              :required="true"
              :name="'Tên tài sản'"
              placeholder="Nhập tên tài sản"
              v-model="asset.name"
            >
            </MISAInput>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label for="input">Mã bộ phận sử dụng <span>*</span></label>

            <MISACombobox
              :required="true"
              :optionList="partUseData"
              name="Mã bộ phận sử dụng"
              filterby="partUseCode"
              placeholder="Chọm mã bộ phận sử dụng"
              v-model="asset.partUseCode"
            ></MISACombobox>
          </div>
          <div class="modal-field modal-field-long">
            <label for="input">Tên bộ phận sử dụng</label>
            <MISAInput disabled v-model="asset.partUseName"> </MISAInput>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label for="input">Mã loại tài sản <span>*</span></label>

            <MISACombobox
              required="true"
              :optionList="typeData"
              name="Mã loại tài sản"
              filterby="typeCode"
              placeholder="Chọm mã loại tài sản"
              v-model="asset.typeCode"
            ></MISACombobox>
          </div>
          <div class="modal-field modal-field-long">
            <label for="input">Tên loại tài sản</label>
            <MISAInput disabled v-model="asset.typeName"></MISAInput>
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
              @keydown.down="
                asset.quantity == 0 ? (asset.quantity = 0) : asset.quantity--
              "
              @keydown.up="asset.quantity++"
              v-model="asset.quantity"
            ></MISAInput>
            <div class="spin-button-container">
              <div class="up" @click="asset.quantity++"></div>
              <div
                class="down"
                @click="
                  asset.quantity == 0 ? (asset.quantity = 0) : asset.quantity--
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
              required="true"
              name="Số năm sử dụng"
              classParent="number-input"
              v-model="asset.year"
            ></MISAInput>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label for="input">Tỉ lệ hao mòn(%)<span>*</span></label>
            <MISAInput
              required="true"
              name="Tỉ lệ hao mòn"
              classParent="number-input-icon"
              v-model="asset.depreciationRate"
              @keydown.down="
                asset.depreciationRate == 0
                  ? (asset.depreciationRate = 0)
                  : asset.depreciationRate--
              "
              @keydown.up="asset.depreciationRate++"
            ></MISAInput>

            <div class="spin-button-container">
              <div class="up" @click="asset.depreciationRate++"></div>
              <div
                class="down"
                @click="
                  asset.depreciationRate == 0
                    ? (asset.depreciationRate = 0)
                    : asset.depreciationRate--
                "
              ></div>
            </div>
          </div>
          <!-- @change="changeValue" -->
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
              v-model="newYear"
            ></MISAInput>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label for="input">Ngày mua <span>*</span></label>
            <div class="datepicker-container">
              <Datepicker
                class="mt-input input-datepicker"
                v-model="buyDate"
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
                v-model="asset.useDate"
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
import axios from 'axios';
export default {
  name: 'the-dialog',
  props: [
    'assetSelected',
    'dialogTitle',
    'isEditing',
    'partUseData',
    'typeData',
    'assetCodes',
  ],

  beforeMount() {
    // mounted mới gắn dữ liệu
    this.asset = this.assetSelected;
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
        (this.asset.price * (this.asset.depreciationRate / 100)).toString()
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
        return this.formatSalary(this.asset.price.toString());
      },
      set(newValue) {
        newValue = newValue.replaceAll('.', '');
        this.asset.price = newValue;
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
    'asset.typeCode'(newValue) {
      let chosedType = this.typeData.find((item) => item.typeCode == newValue);
      if (chosedType) {
        this.asset.typeName = chosedType.typeName;
      } else {
        this.asset.typeName = '';
      }
    },

    'asset.partUseCode'(newValue) {
      let chosedUsePart = this.partUseData.find(
        (item) => item.partUseCode == newValue
      );
      if (chosedUsePart) {
        this.asset.partUseName = chosedUsePart.partUseName;
      } else {
        this.asset.partUseName = '';
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
      var format = `${value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
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
          'https://62616774327d3896e27b58d2.mockapi.io/api/asset',
          this.asset
        );
        this.$emit('alertShow', false);
        this.$emit('dialogShow', false);
        if (res.statusText == 'Created') {
          this.$emit('toastShow', true, 'Lưu dữ liệu thành công');
          setTimeout(() => {
            this.$emit('toastShow', false);
          }, 2300);
        }
      } catch (error) {
        console.log(error);
      }
      // Cập nhật lại bảng
      this.$emit('getAssetData');
    },

    /**
     * Mô tả : Sửa asset
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 20:46 26/04/2022
     */
    async onUpdateAsset() {
      try {
        const res = await axios.put(
          `https://62616774327d3896e27b58d2.mockapi.io/api/asset/${this.asset.id}`,
          this.asset
        );
        this.$emit('alertShow', false);
        this.$emit('dialogShow', false);
        if (res.statusText == 'OK') {
          this.$emit('toastShow', true, 'Sửa dữ liệu thành công');
          setTimeout(() => {
            this.$emit('toastShow', false);
          }, 2300);
        }
      } catch (error) {
        console.log(error);
      }
      // Cập nhật lại bảng
      this.$emit('getAssetData');
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
        this.$emit(
          'alertShow',
          true,
          'Bạn có muốn hủy bỏ khai báo này?',
          'cancel'
        );
      } else {
        this.$emit(
          'alertShow',
          true,
          'Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu nhũng thay đổi này?',
          'cancelChange'
        );
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
        if (element.required && (element.value == '' || element.value == '0')) {
          element.classList.add('m-input-error');
          this.errorList.push(`Cần phải nhập thông tin ${element.name}`);
        }
      });
      // Nếu không có lỗi gì thì thực hiện thêm hoặc sửa
      if (this.errorList.length != 0) {
        this.$emit('alertShow', true, this.errorList[0]);
      } else {
        this.isEditing ? this.onUpdateAsset() : this.onCreateAsset();
      }
    },
  },

  data() {
    return {
      assetCopy: {},
      asset: {},
      newYear: new Date().getFullYear(),
      startDate: new Date(),
      buyDate: new Date(),
      priceFormat: '',
      errorList: [],
    };
  },
};
</script>
<style></style>
