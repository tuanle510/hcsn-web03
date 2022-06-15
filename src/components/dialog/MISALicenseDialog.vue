<template>
  <div :class="[{ 'bgc-none': isEditAssetShow }, 'm-dialog', 'license-dialog']">
    <div class="m-modal license-modal w-950">
      <div class="m-modal-title license-title">Thêm chứng từ ghi tăng</div>
      <div class="m-modal-close" @click="onCancel">
        <div class="close"></div>
      </div>

      <div class="m-modal-centent license-modal-content">
        <!-- Form thông tin chứng từ -->
        <div class="center-title">Thông tin chứng từ</div>
        <form class="edit-asset-form" autocomplete="off" ref="form">
          <div class="modal-row">
            <div class="modal-field">
              <label>Mã chứng từ <span>*</span></label>
              <MISAInput
                ref="licenseInput"
                :required="true"
                name="Mã chứng từ"
                v-model="license.LicenseCode"
              ></MISAInput>
            </div>
            <div class="modal-field">
              <label>Ngày bắt đầu sử dụng <span>*</span></label>
              <MISADatepicker
                :required="true"
                v-model="license.UseDate"
              ></MISADatepicker>
            </div>
            <div class="modal-field">
              <label>Ngày ghi tăng <span>*</span></label>
              <MISADatepicker
                :required="true"
                v-model="license.WriteUpDate"
              ></MISADatepicker>
            </div>
          </div>
          <div class="modal-row" style="margin-bottom: 0">
            <div class="modal-field modal-field-full">
              <label>Ghi chú</label>
              <MISAInput v-model="license.Description"></MISAInput>
            </div>
          </div>
        </form>

        <!-- Bảng thông tin chi tiết -->
        <div class="center-title">Thông tin chi tiết</div>
        <div class="lesence-detail">
          <!-- toolbar -->
          <div class="license-table-toolbar">
            <div class="modal-field search-field">
              <input
                placeholder="Tìm kiếm theo mã, tên tài sản"
                class="m-search"
                ref="searchInput"
                @change="searchAsset()"
              />
              <div class="search-icon">
                <div class="search"></div>
              </div>
            </div>
            <MISAButton
              style="width: 130px"
              type="outline-button"
              @click="showAddAsset"
              buttonTitle="Chọn tài sản"
            ></MISAButton>
          </div>
          <!-- bảng -->
          <div class="m-detail-table" style="height: 150px; overflow-y: auto">
            <table class="m-table">
              <thead>
                <tr>
                  <th class="text-align-center" style="width: 50px">STT</th>
                  <th class="text-align-left" style="width: 120px">
                    Mã tài sản
                  </th>
                  <th class="text-align-left" style="width: 170px">
                    Tên tài sản
                  </th>
                  <th class="text-align-left" style="width: 180px">
                    Bộ phận sử dụng
                  </th>
                  <th class="text-align-right" style="width: 130px">
                    Nguyên giá
                  </th>
                  <th class="text-align-right" style="width: 130px">
                    Hao mòn năm
                  </th>
                  <th class="text-align-right">Giá trị còn lại</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(asset, index) in fitlerAssetList"
                  @dblclick="onDbClick(asset)"
                  :key="index"
                  class="m-tr"
                >
                  <td class="text-align-center">
                    {{ index + 1 }}
                  </td>
                  <td class="text-align-left">
                    {{ asset.FixedAssetCode }}
                  </td>
                  <td class="text-align-left">
                    {{ asset.FixedAssetName }}
                  </td>
                  <td class="text-align-left">
                    {{ asset.DepartmentName }}
                  </td>
                  <td class="text-align-right">
                    {{ currencyFormat(asset.Cost) }}
                  </td>
                  <td class="text-align-right">
                    {{ currencyFormat(asset.DepreciationValue) }}
                  </td>
                  <!-- style="position: relative" -->
                  <td class="text-align-right">
                    20.000

                    <!-- <div class="m-function-box" style="display: none">
                      <div class="icon-box-36 btn-edit" @click="btnEditAsset">
                        <div class="edit"></div>
                      </div>
                      <div class="icon-box-36 btn-remove">
                        <div class="remove-red"></div>
                      </div>
                    </div> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- bảng total -->
          <div
            :class="[
              this.assetList.length == 0 ? 'visible-none' : '',
              'm-detail-table-footer',
            ]"
          >
            <table class="m-table-footer" style="border-top: none">
              <thead>
                <tr>
                  <th class="text-align-center" style="width: 50px"></th>
                  <th class="text-align-left" style="width: 90px"></th>
                  <th class="text-align-left" style="width: 180px"></th>
                  <th class="text-align-left" style="width: 180px"></th>
                  <th class="text-align-right" style="width: 130px">
                    Nguyên giá
                  </th>
                  <th class="text-align-right" style="width: 130px">
                    Hao mòn năm
                  </th>
                  <th class="text-align-right">Giá trị còn lại</th>
                </tr>
              </thead>
            </table>
          </div>
          <!-- paging -->
          <div class="license-paging" style="border-top: none">
            <div class="m-total-number">
              Tổng số:
              <strong>{{ this.assetList.length }}</strong> bản ghi
            </div>
            <MISADropdown
              :defaultValue="20"
              @onChose="getPageSize"
            ></MISADropdown>
            <MISAPaginate
              :pageCount="totalPageIndex"
              :prev-text="'pre'"
              :prev-link-class="'prev-link-class'"
              :next-text="'next'"
              :next-link-class="'next-link-class'"
              :container-class="'m-paging-list'"
              :prev-class="'prev-class'"
              :click-handler="getPageIndex"
            ></MISAPaginate>
          </div>
        </div>
      </div>

      <div class="m-modal-footer">
        <MISAButton
          type="outline-button"
          buttonTitle="Hủy"
          @click="onCancel"
        ></MISAButton>
        <MISAButton buttonTitle="Lưu" @click="onSumbit"></MISAButton>
      </div>
    </div>
    <!-- Chọn tài sản thêm vào dialog -->
    <MISAChoseAssetDialog
      v-if="isChoseAssetShow"
      @getChoseAsset="getChoseAsset"
      @choseAssetDialogShow="choseAssetDialogShow"
      :assetList="assetList"
    ></MISAChoseAssetDialog>

    <!-- Sửa tàn sản dialog -->
    <MISAEditAssetDialog
      v-if="isEditAssetShow"
      @editAssetDialogShow="editAssetDialogShow"
    ></MISAEditAssetDialog>

    <!-- Alert -->
    <MISAAlert v-if="isAlertShow" :alertTitle="this.errorList[0]"></MISAAlert>
  </div>
