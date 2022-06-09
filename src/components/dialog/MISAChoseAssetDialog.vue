<template>
  <div class="m-dialog lisence-dialog">
    <div class="m-modal lisence-modal">
      <div
        class="m-modal-title lisence-title"
        style="border-bottom: 1px solid #c7c7c7"
      >
        Chọn tài sản ghi tăng
      </div>
      <div class="m-modal-close">
        <div class="close"></div>
      </div>
      <div class="m-modal-centent chose-asset-content">
        <!-- toolbar -->
        <div class="chose-asset-toolbar">
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
        </div>
        <!-- Bảng -->
        <div class="m-detail-table" style="height: 382px">
          <table class="m-table">
            <thead>
              <tr>
                <th style="padding-left: 16px">
                  <MISACheckbox></MISACheckbox>
                </th>
                <th class="text-align-center max-w-50">STT</th>
                <th class="text-align-left">Mã tài sản</th>
                <th class="text-align-left">Tên tài sản</th>
                <th class="text-align-left">Bộ phận sử dụng</th>
                <th class="text-align-right">Nguyên giá</th>
                <th class="text-align-right">Hao mòn năm</th>
                <th class="text-align-right">Giá trị còn lại</th>
              </tr>
            </thead>
            <MISALoading v-if="isLoading"></MISALoading>
            <tbody v-else>
              <tr
                @click="onRowClick(asset)"
                v-for="(asset, index) in assetData"
                :key="index"
                class="m-tr"
              >
                <td style="padding-left: 16px">
                  <MISACheckbox :checked="asset.checked"></MISACheckbox>
                </td>
                <td class="text-align-center">{{ index + 1 }}</td>
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
        <!-- paging -->
        <div class="lisence-paging">
          <div class="m-total-number">
            Tổng số:
            <strong>{{ this.assetLength }}</strong> bản ghi
          </div>
          <!-- :defaultValue="this.pageSize"
            @onChose="getPageSize" -->
          <MISADropdown></MISADropdown>
          <MISAPaginate
            :pageCount="1"
            :prev-text="'pre'"
            :prev-link-class="'prev-link-class'"
            :next-text="'next'"
            :next-link-class="'next-link-class'"
            :container-class="'m-paging-list'"
            :prev-class="'prev-class'"
          ></MISAPaginate>
          <!-- :click-handler="getPageIndex" -->
        </div>
      </div>
      <div class="m-modal-footer">
        <MISAButton type="outline-button" buttonTitle="Hủy bỏ"></MISAButton>
        <MISAButton buttonTitle="Đồng ý"></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  async beforeMount() {
    this.pageSize = 20;
    await this.filterAsset();
  },
  methods: {
    /**
     * Mô tả : Ấn vào hàng để tích checkbox
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 21:12 09/06/2022
     */
    onRowClick() {},

    /**
     * Mô tả : Lấy về danh sách tài sản đã phân trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 21:12 09/06/2022
     */
    async filterAsset() {
      this.isLoading = true;
      try {
        const res = await axios.get("FixedAssets/Filter", {
          params: {
            FixedAssetFilter: this.searchBox,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          },
        });
        // Thêm trường checkd vào obj
        res.data.FilterList.map((element) => {
          element.checked = false;
        });
        // Gán vào data
        this.assetData = [...res.data.FilterList];
        // Lấy tổng số bản ghi
        this.assetLength = res.data.FilterCount;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      isLoading: false,
      assetLength: 0,
      assetData: [],
      searchBox: "",
    };
  },
};
</script>
<style></style>
