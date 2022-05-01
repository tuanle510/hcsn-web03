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
            :class="{ 'm-input-error': this.error.assetCode != '' }"
            ref="firstInput"
            type="text"
            maxlength="20"
            placeholder="Nhập mã tài sản"
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
            :optionList="partUseData"
            filterby="partUseName"
            :hasIcon="false"
            placeholder="Chọm mã bộ phận sử dụng"
            @selected="getComboboxValue"
          ></MISACombobox>
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên bộ phận sử dụng</label>
          <input class="m-input" disabled />
        </div>
        <div class="modal-field">
          <label for="input">Mã loại tài sản <span>*</span></label>
          <MISACombobox
            :optionList="typeData"
            filterby="typeName"
            :hasIcon="false"
            placeholder="Chọm mã loại tài sản"
            @selected="getComboboxValue"
          ></MISACombobox>
        </div>
        <div class="modal-field modal-field-long">
          <label for="input">Tên loại tài sản</label>
          <input class="m-input" disabled />
        </div>
        <div class="modal-field">
          <label for="input">Số lượng<span>*</span></label>
          <input
            @keydown.up="asset.quantity++"
            @keydown.down="
              asset.quantity == 0 ? asset.quantity == 0 : asset.quantity--
            "
            ref="quantity"
            class="m-input number-input-icon"
            v-model="asset.quantity"
          />
          <div class="spin-button-container">
            <div class="up" @click="asset.quantity++"></div>
            <div
              class="down"
              @click="
                asset.quantity == 0 ? asset.quantity == 0 : asset.quantity--
              "
            ></div>
          </div>
        </div>
        <div class="modal-field">
          <label for="input">{{ this.priceFormat }} <span>*</span></label>
          <input
            class="m-input number-input"
            type="number"
            v-model="formatCurrency"
          />
        </div>
        <div class="modal-field">
          <label for="input">Số năm sử dụng <span>*</span></label>
          <input class="m-input number-input" v-model="asset.year" />
        </div>
        <div class="modal-field">
          <label for="input">Tỉ lệ hao mòn(%)<span>*</span></label>
          <input
            @keydown.up="asset.depreciationRate++"
            @keydown.down="
              asset.depreciationRate == 0
                ? asset.depreciationRate == 0
                : asset.depreciationRate--
            "
            ref="quantity"
            class="m-input number-input-icon"
            v-model="asset.depreciationRate"
          />
          <div class="spin-button-container">
            <div class="up" @click="asset.depreciationRate++"></div>
            <div
              class="down"
              @click="
                asset.depreciationRate == 0
                  ? asset.depreciationRate == 0
                  : asset.depreciationRate--
              "
            ></div>
          </div>
        </div>
        <div class="modal-field">
          <label for="input">Giá trị hao mòm năm <span>*</span></label>
          <input
            class="m-input number-input"
            v-model="annualDepreciationRate"
          />
        </div>
        <div class="modal-field">
          <label for="input">Năm theo dõi</label>
          <input class="m-input number-input" disabled :value="newYear" />
        </div>
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
              v-model="startDate"
              format="dd/MM/yyyy"
              :maxDate="new Date()"
            ></Datepicker>
            <div class="datepicker-icon"></div>
          </div>
        </div>
      </div>

      <div class="m-modal-footer">
        <MISAButton
          style="border: none"
          type="outline-button"
          @click="onCancelAsset"
          buttonTitle="Hủy"
        ></MISAButton>
        <MISAButton
          @click="!isEditing ? onCreateAsset() : onUpdateAsset()"
          buttonTitle="Lưu"
        ></MISAButton>
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
  ],

  // computed: {
  //   formatPrice: function () {
  //     return this.asset.price.toLocaleString();
  //   },
  // },

  mounted() {
    // mounted mới gắn dữ liệu
    this.asset = this.assetSelected;
    // Focus vào ô input đầu
    this.$refs.firstInput.focus();

    // Tạo ra obj đầu vào để so sánh
    this.assetCopy = Object.assign({}, this.asset);
  },

  computed: {
    annualDepreciationRate: function () {
      return this.asset.price * (this.asset.depreciationRate / 100);
    },
    /**
     * Mô tả : format tiền tại inputt
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:26 01/05/2022
     */
    formatCurrency: {
      get: function () {
        return this.asset;
      },
      set: function (value) {
        this.priceFormat = new Intl.NumberFormat(
          'vi-VN',
          {
            currency: 'VND',
          }.format(value)
        );
      },
    },
  },

  methods: {
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
    },

    /**
     * Mô tả : Ấn nút hủy, hiển thị thông báo
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 17:21 26/04/2022
     */
    onCancelAsset() {
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

    //!isEditing ? onCreateAsset() : onUpdateAsset()
    /**
     * Mô tả : Validate()
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:40 28/04/2022
     */
    onSubmit() {
      if (!this.asset.name) {
        this.error.assetCode = 'Mã tài sản không được để trống';
        this.$emit('alertShow', true, this.error.assetCode);
        this.$$refs.firstInput.focus();
      }
    },

    getComboboxValue(value) {
      console.log(value);
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
      error: {
        assetCode: '',
        assetName: '',
      },
    };
  },
};
</script>
<style></style>
