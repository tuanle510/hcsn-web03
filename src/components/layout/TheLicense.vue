<template>
  <div class="m-content m-license">
    <!-- toolbar -->
    <div class="m-license-toolbar">
      <div class="l-toolbar-left"><p>Ghi tăng tài sản</p></div>
      <div class="l-toolbar-right">
        <MISAButton buttonTitle="Thêm" @click="showAddLicense"></MISAButton>
        <div class="l-icon-container">
          <div class="icon-box-36">
            <div class="license"></div>
          </div>
          <div class="icon-box-36">
            <div class="arrow-down"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- table-->
    <div class="m-license-main">
      <div class="main-header">
        <div class="search-field" style="width: 300px">
          <input
            placeholder="Tìm kiếm theo số chứng từ, nội dung"
            ref="searchInput"
            class="m-search"
            @input="searchInput"
          />
          <div class="search-icon">
            <div class="search"></div>
          </div>
        </div>
        <div class="l-icon-container">
          <div class="icon-box-36">
            <div class="export"></div>
          </div>
          <div class="icon-box-36">
            <div class="more-vertical"></div>
          </div>
        </div>
      </div>

      <div class="main-table-container">
        <!-- Table ghi tăng -->
        <div class="m-license-table">
          <table class="m-table">
            <thead>
              <tr>
                <th class="w-50" style="padding-left: 16px">
                  <MISACheckbox></MISACheckbox>
                </th>
                <th class="text-align-center w-50">STT</th>
                <th class="text-align-left w-150">Số chứng từ</th>
                <th class="text-align-center w-130">Ngày chứng từ</th>
                <th class="text-align-center w-130">Ngày ghi tăng</th>
                <th class="text-align-right w-150">Tổng nguyên giá</th>
                <th
                  class="text-align-left text-width"
                  style="padding-left: 15px"
                >
                  Nội dung
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(license, index) in licenseData"
                :key="index"
                :class="[{ 'm-tr-seleced': license.checked }, 'm-tr']"
                @dblclick="showEditLicense(license)"
                @click="onRowClick(license, $event)"
              >
                <td style="padding-left: 16px">
                  <MISACheckbox :checked="license.checked"></MISACheckbox>
                </td>
                <td class="text-align-center w-50">{{ index + 1 }}</td>
                <td class="text-align-left w-150">{{ license.LicenseCode }}</td>
                <td class="text-align-center w-130">
                  {{ dateTimeFormat(license.UseDate) }}
                </td>
                <td class="text-align-center w-130">
                  {{ dateTimeFormat(license.WriteUpDate) }}
                </td>
                <td class="text-align-right w-150">
                  {{ currencyFormat(license.Total) }}
                </td>
                <td class="text-align-left text-width last-td">
                  {{ license.Description }}
                  <div
                    class="m-function-box last-td-icon"
                    style="display: none"
                  >
                    <div class="icon-box-36 edit-btn">
                      <div class="edit edit-btn"></div>
                    </div>
                    <div class="icon-box-36 remove-btn">
                      <div class="remove-red remove-btn"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Tổng tiền -->
        <div class="m-license-total">
          <div class="total-text">305.845.345</div>
        </div>
        <!-- Tổng số bảng ghi -->
        <div class="license-paging">
          <div class="m-total-number">
            Tổng số:
            <strong>31</strong> bản ghi
          </div>
          <!-- :defaultValue="this.pageSize"
            @onChose="getPageSize" -->
          <MISADropdown></MISADropdown>
          <!-- v-model="pageIndex" -->
          <!-- :click-handler="getPageIndex" -->
          <MISAPaginate
            :pageCount="1"
            :prev-text="'pre'"
            :prev-link-class="'prev-link-class'"
            :next-text="'next'"
            :next-link-class="'next-link-class'"
            :container-class="'m-paging-list'"
            :prev-class="'prev-class'"
          ></MISAPaginate>
        </div>

        <!-- border  -->
        <div class="mouse-draw"></div>

        <!-- table detail -->
        <div class="m-detail-container">
          <div class="detail-header">Thông tin chi tiết</div>
          <div class="m-detail-table">
            <table class="m-table">
              <thead>
                <tr>
                  <th class="text-align-center w-50">STT</th>
                  <th class="text-align-left">Mã tài sản</th>
                  <th class="text-align-left">Tên tài sản</th>
                  <th class="text-align-left">Bộ phận sử dụng</th>
                  <th class="text-align-right">Nguyên giá</th>
                  <th class="text-align-right">Hao mòn năm</th>
                  <th class="text-align-right">Giá trị còn lại</th>
                </tr>
              </thead>
              <tbody>
                <MISALoading v-if="isAssetListLoading"></MISALoading>
                <tr v-else v-for="(asset, index) in assetList" :key="index">
                  <td class="text-align-center">{{ index + 1 }}</td>
                  <td class="text-align-left">{{ asset.FixedAssetCode }}</td>
                  <td class="text-align-left">{{ asset.FixedAssetName }}</td>
                  <td class="text-align-left">{{ asset.DepartmentName }}</td>
                  <td class="text-align-right">
                    {{ currencyFormat(asset.Cost) }}
                  </td>
                  <td class="text-align-right">
                    {{ currencyFormat(asset.DepreciationValue) }}
                  </td>
                  <td class="text-align-right">Giá trị còn lại</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- chi tiết chứng từ dialog -->
    <MISALicenseDialog
      :isEditing="isEditing"
      v-if="isLicenseShow"
      @licenseDialogShow="licenseDialogShow"
      :licenseSelected="licenseSelected"
    ></MISALicenseDialog>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  async beforeMount() {
    try {
      const res = await axios.get("Licenses");
      this.licenseData = res.data;
      res.data.map((element) => {
        element.checked = false;
      });
      // Gán vào data
      this.licenseData = [...res.data];
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async onRowClick(license, $event) {
      // Nếu ấn edit:
      if ($event.target.classList.contains("edit-btn")) {
        console.log("vào");
        this.showEditLicense(license);
      }
      // Nếu ấn xóa (icon xóa):
      else if ($event.target.classList.contains("remove-btn")) {
        console.log("remove");
      }
      // Nếu ấn vào cả dòng:
      else {
        this.isAssetListLoading = true;
        await this.getAsssetList(license);
      }
    },
    /**
     * Mô tả : Lấy danh sách tài sản khi click vào bảng ghi tăng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:30 15/06/2022
     */
    async getAsssetList(license) {
      // Gỡ tích tất cả:
      this.licenseData.forEach((item) => {
        if (item.LicenseId != license.LicenseId) {
          item.checked = false;
        } else {
          // Tích vào dòng vừa chọn:
          license.checked = !license.checked;
        }
      });

      // first clear  time
      clearTimeout(this.time);
      // Debount 3s
      this.time = await setTimeout(() => {
        // Nếu đang tích thì sẽ gọi lại API, nếu không tích thì không gọi (Tránh trường hợp gọi lại API)
        if (license.checked == true) {
          // Hiển thị danh sách sản phẩm có trong chứng từ:
          this.getLicenseDetail(license.LicenseId);
        } else {
          this.isAssetListLoading = false;
        }
      }, 300);
    },

    /**
     * Mô tả : Lấy mã mới
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:13 13/06/2022
     */
    async getNewCode() {
      try {
        var res = await axios.get("Licenses/GetNewCode");
        this.newLicenseCode = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Hiển thị form thêm mới chứng từ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:36 10/06/2022
     */
    async showAddLicense() {
      this.isEditing = false;
      await this.getNewCode();
      this.licenseSelected = {
        License: {
          LicenseCode: this.newLicenseCode,
          UseDate: new Date(),
          WriteUpDate: new Date(),
        },
        FixedAssetList: [],
      };
      this.licenseDialogShow(true);
    },

    /**
     * Mô tả : Lấy thông tin chi tiết chứng từ theo id
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:33 15/06/2022
     */
    async getLicenseDetail(id) {
      try {
        const res = await axios.get(`Licenses/GetLicense/${id}`);
        this.licenseSelected = res.data;
        this.assetList = this.licenseSelected.FixedAssetList;
        this.isAssetListLoading = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Hiển thị form sửa chứng từ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:35 08/06/2022
     */
    async showEditLicense(license) {
      this.isEditing = true;
      // Xóa debout
      clearTimeout(this.time);
      await this.getLicenseDetail(license.LicenseId);
      this.licenseDialogShow(true);
    },

    /**
     * Mô tả : Tắt mở form chi tiết chứng từ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:36 10/06/2022
     */
    licenseDialogShow(value) {
      this.isLicenseShow = value;
    },

    /**
     * Mô tả : format tiền ttrong bảng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 21:30 09/06/2022
     */
    currencyFormat(value) {
      var format = `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      return format;
    },

    /**
     * Mô tả : format ngày tháng năm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:35 13/06/2022
     */
    dateTimeFormat(value) {
      return moment(value).format("DD/MM/YYYY");
    },
  },

  data() {
    return {
      isEditing: false,
      isLicenseShow: false,
      licenseData: [], // danh sách chứng từ gọi từ API
      assetList: [],
      newLicenseCode: "",
      licenseSelected: [],
      time: null,
      isAssetListLoading: false,
    };
  },
};
</script>
<style></style>