</template>
<script>
export default {
  props: ['licenseSelected'],

  beforeMount() {
    // Gán license bằng giá trị gọi từ API từ component cha
    this.license = this.licenseSelected;
  },

  mounted() {
    // focus vào ô đầu tiên
    this.$refs.licenseInput.setFocus();
  },

  methods: {
    /**
     * Mô tả : Tìm kiếm và phân trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:11 10/06/2022
     */
    searchAsset() {
      var inputValue = this.$refs.searchInput.value;
      this.fitlerAssetList = this.assetList.filter(
        (asset) =>
          asset.FixedAssetCode.toLowerCase().includes(
            inputValue.toLowerCase()
          ) ||
          asset.FixedAssetName.toLowerCase().includes(inputValue.toLowerCase())
      );
    },

    /**
     * Mô tả : Phân trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 23:43 14/06/2022
     */
    paginationAsset(list) {
      this.totalPageIndex = Math.ceil(list.length / this.pageSize);

      this.fitlerAssetList = list.slice(
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      );

      console.log(this.fitlerAssetList);
    },

    /**
     * Mô tả : Lấy thông tin số trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:56 14/06/2022
     */
    getPageIndex(pageNum) {
      this.pageIndex = pageNum;
      this.searchAsset();
    },

    /**
     * Mô tả : Lấy pagesize
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:58 14/06/2022
     */
    getPageSize(option) {
      this.pageSize = option;
      this.searchAsset();
    },

    /**
     * Mô tả : Nhận danh sách đã chọn từ ChoseAssetDialog
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:51 09/06/2022
     */
    getChoseAsset(list) {
      this.choseAssetDialogShow(false);
      // Gán lại giá trị cho ô tìm kiếm:
      this.$refs.searchInput.value = '';
      // Thêm vào danh sách tài sản đã có sẵn:
      this.assetList = this.assetList.concat(list);

      this.fitlerAssetList = this.assetList;
      // Phân trang:
      this.searchAsset();
    },

    /**
     * Mô tả : Mở form chọn tài sản
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:02 10/06/2022
     */
    async showAddAsset() {
      this.choseAssetDialogShow(true);
    },

    /**
     * Mô tả : Tắt,mở form chọn tài sản
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:58 08/06/2022
     */
    choseAssetDialogShow(value) {
      this.isChoseAssetShow = value;
      if (value == false) {
        this.$refs.licenseInput.setFocus();
      }
    },

    /**
     * Mô tả : Tắt, mở form sửa tài sản
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 14:13 10/06/2022
     */
    editAssetDialogShow(value) {
      this.isEditAssetShow = value;
      if (value == false) {
        this.$refs.licenseInput.setFocus();
      }
    },

    /**
     * Mô tả : format tiền ttrong bảng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 21:30 09/06/2022
     */
    currencyFormat(value) {
      var format = `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
      return format;
    },

    /**
     * Mô tả : Ấn 2 lần vào dòng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:10 10/06/2022
     */
    onDbClick(asset) {
      console.log(asset);
      this.editAssetDialogShow(true);
    },

    /**
     * Mô tả : Validate form
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 23:20 13/06/2022
     */
    validateForm() {
      // Gắn lại giá trị cho erorr list về rỗng
      this.errorList = [];
      var first = true;

      // 1. Validate input rỗng:
      var form = this.$refs.form;
      // Vòng lặp trong form để lấy các input
      Array.from(form.elements).forEach((element) => {
        // Kiểm tra giá trị của input
        if (element.required && element.value.trim() == '') {
          if (first) {
            first = false;
            this.firstEmptyElement = element;
          }
          element.classList.add('m-input-error');
          this.errorList.push(`${element.name} không được để trống`);

          this.isAlertShow = true;
        }
      });
    },

    /**
     * Mô tả : Ấn nút hủy
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:33 10/06/2022
     */
    onCancel() {
      this.$emit('licenseDialogShow', false);
    },

    /**
     * Mô tả : Ấn nút lưu
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:31 13/06/2022
     */
    onSumbit() {
      this.validateForm();
    },
  },

  data() {
    return {
      isChoseAssetShow: false,
      isEditAssetShow: false,
      assetList: [], // Danh dách tất cả tài sản => Tổng số tài sản
      fitlerAssetList: [], // Danh sách lọc khi search => Lọc sản phẩm và phân trang
      totalPageIndex: 0,
      license: {},
      errorList: [],
      isAlertShow: false,
      // Phân trang:
      pageIndex: 1,
      pageSize: 20,
    };
  },
};
</script>
<style></style>
