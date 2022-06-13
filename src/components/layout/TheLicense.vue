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
            <div class="more"></div>
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
                <th class="text-align-left text-width">Nội dung</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(license, index) in licenseData"
                :key="index"
                class="m-tr"
                @dblclick="showEditLicense(license)"
              >
                <td style="padding-left: 16px">
                  <MISACheckbox></MISACheckbox>
                </td>
                <td class="text-align-center w-50">{{ index + 1 }}</td>
                <td class="text-align-left w-150">{{ license.LicenseCode }}</td>
                <td class="text-align-center w-130">
                  {{ dateTimeFormat(license.UseDate) }}
                </td>
                <td class="text-align-center w-130">
                  {{ dateTimeFormat(license.WriteUpDate) }}
                </td>
                <td class="text-align-right w-150">{{ license.Total }}</td>
                <td class="text-align-left text-width last-td">
                  {{ license.Description }}
                  <div
                    class="m-function-box last-td-icon"
                    style="display: none"
                  >
                    <div class="icon-box-36">
                      <div class="edit"></div>
                    </div>
                    <div class="icon-box-36">
                      <div class="remove-red"></div>
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
                <tr>
                  <td class="text-align-center">STT</td>
                  <td class="text-align-left">Mã tài sản</td>
                  <td class="text-align-left">Tên tài sản</td>
                  <td class="text-align-left">Bộ phận sử dụng</td>
                  <td class="text-align-right">Nguyên giá</td>
                  <td class="text-align-right">Hao mòn năm</td>
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
      v-if="isLicenseShow"
      @licenseDialogShow="licenseDialogShow"
    ></MISALicenseDialog>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  async beforeMount() {
    const res = await await axios.get("Licenses");
    this.licenseData = res.data;
  },

  methods: {
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
    /**
     * Mô tả : Hiển thị form thêm mới chứng từ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:36 10/06/2022
     */
    showAddLicense() {
      this.licenseDialogShow(true);
    },

    /**
     * Mô tả : HIển thị form sửa chứng từ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:35 08/06/2022
     */
    showEditLicense(license) {
      console.log(license);
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
  },

  data() {
    return {
      isLicenseShow: false,
      licenseData: [], // danh sách chứng từ gọi từ API
    };
  },
};
</script>
<style></style>
