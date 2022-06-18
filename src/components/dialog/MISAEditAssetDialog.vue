<template>
  <div class="m-dialog license-dialog">
    <div class="m-modal license-modal">
      <div class="m-modal-title license-title">Sửa tài sản</div>
      <div class="m-modal-close">
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
          style="height: 300px; overflow-y: overlay"
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
              ></MISACombobox>
            </div>
            <div class="modal-field">
              <label>Giá trị</label>
              <MISAInput
                :required="true"
                classParent="text-align-right"
                style="padding-right: 0"
                v-model="budget.cost"
              ></MISAInput>
            </div>
            <div class="icon-box-container">
              <div class="icon-box-36" @click="btnPlus">
                <div class="plus"></div>
              </div>
              <div class="icon-box-36" @click="btnMinus(budget)">
                <div class="minus"></div>
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
  </div>
</template>
<script>
import axios from 'axios';
export default {
  props: ['licenseDetailSelected'],
  beforeMount() {
    // Gán vào giá trị:
    this.licenseDetail = this.licenseDetailSelected;

    // Nếu detailjson rỗng thì lấy giá trị budgetlist là rỗng, nếu không thì gán budgetList bằng detailjson
    if (this.licenseDetail.DetailJson != null) {
      this.budgetList = JSON.parse(this.licenseDetail.DetailJson);
    }
  },

  computed: {
    totalCost: function () {
      const totalCost = this.budgetList.reduce((currentValue, item) => {
        return currentValue + Number(item.cost);
      }, 0);
      return totalCost;
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
     * Mô tả : Ấn lưu
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:45 18/06/2022
     */
    async onSubmit() {
      this.licenseDetail.DetailJson = JSON.stringify(this.budgetList);
      console.log(this.licenseDetail);
      try {
        const res = await axios.put(
          `LicenseDetail/UpdateJsonDetail/${this.licenseDetail.LicenseDetailId}`,
          this.licenseDetail
        );
        if (res.status == 200) {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error.response.data);
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
      var format = `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
      return format;
    },
  },

  data() {
    return {
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
      budgetList: [
        {
          name: '',
          cost: 0,
        },
      ],
    };
  },
};
</script>
<style></style>
