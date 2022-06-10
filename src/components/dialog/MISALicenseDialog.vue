<template>
  <div class="m-dialog license-dialog">
    <div class="m-modal license-modal w-950">
      <div class="m-modal-title license-title">Thêm chứng từ ghi tăng</div>
      <div class="m-modal-close" @click="onCancel">
        <div class="close"></div>
      </div>

      <div class="m-modal-centent license-modal-content">
        <!-- Thông tin chứng từ -->
        <div class="center-title">Thông tin chứng từ</div>
        <form class="edit-asset-form" autocomplete="off" ref="form">
          <div class="modal-row">
            <div class="modal-field">
              <label>Mã chứng từ <span>*</span></label>
              <MISAInput ref="licenseInput" :required="true"></MISAInput>
            </div>
            <div class="modal-field">
              <label>Ngày bắt đầu sử dụng <span>*</span></label>
              <MISADatepicker :required="true"></MISADatepicker>
            </div>
            <div class="modal-field">
              <label>Ngày ghi tăng <span>*</span></label>
              <MISADatepicker :required="true"></MISADatepicker>
            </div>
          </div>
          <div class="modal-row" style="margin-bottom: 0">
            <div class="modal-field modal-field-full">
              <label>Ghi chú</label>
              <MISAInput></MISAInput>
            </div>
          </div>
        </form>

        <!-- Thông tin chi tiết -->
        <div class="center-title">Thông tin chi tiết</div>
        <div class="lesence-detail">
          <!-- toolbar -->
          <div class="license-table-toolbar">
            <div class="modal-field search-field">
              <input
                placeholder="Tìm kiếm theo mã, tên tài sản"
                ref="searchInput"
                class="m-search"
                @input="searchInput"
              />
              <div class="search-icon">
                <div class="search"></div>
              </div>
            </div>
            <MISAButton
              style="width: 120px"
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
                  <th class="text-align-left" style="width: 100px">
                    Mã tài sản
                  </th>
                  <th class="text-align-left" style="width: 170px">
                    Tên tài sản
                  </th>
                  <th class="text-align-left" style="width: 180px">
                    Bộ phận sử dụng
                  </th>
                  <th class="text-align-right" style="width: 140px">
                    Nguyên giá
                  </th>
                  <th class="text-align-right" style="width: 140px">
                    Hao mòn năm
                  </th>
                  <th class="text-align-right">Giá trị còn lại</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(asset, index) in assetList"
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
                  <th class="text-align-right" style="width: 140px">
                    Nguyên giá
                  </th>
                  <th class="text-align-right" style="width: 140px">
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
              <strong>31</strong> bản ghi
            </div>
            <MISADropdown></MISADropdown>
            <!-- :defaultValue="this.pageSize"
              @onChose="getPageSize" -->
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
      </div>

      <div class="m-modal-footer">
        <MISAButton
          type="outline-button"
          buttonTitle="Hủy"
          @click="onCancel"
        ></MISAButton>
        <MISAButton buttonTitle="Lưu"></MISAButton>
      </div>

      <!-- Sửa tàn sản dialog -->
      <MISAEditAssetDialog
        v-if="isEditAssetShow"
        @editAssetDialogShow="editAssetDialogShow"
      ></MISAEditAssetDialog>
    </div>
    <!-- Chọn tài sản thêm vào dialog -->
    <MISAChoseAssetDialog
      v-if="isChoseAssetShow"
      @getChoseAsset="getChoseAsset"
      @choseAssetDialogShow="choseAssetDialogShow"
    ></MISAChoseAssetDialog>
  </div>
</template>
<script>
export default {
  props: ["choseAssetList"],

  mounted() {
    // focus vào ô đầu tiên
    this.$refs.licenseInput.setFocus();
  },

  methods: {
    /**
     * Mô tả : Nhận danh sách đã chọn từ ChoseAssetDialog
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:51 09/06/2022
     */
    getChoseAsset(list) {
      this.assetList = list;
      this.choseAssetDialogShow(false);
    },

    /**
     * Mô tả : Mở form chọn tài sản
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:02 10/06/2022
     */
    showAddAsset() {
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
      var format = `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      return format;
    },

    onDbClick(asset) {
      this.editAssetDialogShow(true);
    },

    /**
     * Mô tả : Ấn nút hủy
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:33 10/06/2022
     */
    onCancel() {
      this.$emit("licenseDialogShow", false);
    },
  },

  data() {
    return {
      isChoseAssetShow: false,
      isEditAssetShow: false,
      assetList: [],
    };
  },
};
</script>
<style></style>
