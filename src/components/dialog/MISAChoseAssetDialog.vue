<template>
  <div class="m-modal license-modal w-950">
    <div
      class="m-modal-title license-title"
      style="border-bottom: 1px solid #c7c7c7"
    >
      Chọn tài sản ghi tăng
    </div>
    <div
      class="m-modal-close icon-box-24 tooltip"
      tooltip="Hủy bỏ"
      @click="onCancel"
    >
      <div class="close"></div>
    </div>
    <div class="m-modal-centent chose-asset-content">
      <!-- toolbar -->
      <div class="chose-asset-toolbar">
        <div class="modal-field search-field">
          <input
            placeholder="Tìm kiếm theo mã, tên tài sản"
            class="m-search"
            ref="searchInput"
            @change="onSearchAsset"
            v-model="searchValue"
          />
          <div class="search-icon">
            <div class="search"></div>
          </div>
        </div>
      </div>
      <!-- Bảng -->
      <div class="m-detail-table" style="height: 425px">
        <table class="m-table">
          <thead>
            <tr>
              <th class="w-40" style="padding-left: 16px">
                <MISACheckbox
                  @click="onCheckedAll"
                  :checked="this.checkedAll"
                ></MISACheckbox>
              </th>
              <th class="text-align-center w-50">STT</th>
              <th class="text-align-left w-110">Mã tài sản</th>
              <th
                class="text-align-left"
                style="width: 170px; max-width: 170px"
              >
                Tên tài sản
              </th>
              <th
                class="text-align-left"
                style="width: 170px; max-width: 170px"
              >
                Bộ phận sử dụng
              </th>
              <th class="text-align-right w-100">Nguyên giá</th>
              <th class="text-align-right w-100">Hao mòn năm</th>
              <th class="text-align-right w-100">Giá trị còn lại</th>
            </tr>
          </thead>
          <MISALoading v-if="isLoading"></MISALoading>
          <tbody v-else>
            <tr
              @click="onRowClick(asset)"
              v-for="(asset, index) in assetData"
              :key="index"
              :class="[{ 'm-tr-seleced': asset.checked }, 'm-tr']"
            >
              <!-- class="m-tr" -->
              <td class="w-40" style="padding-left: 16px">
                <MISACheckbox :checked="asset.checked"></MISACheckbox>
              </td>
              <td class="text-align-center w-50">
                {{ index + 1 }}
              </td>
              <td class="text-align-left w-110">
                {{ asset.FixedAssetCode }}
              </td>
              <td
                class="text-align-left text-limit"
                style="width: 170px; max-width: 170px"
              >
                {{ asset.FixedAssetName }}
              </td>
              <td
                class="text-align-left text-limit"
                style="width: 170px; max-width: 170px"
              >
                {{ asset.DepartmentName }}
              </td>
              <td class="text-align-right w-100">
                {{ currencyFormat(asset.Cost) }}
              </td>
              <td class="text-align-right w-100">
                {{ currencyFormat(asset.Accumulated) }}
              </td>
              <td class="text-align-right w-100">
                {{ currencyFormat(asset.Cost - asset.Accumulated) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- paging -->
      <div class="license-paging">
        <div class="m-total-number">
          Tổng số:
          <strong>{{ this.assetLength }}</strong> bản ghi
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
          :click-handler="getPageIndex"
          v-model="pageIndex"
        ></MISAPaginate>
      </div>
    </div>
    <div class="m-modal-footer">
      <MISAButton
        type="outline-button"
        buttonTitle="Hủy bỏ"
        @click="onCancel"
      ></MISAButton>
      <MISAButton buttonTitle="Đồng ý" @click="onSubmit"></MISAButton>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  props: ["assetList"],

  computed: {
    totalPageIndex: function () {
      return Math.ceil(this.assetLength / this.pageSize);
    },
  },

  async beforeMount() {
    await this.filterAsset();
  },

  mounted() {
    //Focus vào ô đầu tiên
    this.$refs.searchInput.focus();
  },

  methods: {
    /**
     * Mô tả : Tìm kiếm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:32 17/06/2022
     */
    async onSearchAsset() {
      this.pageIndex = 1;
      await this.filterAsset();
    },

    /**
     * Mô tả : Phân trang, tìm kiếm tài sản
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:34 17/06/2022
     */
    async filterAsset() {
      this.isLoading = true;
      // Lấy ra danh sách Id để lọc trên API
      var idList = this.assetList.map((asset) => asset.FixedAssetId);
      try {
        const res = await axios.get("FixedAssets/GetRestAsetList", {
          params: {
            fixedAssetList: idList,
            searchAsset: this.searchValue,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params);
          },
        });
        res.data.List.map((element) => {
          element.checked = false;
        });
        // Gán vào data
        this.assetData = [...res.data.List];
        // Lấy tổng số bản ghi
        this.assetLength = res.data.Count;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Chọn số bản ghi
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 12:26 17/06/2022
     */
    async getPageSize(option) {
      this.pageSize = option;
      this.pageIndex = 1;
      await this.filterAsset();
    },

    /**
     * Mô tả : Chọn số trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 12:27 17/06/2022
     */
    async getPageIndex(pageIndex) {
      this.pageIndex = pageIndex;
      await this.filterAsset();
    },

    /**
     * Mô tả : Chọn tất cả sản phẩm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 17:42 23/04/2022
     */
    onCheckedAll() {
      // 1. Lọc danh sách những tàn sản đã chọn:
      this.checkedaAssetList = this.assetData.filter(
        (asset) => asset.checked == true
      );

      // 2. kiểm tra xem có tích hết chưa
      // Nếu chưa chưa thì tích hết
      if (this.checkedaAssetList.length != this.assetData.length) {
        this.checkedAll = true;
        this.assetData.forEach((asset) => (asset.checked = true));
      }
      // nếu tích hết rồi thì click thứ 2 sẽ bỏ hết tích đi
      else {
        this.checkedAll = false;
        this.assetData.forEach((asset) => (asset.checked = false));
      }
    },

    /**
     * Mô tả : Ấn vào hàng để tích checkbox
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 21:12 09/06/2022
     */
    onRowClick(asset) {
      // 1. Lọc danh sách những tàn sản đã chọn:
      this.checkedaAssetList = this.assetData.filter(
        (asset) => asset.checked == true
      );
      //3. Tích vào ô cần tích:
      if (asset.checked == true) {
        asset.checked = false;
      } else {
        asset.checked = true;
      }
    },

    /**
     * Mô tả : Ấn đồng ý, lấy ra list đã chọn
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:47 09/06/2022
     */
    onSubmit() {
      // 1. Lọc danh sách những tàn sản đã chọn:
      this.checkedaAssetList = this.assetData.filter(
        (asset) => asset.checked == true
      );
      this.$emit("getChoseAsset", this.checkedaAssetList);
    },

    /**
     * Mô tả : Ấn hủy
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:29 10/06/2022
     */
    onCancel() {
      this.$emit("choseAssetDialogShow", false);
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
  },

  data() {
    return {
      isLoading: false,
      assetLength: 0,
      assetData: [],
      checkedaAssetList: [],
      searchBox: "",
      checkedAll: false,

      // Phân trang
      searchValue: "", // Ô tìm kiếm
      pageIndex: 1,
      pageSize: 20,
    };
  },
};
</script>
<style></style>
