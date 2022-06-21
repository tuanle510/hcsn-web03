<template>
  <div class="m-content m-license">
    <!-- toolbar -->
    <div class="m-license-toolbar">
      <div class="l-toolbar-left"><p>Ghi tăng tài sản</p></div>
      <div class="l-toolbar-right">
        <MISAButton buttonTitle="Thêm" @click="showAddLicense"></MISAButton>
        <div class="header-dropdown">
          <div
            class="l-icon-container"
            @click="this.isOptionShow = !this.isOptionShow"
          >
            <div class="icon-box-36">
              <div
                v-if="this.mainTableHeight == 100"
                class="license-full"
              ></div>
              <div v-else class="license"></div>
            </div>
            <div class="icon-box-36">
              <div class="arrow-down"></div>
            </div>
          </div>
          <ul v-if="this.isOptionShow" class="option-list">
            <li
              @click="
                this.mainTableHeight = 100;
                this.isOptionShow = false;
              "
            >
              <div class="icon-box-36">
                <div class="license-full"></div>
              </div>
              <span>Giao diện dọc</span>
            </li>
            <li
              @click="
                this.mainTableHeight = 55;
                this.isOptionShow = false;
              "
            >
              <div class="icon-box-36">
                <div class="license"></div>
              </div>
              <span>Giao diện ngang</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- table-->
    <div class="m-license-main">
      <!-- Table chứng từ -->
      <div
        v-if="this.mainTableHeight != 0"
        class="main-table-container"
        :style="{ height: this.mainTableHeight + '%' }"
      >
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
            <div
              v-if="isMultiSelected"
              style="margin-right: 8px; position: relative"
              class="icon-box-36 tooltip"
              tooltip="Xóa nhiều ghi tăng"
              @click="onClickMultiRemove"
            >
              <div class="remove-red"></div>
            </div>
            <div class="icon-box-36">
              <div
                style="position: relative"
                class="export tooltip"
                tooltip="In"
              ></div>
            </div>
            <div
              style="position: relative"
              class="icon-box-36 tooltip"
              tooltip="Xem thêm"
            >
              <div style="position: relative" class="more-vertical"></div>
            </div>
          </div>
        </div>

        <div
          class="m-license-table"
          ref="MainTable"
          @scroll="
            this.$refs.FooterTable.scrollLeft = this.$refs.MainTable.scrollLeft
          "
        >
          <table class="m-table">
            <thead>
              <tr>
                <th class="w-50" style="padding-left: 16px">
                  <MISACheckbox
                    :checked="isCheckAll"
                    @click="checkAll"
                  ></MISACheckbox>
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
                @click.exact="onRowClick(license, $event, index)"
                @click.ctrl="onCtrlClick(license, index)"
                @click.shift="onShiftClick(index)"
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
                <td class="text-align-left last-td" style="padding-left: 15px">
                  <div class="text-width">
                    {{ license.Description }}
                  </div>
                  <div
                    :class="[
                      { 'm-function-box-show': license.checked },
                      'm-function-box',
                      'last-td-icon',
                    ]"
                    style="display: none"
                  >
                    <div class="icon-box-36 edit-btn">
                      <div
                        class="edit edit-btn tooltip"
                        tooltip="Thêm ghi tăng"
                      ></div>
                    </div>
                    <div class="icon-box-36 remove-btn">
                      <div
                        class="remove-red tooltip remove-btn"
                        tooltip="Xóa ghi tăng"
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="m-license-total"
          ref="FooterTable"
          @scroll="
            this.$refs.MainTable.scrollLeft = this.$refs.FooterTable.scrollLeft
          "
        >
          <div class="total-text">{{ currencyFormat(quantityCost) }}</div>
          <div class="text-width" style="height: 20px; margin-left: 25px"></div>
        </div>

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
      </div>

      <!-- table Chi tiết -->
      <div
        v-if="this.mainTableHeight != 100"
        :class="[
          { 'border-resize': this.mainTableHeight != 0 },
          'm-detail-container',
        ]"
        :style="{ height: 'calc(100% - ' + this.mainTableHeight + '%)' }"
      >
        <div class="detail-header">
          <span> Thông tin chi tiết</span>
          <div class="icon-box-36" @click="zoom">
            <div
              v-if="this.mainTableHeight != 0"
              style="position: relative"
              class="zoom-out tooltip"
              tooltip="Phóng to"
            ></div>
            <div
              v-else
              style="position: relative"
              class="zoom-in tooltip"
              tooltip="Thu nhỏ"
            ></div>
          </div>
        </div>
        <div class="m-detail-table">
          <table class="m-table">
            <thead>
              <tr>
                <th class="text-align-center w-50">STT</th>
                <th class="text-align-left w-150">Mã tài sản</th>
                <th class="text-align-left w-300">Tên tài sản</th>
                <th
                  class="text-align-left"
                  style="min-width: 250px; max-width: 400px"
                >
                  Bộ phận sử dụng
                </th>
                <th class="text-align-right w-200">Nguyên giá</th>
                <th class="text-align-right w-200">Hao mòn năm</th>
                <th class="text-align-right w-150">Giá trị còn lại</th>
              </tr>
            </thead>
            <tbody>
              <MISALoading v-if="isAssetLoading"></MISALoading>
              <tr v-else v-for="(asset, index) in assetData" :key="index">
                <td class="text-align-center w-50">{{ index + 1 }}</td>
                <td class="text-align-left w-150">
                  {{ asset.FixedAssetCode }}
                </td>
                <td class="text-limit text-align-left w-300">
                  {{ asset.FixedAssetName }}
                </td>
                <td
                  class="text-limit text-align-left"
                  style="min-width: 250px; max-width: 400px"
                >
                  {{ asset.DepartmentName }}
                </td>
                <td class="text-align-right w-200">
                  {{ currencyFormat(asset.Cost) }}
                </td>
                <td class="text-align-right w-200">
                  {{ currencyFormat(asset.Accumulated) }}
                </td>
                <td class="text-align-right w-150">
                  {{ currencyFormat(asset.Cost - asset.Accumulated) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- chi tiết chứng từ dialog -->
    <MISALicenseDialog
      :isEditing="isEditing"
      v-if="isLicenseShow"
      @licenseDialogShow="licenseDialogShow"
      @filterLicense="filterLicense"
      @toastShow="toastShow"
      :licenseSelected="licenseSelected"
      :assetData="assetData"
    ></MISALicenseDialog>

    <MISAAlert2
      v-if="alert.isShow"
      :alertType="alert.type"
      @closeAlert="this.alertShow(false)"
      @removeBtn="this.removeLicense"
    >
      <span v-if="this.idToRemove.length > 1"
        ><strong>{{ alert.title }}</strong> chứng từ đã được chọn. Bạn có muốn
        xóa các chứng từ này khỏi danh sách?</span
      >
      <span v-else
        >Bạn có muốn xóa chứng từ có mã <strong>{{ alert.title }}</strong
        >?</span
      >
    </MISAAlert2>

    <MISAToast v-if="toast.isShow" :title="toast.title"></MISAToast>

    <!-- Loading  -->
    <div v-if="isLoading" class="m-dialog">
      <MISALoading></MISALoading>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
  computed: {
    isMultiSelected: function () {
      var count = '';
      this.licenseData.forEach((item) => {
        if (item.checked) count++;
      });
      return count > 1;
    },

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
    //Lấy danh sách chứng từ đã được phân trang:
    await this.filterLicense();
  },

  methods: {
    /**
     * Mô tả : Chức năng phóng to, thu nhỏ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 01:12 19/06/2022
     */
    zoom() {
      this.mainTableHeight = this.mainTableHeight != 0 ? 0 : 55;
    },
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
        const res = await axios.get('Licenses');
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
        const res = await axios.get('Licenses/FilterLicense', {
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

      //Lấy tổng số bản ghi (Không phân trang)
      await this.getAllLicense();
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
    async onRowClick(license, $event, index) {
      // Nếu ấn edit:
      if ($event.target.classList.contains('edit-btn')) {
        this.showEditLicense(license);
      }
      // Nếu ấn xóa (icon xóa):
      else if ($event.target.classList.contains('remove-btn')) {
        // Thêm vào mảng để xóa
        this.idToRemove = [license.LicenseId];
        // Hiển thị cảnh báo
        this.alertShow(true, license.LicenseCode, 'remove');
      }
      // Nếu ấn vào cả dòng:
      else {
        await this.getAsssetList(license, index);
      }
    },

    /**
     * Mô tả : Xử lí sự kiện ctrl click
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:36 20/06/2022
     */
    onCtrlClick(license, index) {
      // Gán lại giá trị index vừa chọn:
      this.prevIndex = index;
      license.checked = !license.checked;
    },

    /**
     * Mô tả : Xử lí sự kiện shift click
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:41 20/06/2022
     */
    onShiftClick(index) {
      if (index > this.prevIndex) {
        var array = this.licenseData.slice(this.prevIndex, index + 1);
        array.forEach((element) => {
          element.checked = true;
        });
      } else {
        var arrayMulti = this.licenseData.slice(index, this.prevIndex);
        arrayMulti.forEach((element) => {
          element.checked = true;
        });
      }
    },

    /**
     * Mô tả : Ấn vào nút xóa nhiều => hiện thị dialog
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:16 20/06/2022
     */
    onClickMultiRemove() {
      this.is;
      // Lọc ra các phần từ đã tích:
      var array = this.licenseData.filter((item) => item.checked == true);
      // Lấy danh sách id:
      this.idToRemove = array.map((item) => item.LicenseId);
      console.log(this.idToRemove);
      // Hiển thị alert:
      var length = '';
      if (this.idToRemove.length < 10) {
        length = `0${this.idToRemove.length}`;
      } else {
        length = this.idToRemove.length;
      }
      this.alertShow(true, length, 'remove');
    },

    /**
     * Mô tả : Xóa 1 chứng từ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:48 17/06/2022
     */
    async removeLicense() {
      this.alertShow(false);
      this.isLoading = true;
      // nếu truyền vào 1 id => Xóa 1 chứng từ
      if (this.idToRemove.length == 1) {
        try {
          const res = await axios.delete(`Licenses/${this.idToRemove[0]}`);
          if (res.status == 200) {
            // Tắt alert
            // Hiển thi toast
            this.toastShow('Xóa dữ liệu thành công');
            this.isLoading = false;
            // Gọi lại API lấy dữ liệu
            this.filterLicense();
          }
        } catch (error) {
          console.log(error.response);
        }
      }
      // Nếu không có id truyền vào => Xóa nhiều chứng từ:
      else {
        try {
          const res = await axios.delete(`Licenses/DeleteMulti`, {
            data: JSON.stringify(this.idToRemove),
            headers: {
              'content-type': 'application/json',
            },
          });
          this.alertShow(false);
          this.toastShow('Xóa chứng từ thành công');
          this.isLoading = false;
          console.log(res.data);
        } catch (error) {
          console.log(error.response.data);
        }
      }
      //Lấy danh sách chứng từ đã được phân trang:
      await this.filterLicense();
      // Gán lại cho asset data về rỗng
      this.assetData = [];
    },

    /**
     * Mô tả : Lấy danh sách tài sản khi click vào bảng ghi tăng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:30 15/06/2022
     */
    async getAsssetList(license, index) {
      // Gỡ tích tất cả:
      this.licenseData.forEach((item) => {
        if (item.LicenseId != license.LicenseId) {
          item.checked = false;
        } else {
          this.prevIndex = index;
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
          this.assetData = [];
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
        var res = await axios.get('Licenses/GetNewCode');
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
        LicenseCode: this.newLicenseCode,
        UseDate: new Date(),
        WriteUpDate: new Date(),
      };
      this.assetData = [];
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
          this.licenseSelected = res.data.License;
          // Gán vào danh sách tài sản để hiên thị lên UI
          this.assetData = res.data.FixedAssetList;
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
      if (value == false) {
        this.assetData = [];
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
     * Mô tả : format ngày tháng năm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:35 13/06/2022
     */
    dateTimeFormat(value) {
      return moment(value).format('DD/MM/YYYY');
    },

    /**
     * Mô tả : Đóng mở/ Hủy bỏ/ kiểu alert
     * @param {Boolean} isShow Ẩn hiện alert (true - hiện, false - ẩn )
     * @param {String} title Nội dung của cảnh báo
     * @param {String} type kiểu của button alert (không tuyền gì hiển thị 1 btn đóng, "remove" - thông báo khi xóa, "cancel"- hủy nhưng không có thay đổi, "cancelchange" - hủy nhưng có thay đổi)
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:08 20/06/2022
     */
    alertShow(isShow, title, type) {
      this.alert.isShow = isShow;
      this.alert.title = title;
      this.alert.type = type;
    },

    /**
     * Mô tả : Hiển thị toast
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:42 20/06/2022
     */
    toastShow(title) {
      this.toast.isShow = true;
      this.toast.title = title;
      setTimeout(() => {
        this.toast.isShow = false;
      }, 3000);
    },

    /**
     * Mô tả : Tích hết
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:57 21/06/2022
     */
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      if (this.isCheckAll == true) {
        this.licenseData.map((item) => (item.checked = true));
      } else {
        this.licenseData.map((item) => (item.checked = false));
      }
    },
  },

  data() {
    return {
      isCheckAll: false,
      prevIndex: null,
      isLoading: false,
      isEditing: false,
      isLicenseShow: false,
      licenseData: [], // danh sách chứng từ gọi từ API
      assetData: [],
      newLicenseCode: '',
      licenseSelected: [],
      time: null,
      // Loading
      isAssetLoading: false,
      isLicnesLoading: false,
      //Tổng số bản ghi
      filterLicenseLength: null, // Tổng số bản ghi theo tìm kiếm
      totalLicenseLength: null, // Tổng số bản ghi chưa phân trang
      // Phân trang
      searchValue: '', // Ô tìm kiếm
      pageIndex: 1,
      pageSize: 20,
      //resize
      mainTableHeight: 55,
      isOptionShow: false,
      //
      toast: {
        title: '',
        isShow: false,
      },
      alert: {
        isShow: false,
        title: '',
        type: '',
      },
      idToRemove: [],
    };
  },
};
</script>
<style></style>
