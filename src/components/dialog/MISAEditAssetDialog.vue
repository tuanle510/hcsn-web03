<template>
  <div :class="[{ 'bgc-none': isLoading }, 'm-dialog', 'license-dialog']">
    <div class="m-modal license-modal">
      <div class="m-modal-title license-title">
        Sửa tài sản {{ this.licenseDetail.FixedAssetName }}
      </div>
      <div class="m-modal-close icon-box-24 tooltip" tooltip="Hủy bỏ">
        <div class="close"></div>
      </div>
      <div class="m-modal-centent" style="padding-bottom: 0px">
        <div class="modal-row">
          <div class="modal-field modal-field-long">
            <label>Bộ phận sử dụng</label>
            <MISAInput
              disabled
              v-model="licenseDetail.DepartmentName"
            ></MISAInput>
          </div>
        </div>
        <div style="font-size: 16px; margin-bottom: 16px">
          <strong>Nguyên giá</strong>
        </div>
        <!-- Form -->
        <form
          autocomplete="off"
          ref="form"
          style="height: 300px; overflow-y: overlay; padding-bottom: 20px"
        >
          <div
            v-for="(budget, index) in budgetList"
            :key="index"
            class="modal-row modal-field-long"
            style="position: relative"
          >
            <div class="modal-field modal-field-long">
              <label>Bộ phận sử dụng</label>
              <MISACombobox
                :required="true"
                :optionList="sourceInformation"
                filterby="budget"
                v-model="budget.name"
                ref="combobox"
              ></MISACombobox>
            </div>
            <div class="modal-field">
              <label>Giá trị</label>
              <MISAInput
                :currencyFormat="true"
                :required="true"
                :isNumber="true"
                classParent="text-align-right"
                style="padding-right: 0"
                v-model="budget.cost"
                ref="input"
              ></MISAInput>
            </div>
            <div class="icon-box-container">
              <div class="icon-box-36" @click="btnPlus">
                <div class="plus tooltip" tooltip="Thêm nguồn chi phí"></div>
              </div>
              <div
                v-if="this.budgetList.length > 1"
                class="icon-box-36"
                @click="btnMinus(budget)"
              >
                <div class="minus tooltip" tooltip="Bỏ nguồn chi phí"></div>
              </div>
            </div>
          </div>
        </form>
        <!-- Total -->
        <div class="modal-row modal-field-long">
          <div class="modal-field modal-field-long">
            <MISAInput disabled v-model="totalText"></MISAInput>
          </div>
          <div class="modal-field">
            <MISAInput
              classParent="text-align-right"
              style="padding-right: 0"
              disabled
              :currencyFormat="true"
              v-model="totalCost"
            ></MISAInput>
          </div>
        </div>
      </div>
      <div class="m-modal-footer">
        <MISAButton
          type="outline-button"
          buttonTitle="Hủy"
          @click="onCancel"
        ></MISAButton>
        <MISAButton buttonTitle="Lưu" @click="onSubmit"></MISAButton>
      </div>
    </div>

    <!-- Loading  -->
    <div v-if="isLoading" class="m-dialog">
      <MISALoading></MISALoading>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  props: ['licenseDetailSelected'],

  beforeMount() {
    // Gán vào giá trị:
    this.licenseDetail = this.licenseDetailSelected;
    console.log(this.licenseDetail);

    // Nếu detailjson rỗng thì lấy giá trị budgetlist là rỗng, nếu không thì gán budgetList bằng detailjson
    if (this.licenseDetail.DetailJson != null) {
      this.budgetList = JSON.parse(this.licenseDetail.DetailJson);
    }
  },

  computed: {
    /**
     * Mô tả : Tính tổng nguyên giá:
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:39 19/06/2022
     */
    totalCost: function () {
      const totalCost = this.budgetList.reduce((currentValue, item) => {
        return currentValue + Number(item.cost.replaceAll('.', ''));
      }, 0);
      return this.currencyFormat(totalCost);
    },
  },

  methods: {
    /**
     * Mô tả : Ấn hủy
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:00 10/06/2022
     */
    onCancel() {
      this.$emit('editAssetDialogShow', false);
    },

    /**
     * Mô tả : Thêm nguồn hình thành mới
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:21 18/06/2022
     */
    btnPlus() {
      this.budgetList.push({
        name: '',
        cost: '',
      });
    },

    /**
     * Mô tả : Xóa nguồn 1 hình thành
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:22 18/06/2022
     */
    btnMinus(budget) {
      this.budgetList = this.budgetList.filter(function (item) {
        return item !== budget;
      });
    },

    /**
     * Mô tả : Check rỗng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:59 19/06/2022
     */
    validateInput() {
      // check trống combobox
      this.$refs.combobox.forEach((element) => {
        element.validateRequired();
      });
      // Check trống input
      this.$refs.input.forEach((element) => {
        element.validateRequired();
      });
      var isEmpty = false;
      // Trả về true nếu input rỗng:
      this.budgetList.forEach((element) => {
        if (element.name == '' || element.cost == '') {
          isEmpty = true;
        } else {
          isEmpty = false;
        }
      });

      // check trùng nguồn tài sản:
      var arrayToCheck = this.budgetList.map((item) => item.name); // => lấy name

      // Check trùng:
      var dupList = [];
      for (let i = 0; i < arrayToCheck.length; i++) {
        var dup = arrayToCheck.indexOf(arrayToCheck[i]) != i;
        if (dup) dupList.push(i);
      }

      var isDuplicate = false;
      if (dupList.length != 0) {
        isDuplicate = true;
        dupList.forEach((item) => {
          this.$refs.combobox[item].setErrorMsg('Nguồn chi phí đã tồn tại!');
        });
      } else {
        isDuplicate = false;
      }

      this.isError = isEmpty == true || isDuplicate == true;
      console.log(this.isError);
    },

    /**
     * Mô tả : Ấn lưu
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:45 18/06/2022
     */
    async onSubmit() {
      this.validateInput();
      // Nếu input không rỗng thì thực hiện update:
      if (this.isError == false) {
        this.isLoading = true;
        // Gán lại giá trị cho detailJson:
        this.licenseDetail.DetailJson = JSON.stringify(this.budgetList);
        // Gửi dữ liệu nên API:
        if (this.licenseDetail.LicenseDetailId != null) {
          try {
            const res = await axios.put(
              `LicenseDetail/${this.licenseDetail.LicenseDetailId}`,
              this.licenseDetail
            );
            if (res.status == 200) {
              // Hiển thị toast
              console.log(res.data);
            }
          } catch (error) {
            console.log(error.response.data);
          }
        } else {
          this.$emit(
            'updateDetailJson',
            this.licenseDetail.DetailJson,
            this.licenseDetail.FixedAssetId
          );
        }
        this.isLoading = false;
        this.$emit('editAssetDialogShow', false);
      }
    },

    /**
     * Mô tả : format tiền
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 21:30 18/06/2022
     */
    currencyFormat(value) {
      var format = `${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
      return format;
    },
  },

  data() {
    return {
      isLoading: false,
      totalText: 'Tổng',
      sourceInformation: [
        {
          id: 1,
          budget: 'Ngân sách Tỉnh',
        },
        {
          id: 2,
          budget: 'Ngân sách Huyện',
        },
        {
          id: 3,
          budget: 'Ngân sách Trung ương',
        },
      ],
      licenseDetail: {},
      isError: false,
      // spanMsg: '',
      budgetList: [
        {
          name: '',
          cost: '',
        },
      ],
    };
  },
};
</script>
<style></style>
