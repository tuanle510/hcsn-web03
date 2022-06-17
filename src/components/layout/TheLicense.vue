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
            class="m-search"
            @change="onSearchLicense"
            v-model="searchValue"
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
            <MISALoading v-if="isLicnesLoading"></MISALoading>
            <tbody v-else>
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
                <td class="text-align-left w-150" style="color: #1aa4c8">
                  {{ license.LicenseCode }}
                </td>
                <td class="text-align-center w-130">
                  {{ dateTimeFormat(license.UseDate) }}
                </td>
                <td class="text-align-center w-130">
                  {{ dateTimeFormat(license.WriteUpDate) }}
                </td>
                <td class="text-align-right w-150">
                  {{ currencyFormat(license.Total) }}
                </td>
                <td
                  class="text-align-left text-width last-td"
                  style="padding-left: 15px"
                >
                  {{ license.Description }}
                  <div
                    :class="[
                      { 'm-function-box-show': license.checked },
                      'm-function-box',
                      'last-td-icon',
                    ]"
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
          <div class="total-text">{{ currencyFormat(quantityCost) }}</div>
        </div>
        <!-- Tổng số bảng ghi -->
        <div class="license-paging">
          <div class="m-total-number">
            Tổng số:
            <strong>{{ this.totalLicenseLength }}</strong> bản ghi
          </div>
          <MISADropdown
            :defaultValue="this.pageSize"
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
            v-model="pageIndex"
            :click-handler="getPageIndex"
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
                <MISALoading v-if="isAssetLoading"></MISALoading>
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
      @filterLicense="filterLicense"
      :licenseSelected="licenseSelected"
    ></MISALicenseDialog>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  computed: {
    /**
     * Mô tả : Tính tổng số trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:39 17/06/2022
     */
    totalPageIndex: function () {
      return Math.ceil(this.filterLicenseLength / this.pageSize);
    },

    /**
     * Mô tả : Tính tổng nguyên giá
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 13:50 17/06/2022
     */
    quantityCost: function () {
      const quantityCost = this.licenseData.reduce((currentValue, item) => {
        return currentValue + Number(item.Total);
      }, 0);
      return quantityCost;
    },
  },

  async beforeMount() {
    //
    await this.filterLicense();
    //
    await this.getAllLicense();
  },

  methods: {
    /**
     * Mô tả : Tìm kiếm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:15 17/06/2022
     */
    async onSearchLicense() {
      this.pageIndex = 1;
      await this.filterLicense();
    },
    /**
     * Mô tả : Lấy tất cả dữ liệu => tổng số bảng ghi
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:15 17/06/2022
     */
    async getAllLicense() {
      try {
        const res = await axios.get("Licenses");
        this.totalLicenseLength = res.data.length;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Gọi dữ liệu từ API và phân trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:10 17/06/2022
     */
    async filterLicense() {
      this.isLicnesLoading = true;
      try {
        const res = await axios.get("Licenses/FilterLicense", {
          params: {
            searchLicense: this.searchValue,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          },
        });
        res.data.List.map((element) => {
          element.checked = false;
        });
        // Gán vào biến:
        this.filterLicenseLength = res.data.Count; // Tổng bản ghi
        this.licenseData = [...res.data.List]; // Danh sách chứng từ
        this.isLicnesLoading = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Chọn số trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:36 17/06/2022
     */
    async getPageIndex(pageIndex) {
      this.pageIndex = pageIndex;
      await this.filterLicense();
    },

    /**
     * Mô tả : Chọn số bản ghi trong 1 trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:36 17/06/2022
     */
    async getPageSize(option) {
      this.pageSize = option;
      this.pageIndex = 1;
      await this.filterLicense();
    },

    /**
     * Mô tả : Xử lí sự kiện click 1 lần vào row
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:09 17/06/2022
     */
    async onRowClick(license, $event) {
      // Nếu ấn edit:
      if ($event.target.classList.contains("edit-btn")) {
        this.showEditLicense(license);
      }
      // Nếu ấn xóa (icon xóa):
      else if ($event.target.classList.contains("remove-btn")) {
        this.removeLicense(license);
      }
      // Nếu ấn vào cả dòng:
      else {
        await this.getAsssetList(license);
      }
    },

    /**
     * Mô tả : Xóa chứng từ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:48 17/06/2022
     */
    async removeLicense(license) {
      try {
        const res = await axios.delete(`Licenses/${license.LicenseId}`);
        if (res.status == 200) {
          console.log("Hiển thị toast");
          // Gọi lại API lấy dữ liệu
          this.filterLicense();
        }
      } catch (error) {
        console.log(error);
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
      this.isAssetLoading = license.checked ? true : false;

      // first clear  time
      clearTimeout(this.time);
      // Debount 3s
      this.time = await setTimeout(() => {
        // Nếu đang tích thì sẽ gọi lại API, nếu không tích thì không gọi (Tránh trường hợp gọi lại API)
        if (license.checked == true) {
          // Hiển thị danh sách sản phẩm có trong chứng từ:
          this.getLicenseDetail(license.LicenseId);
        } else {
          this.assetList = [];
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
        if (res.status == 200) {
          // gán licenseSelected để truyền xuống dialog khi dbClick
          this.licenseSelected = res.data;
          // Gán vào danh sách tài sản để hiên thị lên UI
          this.assetList = this.licenseSelected.FixedAssetList;
          this.isAssetLoading = false;
        }
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
      // Focus vào dòng vừa chọn
      license.checked = true;
      // Xóa debout
      clearTimeout(this.time);
      // Gọi API gửi dữ liệu về
      await this.getLicenseDetail(license.LicenseId);
      // Hiển thị dialog
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
      // Loading
      isAssetLoading: false,
      isLicnesLoading: false,
      //Tổng số bản ghi
      filterLicenseLength: null, // Tổng số bản ghi theo tìm kiếm
      totalLicenseLength: null, // Tổng số bản ghi chưa phân trang
      // Phân trang
      searchValue: "", // Ô tìm kiếm
      pageIndex: 1,
      pageSize: 20,
    };
  },
};
</script>
<style></style>
