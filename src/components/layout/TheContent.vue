<template>
  <div class="m-content">
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <div class="toolbar-field search-field">
          <input
            placeholder="Tìm kiếm tài sản"
            ref="searchInput"
            class="m-search"
            @input="searchInput"
          />
          <div class="search-icon">
            <div class="search"></div>
          </div>
        </div>
        <div class="toolbar-field combobox-field">
          <MISACombobox
            :hasIcon="true"
            :optionList="categoryData"
            @selectItem="filterClick"
            filterby="FixedAssetCategoryName"
            placeholder="Loại tài sản"
            v-model="searchCategory"
          ></MISACombobox>
        </div>

        <div class="toolbar-field combobox-field">
          <MISACombobox
            :hasIcon="true"
            :optionList="departmentData"
            @selectItem="filterClick"
            filterby="DepartmentName"
            placeholder="Bộ phận sử dụng"
            v-model="searchDepartment"
          ></MISACombobox>
        </div>
      </div>
      <div class="m-toolbar-right">
        <MISAButton
          @click="showAddDialog"
          style="box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16)"
          buttonTitle="+Thêm tài sản"
        ></MISAButton>
        <div class="toolbar-btn icon-box">
          <div class="excel"></div>
        </div>
        <div class="toolbar-btn icon-box" @click="btnRemove">
          <div class="remove"></div>
        </div>
      </div>
    </div>

    <div class="m-grip">
      <!-- Table -->
      <div
        class="m-table-container"
        ref="MainTable"
        @scroll="
          this.$refs.FooterTable.scrollLeft = this.$refs.MainTable.scrollLeft
        "
      >
        <table class="m-table">
          <thead>
            <tr>
              <th class="max-w-50" style="padding-left: 16px">
                <MISACheckbox
                  @click="onCheckedAll"
                  :checked="checkedAll"
                ></MISACheckbox>
              </th>
              <th class="text-align-left max-w-50">STT</th>
              <th class="text-align-left max-w-130">Mã tài sản</th>
              <th class="text-align-left max-w-150">Tên tài sản</th>
              <th class="text-align-left max-w-150">Loại tài sản</th>
              <th class="text-align-left max-w-130">Bộ phận sử dụng</th>
              <th class="text-align-right max-w-60">Số lượng</th>
              <th class="text-align-right min-max-w-130">Nguyên giá</th>
              <th class="text-align-right min-max-w-130">HM/KH lũy kế</th>
              <th class="text-align-right min-max-w-130">Giá trị còn lại</th>
              <th class="text-align-center max-w-90">Chức năng</th>
            </tr>
          </thead>
          <div v-if="isLostConnection" class="table-msg">
            Không thể tải được dữ liệu
          </div>
          <MISALoading v-else-if="isLoading"></MISALoading>
          <div v-else-if="this.assetData.length == 0" class="table-msg">
            Không có dữ liệu
          </div>
          <tbody v-else>
            <tr
              @dblclick="showEditDialog(asset)"
              @click="onRowClick(asset, $event)"
              v-for="(asset, index) in assetData"
              :key="index"
              class="m-tr"
            >
              <td style="padding-left: 16px">
                <MISACheckbox
                  :checked="checkedaAssetList.includes(asset)"
                ></MISACheckbox>
              </td>
              <td class="text-align-left">{{ index + 1 }}</td>
              <td class="text-align-left">
                {{ asset.FixedAssetCode }}
              </td>
              <td
                class="text-align-left max-w-150"
                :title="asset.FixedAssetName"
              >
                {{ asset.FixedAssetName }}
              </td>
              <td
                class="text-align-left max-w-150"
                :title="asset.FixedAssetCategoryName"
              >
                {{ asset.FixedAssetCategoryName }}
              </td>
              <td
                class="text-align-left max-w-130"
                :title="asset.DepartmentName"
              >
                {{ asset.DepartmentName }}
              </td>
              <td class="text-align-right">{{ asset.Quantity }}</td>
              <td class="text-align-right">
                {{ currencyFormat(asset.Cost) }}
              </td>
              <td class="text-align-right">
                {{ currencyFormat(asset.Accumulated) }}
              </td>
              <td class="text-align-right">
                {{ currencyFormat(asset.Cost - asset.Accumulated) }}
              </td>
              <td>
                <div class="m-function-box" style="display: none">
                  <div class="icon-box edit">
                    <div class="table-icon edit"></div>
                  </div>
                  <div class="icon-box copy">
                    <div class="table-icon copy"></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- paging -->
      <div
        class="m-table-footer-container"
        ref="FooterTable"
        @scroll="
          this.$refs.MainTable.scrollLeft = this.$refs.FooterTable.scrollLeft
        "
      >
        <table class="m-table-footer">
          <tbody>
            <tr>
              <td style="min-width: 630px">
                <div class="m-paging-left">
                  <div class="m-total-number">
                    Tổng số:
                    <strong>{{ this.totalAssetListLength }}</strong> bản ghi
                  </div>
                  <MISADropdown
                    :defaultValue="this.pageSize"
                    @onChose="getPageSize"
                  ></MISADropdown>
                  <MISAPaginate
                    v-model="pageIndex"
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
              </td>
              <td class="text-align-right max-w-60">
                {{ quantityTotal }}
              </td>
              <td class="text-align-right min-max-w-130">
                {{ currencyFormat(costTotal) }}
              </td>
              <td class="text-align-right min-max-w-130">
                {{ currencyFormat(accumulatedTotal) }}
              </td>
              <td class="text-align-right min-max-w-130">
                {{ currencyFormat(costTotal - accumulatedTotal) }}
              </td>
              <td class="max-w-90"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isDialogLoading" class="m-dialog">
      <MISALoading></MISALoading>
    </div>
    <MISADialog
      ref="dialog"
      :dialogTitle="isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'"
      :isEditing="isEditing"
      v-if="isDialogShow && !isDialogLoading"
      :assetSelected="assetSelected"
      :departmentData="departmentData"
      :categoryData="categoryData"
      @filterAsset="filterAsset"
      @getAssetData="getAssetData"
      @toastShow="toastShow"
      @dialogShow="dialogShow"
      @alertShow="alertShow"
    ></MISADialog>

    <MISAAlert
      v-if="alert.isShow"
      :isCloseOnly="isCloseOnly"
      :isEditing="isEditing"
      :alertTitle="alert.title"
      :alertType="alert.type"
      @onSubmit="onSubmit"
      @removeAsset="removeAsset"
      @dialogShow="dialogShow"
      @alertShow="alertShow"
      @setFocusEmpty="setFocusEmpty"
      @setCloseOnly="setCloseOnly"
    >
    </MISAAlert>
    <MISAToast v-if="toast.isShow" :title="toast.title"> </MISAToast>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import { remove_msg, toast_msg } from "../../assets/resource/ResourceMsg";

