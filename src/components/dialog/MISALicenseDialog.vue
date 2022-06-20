<template>
  <div
    :class="[
      { 'bgc-none': isEditAssetShow || isLoading },
      'm-dialog',
      'license-dialog',
    ]"
  >
    <div class="m-modal license-modal w-950">
      <div class="m-modal-title license-title">
        {{ isEditing ? 'Sửa chứng từ ghi tăng' : 'Thêm chứng từ ghi tăng' }}
      </div>
      <div
        class="m-modal-close icon-box-24 tooltip"
        tooltip="Hủy bỏ"
        @click="onCancel"
      >
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
              <thead style="z-index: 2">
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
                  v-for="(asset, index) in showList"
                  @dblclick="showEditAssetDetail(asset)"
                  :key="index"
                  class="m-tr"
                >
                  <td class="text-align-center">
                    {{ index + 1 }}
                  </td>
                  <td class="text-align-left">
                    {{ asset.FixedAssetCode }}
                  </td>
                  <td
                    class="text-align-left text-limit"
                    style="max-width: 170px"
                    :title="asset.FixedAssetName"
                  >
                    {{ asset.FixedAssetName }}
                  </td>
                  <td class="text-align-left text-limit">
                    {{ asset.DepartmentName }}
                  </td>
                  <td class="text-align-right text-limit">
                    {{ currencyFormat(asset.Cost) }}
                  </td>
                  <td class="text-align-right">
                    {{ currencyFormat(asset.Accumulated) }}
                  </td>
                  <td class="text-align-right last-td">
                    {{ currencyFormat(asset.Cost - asset.Accumulated) }}

                    <div
                      class="m-function-box last-td-icon"
                      style="display: none; gap: 10px"
                    >
                      <div
                        class="icon-box-36 icon-hover tooltip"
                        tooltip="Sửa tài sản"
                        @click="showEditAssetDetail(asset)"
                      >
                        <div class="edit"></div>
                      </div>
                      <div
                        class="icon-box-36 icon-hover tooltip"
                        tooltip="Xóa tài sản"
                        @click="btnRemoveAsset(asset)"
                      >
                        <div class="remove-red"></div>
                      </div>
                    </div>
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
                  <th class="text-align-left" style="width: 120px"></th>
                  <th class="text-align-left" style="width: 170px"></th>
                  <th class="text-align-left" style="width: 180px"></th>
                  <th class="text-align-right" style="width: 130px">
                    {{ currencyFormat(quantityCost) }}
                  </th>
                  <th class="text-align-right" style="width: 130px">
                    {{ currencyFormat(quantityAccumulated) }}
                  </th>
                  <th class="text-align-right">
                    {{ currencyFormat(quantityCost - quantityAccumulated) }}
                  </th>
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
        <MISAButton buttonTitle="Lưu" @click="onSubmit"></MISAButton>
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
      @updateDetailJson="updateDetailJson"
      :licenseDetailSelected="licenseDetailSelected"
    ></MISAEditAssetDialog>

    <!-- Alert -->
    <MISAAlert2
      v-if="alert.isShow"
      :alertType="alert.type"
      @closeAlert="this.alertShow(false)"
      @closeDialog="this.closeLicenseDialog"
      @onSubmit="this.onSubmit"
    >
      <span v-if="alert.type == 'cancel'"
        >Bạn có muốn hủy bỏ khai báo chứng từ này?</span
      >
      <span v-else-if="alert.type == 'cancelChange'"
        >Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có
        muốn lưu các thay đổi này?</span
      >
      <span v-else>Chọn ít nhất 1 tài sản</span>
    </MISAAlert2>

    <!-- Loading  -->
    <div v-if="isLoading" class="m-dialog">
      <MISALoading></MISALoading>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  props: ['licenseSelected', 'assetData', 'isEditing'],

  beforeMount() {
    // Gán giá trị license
    this.license = this.licenseSelected;
    this.licenseCopy = Object.assign({}, this.license);

    // Gán giá trị danh sách asset
    this.assetList = this.assetData;
    this.assetListCopy = [...this.assetList];
  },

  mounted() {
    // focus vào ô đầu tiên
    this.$refs.licenseInput.setFocus();
  },

  computed: {
    /**
     * Mô tả : Tính tổng nguyên giá
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 13:49 17/06/2022
     */
    quantityCost: function () {
      const quantityCost = this.showList.reduce((currentValue, item) => {
        return currentValue + Number(item.Cost);
      }, 0);
      return quantityCost;
    },

    quantityAccumulated: function () {
      const quantityAccumulated = this.showList.reduce((currentValue, item) => {
        return currentValue + Number(item.Accumulated);
      }, 0);
      return quantityAccumulated;
    },
  },

  watch: {
    /**
     * Mô tả : Theo dõi danh sách tài sản => nếu có thay đổi thì phân trang lại, về lại trang đầu
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 02:28 19/06/2022
     */
    assetList(newValue) {
      this.searchAssetList = newValue;
      this.pageIndex = 1;
      this.paginationAsset();
    },
  },

  methods: {
    /**
     * Mô tả : Xóa tài sản trong danh sách
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:06 17/06/2022
     */
    btnRemoveAsset(assetToRemove) {
      this.assetList = this.assetList.filter(
        (asset) => asset.FixedAssetId !== assetToRemove.FixedAssetId
      );
    },
    /**
     * Mô tả : Tìm kiếm và phân trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:11 10/06/2022
     */
    searchAsset() {
      var inputValue = this.$refs.searchInput.value;
      // Tìm kiếm:
      this.searchAssetList = this.assetList.filter(
        (asset) =>
          asset.FixedAssetCode.toLowerCase().includes(
            inputValue.toLowerCase()
          ) ||
          asset.FixedAssetName.toLowerCase().includes(inputValue.toLowerCase())
      );
      // Gán lại pageIndex bằng 1 => trở lại trang đầu:
      this.pageIndex = 1;
      // Phân trang
      this.paginationAsset();
    },

    /**
     * Mô tả : Phân trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 23:43 14/06/2022
     */
    paginationAsset() {
      var paginationList = [];
      if (this.searchAssetList.length == 0) {
        paginationList = this.assetList;
      } else {
        paginationList = this.searchAssetList;
      }
      this.totalPageIndex = Math.ceil(paginationList.length / this.pageSize);

      this.showList = paginationList.slice(
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      );
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
      this.paginationAsset();
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
      this.paginationAsset();
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
      this.assetList = list.concat(this.assetList);
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
      // Đóng dialog chọn tài sản thì focus vào input Mã chứng từ:
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
     * Mô tả : Cập nhật giá trị DetailJson để gửi lên API
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:19 19/06/2022
     */
    updateDetailJson(value, id) {
      this.assetList.forEach((item) => {
        if (item.id == id) {
          item.DetailJson = value;
        }
      });
    },

    /**
     * Mô tả : Ấn 2 lần vào dòng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:10 10/06/2022
     */
    async showEditAssetDetail(asset) {
      if (asset.LicenseDetailId) {
        try {
          const res = await axios.get(
            `LicenseDetail/GetLicenseDetail/${asset.LicenseDetailId}`
          );
          this.licenseDetailSelected = res.data;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.licenseDetailSelected = asset;
      }
      this.editAssetDialogShow(true);
    },

    /**
     * Mô tả : Xử lí Thêm mới chứng từ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:09 16/06/2022
     */
    async addLicense(licenseDetails) {
      // Gửi lên API
      try {
        const res = await axios.post('Licenses/InsertLicense', licenseDetails);
        if (res.status == 201) {
          this.isLoading = false;
          this.$emit('toastShow', 'Thêm dữ liệu thành công');
          this.$emit('licenseDialogShow', false);
          this.$emit('filterLicense');
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error.response.data);
      }
    },

    /**
     * Mô tả : Xử lí sửa chứng từ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 21:34 16/06/2022
     */
    async updateLicense(licenseDetails) {
      // Gửi lên API
      try {
        const res = await axios.put(
          `Licenses/UpdateLicense/${this.license.LicenseId}`,
          licenseDetails
        );
        if (res.status == 200) {
          this.isLoading = false;
          this.$emit('toastShow', 'Sửa dữ liệu thành công');
          this.$emit('licenseDialogShow', false);
          this.$emit('filterLicense');
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error.response.data);
      }
    },

    /**
     * Mô tả : Ấn nút hủy
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:33 10/06/2022
     */
    onCancel() {
      var isLicenseNotChange =
        JSON.stringify(this.license) == JSON.stringify(this.licenseCopy);

      var isAssetlistNotChange =
        JSON.stringify(this.assetList) === JSON.stringify(this.assetListCopy);
      console.log(isLicenseNotChange, isAssetlistNotChange);
      var type = '';
      if (isLicenseNotChange == false || isAssetlistNotChange == false) {
        type = 'cancelChange';
      } else {
        type = 'cancel';
      }
      this.alertShow(true, type);
    },

    /**
     * Mô tả : Đóng cả alert cả dialog
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:06 20/06/2022
     */
    closeLicenseDialog() {
      this.alertShow(false);
      this.$emit('licenseDialogShow', false);
    },

    /**
     * Mô tả : Validate dữ liệu
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:29 20/06/2022
     */
    validate() {
      var licenseCode = this.license.LicenseCode;
      // Validate trống:
      if (licenseCode == undefined || licenseCode == '') {
        this.$refs.licenseInput.validateRequired();
        return false;
      }

      // Validate list asset rỗng:
      if (this.assetList.length == 0) {
        this.alertShow(true);
        return false;
      }

      return true;
    },

    /**
     * Mô tả : Ấn nút lưu
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:31 13/06/2022
     */
    async onSubmit() {
      // Validate:
      var isValid = this.validate();
      //  Nếu không có lỗi gì thì thực hiện:
      if (isValid) {
        this.isLoading = true;
        // Gán lại tổng nguyên giá:
        this.license.Total = this.quantityCost;
        // Tạo đối tượng gửi lên API:
        var licenseDetails = this.assetList.map((asset) => {
          if (!asset.DetailJson) {
            asset.DetailJson = null;
          }
          return {
            FixedAssetId: asset.FixedAssetId,
            DetailJson: asset.DetailJson,
          };
        });
        var InsertLicense = {
          license: this.license,
          licenseDetails: licenseDetails,
        };

        // Thực hiện thêm hoặc sửa:
        if (this.isEditing == true) {
          await this.updateLicense(InsertLicense);
        } else {
          await this.addLicense(InsertLicense);
        }
      }
    },

    /**
     * Mô tả : Tắt, mở cảnh báo
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 02:28 19/06/2022
     */
    alertShow(alert, type) {
      this.alert.isShow = alert;
      this.alert.type = type;
    },
  },
  data() {
    return {
      isLoading: false,
      alert: {
        isShow: false,
        type: '',
      },

      isChoseAssetShow: false,
      isEditAssetShow: false,
      assetList: [], // Danh dách tất cả tài sản => Tổng số tài sản
      assetListCopy: [],
      searchAssetList: [], // Danh sách lọc khi search
      showList: [], // Danh sách hiển thị lên UI
      license: {}, // Chi tiết chứng từ
      licenseCopy: {},

      isAlertShow: false,
      // Phân trang:
      totalPageIndex: 0,
      pageIndex: 1,
      pageSize: 20,

      //Chứng từ chi tiết được chọn:
      licenseDetailSelected: {},
    };
  },
};
</script>
<style>
.icon-hover {
  border-radius: 1000px;
  background-color: #d1edf4;
}

.icon-hover:hover {
  background-color: #fff;
}
</style>
