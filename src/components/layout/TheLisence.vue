<template>
  <div class="m-content m-lisence">
    <!-- toolbar -->
    <div class="m-lisence-toolbar">
      <div class="l-toolbar-left"><p>Ghi tăng tài sản</p></div>
      <div class="l-toolbar-right">
        <MISAButton buttonTitle="Thêm"></MISAButton>
        <div class="l-icon-container">
          <div class="icon-box-36">
            <div class="lisence"></div>
          </div>
          <div class="icon-box-36">
            <div class="arrow-down"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- table-->
    <div class="m-lisence-main">
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
        <div class="m-lisence-table">
          <table class="m-table">
            <thead>
              <tr>
                <th class="max-w-50" style="padding-left: 16px">
                  <MISACheckbox></MISACheckbox>
                </th>
                <th class="text-align-center max-w-50">STT</th>
                <th class="text-align-left max-w-130">Số chứng từ</th>
                <th class="text-align-center" style="width: 130px">
                  Ngày chứng từ
                </th>
                <th class="text-align-center" style="width: 130px">
                  Ngày ghi tăng
                </th>
                <th class="text-align-right" style="width: 130px">
                  Tổng nguyên giá
                </th>
                <th class="text-align-left">Nội dung</th>
              </tr>
            </thead>
            <tbody>
              <tr class="m-tr" @dblclick="showEditLisence">
                <td style="width: 50px">
                  <MISACheckbox></MISACheckbox>
                </td>
                <td class="text-align-center" style="width: 100px">STT</td>
                <td class="text-align-left" style="width: 100px">
                  Số chứng từ
                </td>
                <td class="text-align-center" style="width: 100px">
                  Ngày chứng từ
                </td>
                <td class="text-align-center" style="width: 100px">
                  Ngày ghi tăng
                </td>
                <td class="text-align-right" style="width: 100px">
                  Tổng nguyên giá
                </td>
                <td class="text-align-left" style="position: relative">
                  <span>Nội dung</span>
                  <div class="m-function-box" style="display: none">
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
        <div class="m-lisence-total">
          <div class="total-text">305.845.345</div>
        </div>
        <div class="lisence-paging">
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
                  <th class="text-align-center max-w-50">STT</th>
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

    <!-- lisence dialog -->
    <MISALisenceDialog
      v-if="isLisenceShow"
      @lisenceDialogShow="lisenceDialogShow"
      @choseAssetDialogShow="choseAssetDialogShow"
    ></MISALisenceDialog>
    <MISAChoseAssetDialog v-if="isChoseShow"></MISAChoseAssetDialog>

    <!-- detail lisence dialog -->
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * Mô tả : HIển thị lisence dialog sửa
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:35 08/06/2022
     */
    showEditLisence() {
      this.lisenceDialogShow(true);
    },

    // Tắt mở lisence dialog
    lisenceDialogShow(value) {
      this.isLisenceShow = value;
    },

    // Tắt mở chose dialog
    choseAssetDialogShow(value) {
      this.isChoseShow = value;
    },
  },

  data() {
    return {
      isLisenceShow: false,
      isChoseShow: false,
    };
  },
};
</script>
<style></style>