export default {
  name: "the-content",

  watch: {
    /**
     * Mô tả : Theo dõi trường search nếu rỗng thì trả về danh sách đầy đủ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:34 06/06/2022
     */
    searchDepartment(newValue) {
      if (newValue == "" || newValue == null) {
        this.filterAsset();
      }
    },

    searchCategory(newValue) {
      if (newValue == "" || newValue == null) {
        this.filterAsset();
      }
    },

    "this.$refs.MainTable.scrollLeft"(newValue) {
      console.log(newValue);
    },
  },

  computed: {
    /**
     * Mô tả : Tính tổng số trang
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:34 22/05/2022
     */
    totalPageIndex: function () {
      return Math.ceil(this.assetLength / this.pageSize);
    },
    /**
     * Mô tả : Giá trị ô check all
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:17 29/04/2022
     */
    checkedAll: function () {
      if (
        this.assetData.length == this.checkedaAssetList.length &&
        this.checkedaAssetList != 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Mô tả : Tính tổng số lượng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:12 26/04/2022
     */
    quantityTotal: function () {
      const quantityTotal = this.assetData.reduce((currentValue, item) => {
        return currentValue + Number(item.Quantity);
      }, 0);
      return quantityTotal;
    },

    /**
     * Mô tả : Tính tổng giá tiền
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:56 19/05/2022
     */
    costTotal: function () {
      const costTotal = this.assetData.reduce((currentValue, item) => {
        return currentValue + Number(item.Cost);
      }, 0);
      return costTotal;
    },

    /**
     * Mô tả : Tính giá trị lũy kế
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:56 19/05/2022
     */
    accumulatedTotal: function () {
      const accumulatedTotal = this.assetData.reduce((currentValue, item) => {
        return currentValue + Number(item.Accumulated);
      }, 0);
      return accumulatedTotal;
    },
  },

  async beforeMount() {
    this.pageSize = 20;
    // Lấy dữ liệu đã phân trang từ api
    await this.filterAsset();

    // Lấy tổng số bản ghi:
    await this.getAssetData();

    /**
     * Mô tả : Lấy dữ liệu Department
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:01 27/04/2022
     */
    try {
      const res = await axios.get("Departments");
      this.departmentData = res.data;
    } catch (error) {
      console.log(error);
    }

    /**
     * Mô tả : Lấy dữ liệu Category
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 13:33 29/04/2022
     */
    try {
      const res = await axios.get("FixedAssetCategories");
      this.categoryData = res.data;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    /**
     * Mô tả : Focus vào ô trống đầu tiên
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:42 06/06/2022
     */
    setFocusEmpty() {
      this.$refs.dialog.setFocusEmpty();
    },
    /**
     * Mô tả : Chọn combobox thì gọi lại api để filter
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:32 22/05/2022
     */
    filterClick() {
      this.pageIndex = 1;
      this.filterAsset();
    },

    /**
     * Mô tả : gán dữ liệu pageSize từ dropdown
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:38 22/05/2022
     */
    async getPageSize(option) {
      this.pageSize = option;
      this.pageIndex = 1;
      await this.filterAsset();
    },

    /**
     * Mô tả : Lấy thông tin trang từ paging
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 23:44 21/05/2022
     */
    async getPageIndex(pageNum) {
      this.pageIndex = pageNum;
      // thực hiện filter theo pageIndex
      await this.filterAsset();
    },
    /**
     * Mô tả : Debounce để search
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:32 21/05/2022
     */
    async searchInput() {
      clearTimeout(this.searchTimeout);
      // Lấy giá trị input
      this.searchBox = this.$refs.searchInput.value;
      // debount
      this.searchTimeout = setTimeout(this.filterAsset, 1000);
    },

    /**
     * Mô tả : Hàm gửi dữ liệu lên api để search
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:06 22/05/2022
     */
    async filterAsset() {
      this.isLoading = true;
      try {
        const res = await axios.get("FixedAssets/Filter", {
          params: {
            FixedAssetFilter: this.searchBox,
            FixedAssetCategoryName: this.searchCategory,
            DepartmentName: this.searchDepartment,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          },
        });
        this.assetData = res.data.FilterList;
        this.assetLength = res.data.FilterCount;
        this.isLoading = false;
      } catch (error) {
        this.isLostConnection = true;
        this.isLoading = false;
      }
    },
    /**
     * Mô tả : lấy danh sách asset Data từ api ( Để lấy tổng số bản ghi )
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:02 08/05/2022
     */
    async getAssetData() {
      try {
        const res = await axios.get("FixedAssets");
        this.totalAssetListLength = res.data.length;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : format tiền ttrong bảng
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 09:55 01/05/2022
     */
    currencyFormat(value) {
      var format = `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      return format;
    },

    /**
     * Mô tả :  Lấy mã mới
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:52 13/05/2022
     */
    async getNewAssetCode() {
      this.isDialogLoading = true;
      try {
        var res = await axios.get("FixedAssets/NewFixedAssetCode");
        // Gán dữ liệu trả về vào asset Code mới
        this.newAssetCode = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Bật dialog thêm sản phẩm mới
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * CREATED BY: LTTUAN(19.04.2022)
     */
    async showAddDialog() {
      await this.getNewAssetCode();
      // console.log(this.assetSelected);
      this.assetSelected = {
        FixedAssetCode: this.newAssetCode,
        Cost: 0,
        DepreciationRate: 0,
        DepreciationValue: 0,
        Quantity: 0,
        PurchaseDate: new Date(),
        UseDate: new Date(),
      };
      this.dialogShow(true);
      this.isEditing = false;
    },

    /**
     * Mô tả : Xóa asset, lấy func từ dialog truyền vào alert
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 20:59 26/04/2022
     */
    onSubmit() {
      this.isEditing = true;
      this.$refs.dialog.onSubmit();
    },

    /**
     * Mô tả : Chọn tất cả sản phẩm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 17:42 23/04/2022
     */
    onCheckedAll() {
      //  Kiểm tra xem assetData có dữ liệu không
      if (this.assetData == 0) {
        this.alertShow(true, remove_msg.ASSET_LIST_EMPTY);
      } else {
        //kiểm tra xem có tích hết chưa
        // Nếu chưa chưa thì tích hết
        if (this.checkedaAssetList.length != this.assetData.length) {
          // thay đổi
          this.checkedaAssetList = [...this.assetData];
        }
        // nếu tích hết rồi thì click thứ 2 sẽ bỏ hết tích đi
        else {
          this.checkedaAssetList = [];
        }
      }
    },

    /**
     * Mô tả : Click nào dòng thì chọn dòng đấy
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1108
     * Created date: 17:14 23/04/2022
     */
    onRowClick(asset, $event) {
      //Nếu ấn vào edit
      if ($event.target.classList.contains("edit")) {
        this.showEditDialog(asset);
      }
      // Nếu ấn vào copy
      else if ($event.target.classList.contains("copy")) {
        this.showCloneDialog(asset.FixedAssetId);
      }
      // Nếu ấn vào cả dòng
      else {
        // const rowClick = () => {
        // Kiểm tra xem đã tích sản phẩm trước đó chưa
        if (this.checkedaAssetList.includes(asset)) {
          // Nếu tích r thì bỏ tích
          // Lấy index của sản phẩm được chọn
          const selecedIndex = this.checkedaAssetList.findIndex(
            (prd) => prd.FixedAssetId == asset.FixedAssetId
          );
          // Xóa theo index splice(start, deleteCount)
          this.checkedaAssetList.splice(selecedIndex, 1);
        } else {
          // Nếu chưa thì add vào list
          this.checkedaAssetList.push(asset);
        }
        // };

        // debount 0.5 giây mới thực hiện ( Tránh trường hợp dbCLick )
        // clearTimeout(this.clickTimeout);
        // this.clickTimeout = setTimeout(rowClick, 200);
      }
    },

    /**
     * Mô tả : Hiển thị bảng nhân bản
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 13:03 19/05/2022
     */
    async showCloneDialog(assetId) {
      // Lấy mã mới
      await this.getNewAssetCode();
      // Lấy dữ liệu theo Id
      await this.getAssetById(assetId);
      // Gán newcode vào dữ liệu của dòng đã chọn
      this.assetSelected.FixedAssetCode = this.newAssetCode;
      // Hiện thị dialog
      this.isEditing = false;
      this.dialogShow(true);
    },

    /**
     * Mô tả : Lấy dữ liệu theo Id
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 13:39 19/05/2022
     */
    async getAssetById(assetId) {
      this.isDialogLoading = true;
      try {
        const res = await axios.get(`FixedAssets/${assetId}`);
        this.assetSelected = res.data;
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Gắn dữ liệu từ component Table vào để truyền vào Dialog khi doubleclick
     * CREATED BY: LTTUAN(18.04.2022)
     */
    async showEditDialog(asset) {
      // clearTimeout(this.clickTimeout);
      this.isEditing = true;
      await this.getAssetById(asset.FixedAssetId);
      //Hiểm thị form
      this.dialogShow(true);
    },

    /**
     * Mô tả : Xóa dòng đã chọn
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 20:28 23/04/2022
     */
    btnRemove() {
      this.setCloseOnly(true);
      if (this.checkedaAssetList.length == 0) {
        this.alertShow(true, remove_msg.ASSET_REMOVE_EMPTY);
        // alert("bạn chưa chọn sản phẩm để xóa");
      } else {
        var length = this.checkedaAssetList.length;
        var title = "";
        // hiển thị title cảnh báo
        if (length == 1) {
          title = `${remove_msg.ASSET_REMOVE} ${this.checkedaAssetList[0].FixedAssetCode} - ${this.checkedaAssetList[0].FixedAssetName}?`;
        } else if (length > 1 && length < 10) {
          title = `0${length} ${remove_msg.ASSETS_REMOVE}`;
        } else {
          title = `${length} ${remove_msg.ASSETS_REMOVE}`;
        }
        this.alertShow(true, title, "remove");
      }
    },

    /**
     * Mô tả : Xóa sản phẩm đã thêm vào danh sách lưu tạm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:23 24/04/2022
     */
    async removeAsset() {
      // Khởi tạo mảng id cần xóa
      var idList = [];
      // Thêm id vào mảng
      this.checkedaAssetList.forEach((element) => {
        idList.push(element.FixedAssetId);
      });
      // Gửi lên API
      try {
        const res = await axios.delete(`FixedAssets/DeleteMulti`, {
          data: JSON.stringify(idList),
          headers: {
            "content-type": "application/json",
          },
        });
        // Load lại bảng
        this.filterAsset();

        // Cập nhật lại tổng bản ghi
        this.getAssetData();

        //  Hiển thị toast xóa thành công
        this.toastShow(toast_msg.REMOVE_SUCESS);

        // gán lại giá trị cho list tạm thời về rỗng
        this.checkedaAssetList = [];
        // Tắt alert
        this.alertShow(false);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Đóng mở dialog
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 14:29 19/04/2022
     */
    dialogShow(isShow) {
      this.isDialogShow = isShow;
      this.isDialogLoading = false;
    },

    /**
     * Mô tả : Set trạng thái cho alert 1 nút
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:34 30/05/2022
     */
    setCloseOnly(value) {
      this.isCloseOnly = value;
    },

    /**
     * Mô tả : Đóng mở/ Hủy bỏ/ kiểu alert
     * @param {Boolean} alert Ẩn hiện alert (true - hiện, false - ẩn )
     * @param {String} title Nội dung của cảnh báo
     * @param {String} type kiểu của button alert (không tuyền gì hiển thị 1 btn đóng, "remove" - thông báo khi xóa, "cancel"- hủy nhưng không có thay đổi, "cancelchange" - hủy nhưng có thay đổi)
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:08 26/04/2022
     */
    alertShow(alert, title, type) {
      this.alert.isShow = alert;
      this.alert.title = title;
      this.alert.type = type;
    },

    /**
     * Mô tả : Hiển thị toast
     * @param {Boolean} toast
     * @param {String} title
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 13:56 26/04/2022
     */
    toastShow(title) {
      this.toast.isShow = true;
      this.toast.title = title;
      setTimeout(() => {
        this.toast.isShow = false;
      }, 3000);
    },
  },

  data() {
    return {
      isDialogLoading: false,
      isEditing: null,
      isCloseOnly: false,
      toast: {
        title: "",
        isShow: false,
      },
      alert: {
        title: "",
        isShow: false,
        type: "",
      },
      assetSelected: {}, //sản phẩm lưu tạm khi bdlClick vào khi lấy về từ API
      checkedaAssetList: [], // lưu tạm khi click
      isLoading: false,
      isDialogShow: false, //Hiển thị form hay không
      assetData: [], //dữ liệu lấy về từ api
      departmentData: [], //Dữ liệu bộ phận sử dụng
      categoryData: [], // Dữ liệu loại tài sản
      newAssetCode: "",
      searchTimeout: null,
      clickTimeout: null,
      assetLength: null,
      totalAssetListLength: null,
      isLostConnection: false, // mấy mạng thì trả về true
      // params chuyền qua queryString
      searchCategory: null,
      searchDepartment: null,
      searchBox: null,
      pageIndex: null,
      pageSize: null,
      scrollBar: null,
    };
  },
};
</script>
<style></style>
