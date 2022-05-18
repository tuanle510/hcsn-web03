<template>
  <div class="m-content">
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <div class="toolbar-field">
          <MISASearchbox placeholder="Tìm kiếm tài sản"></MISASearchbox>
        </div>
        <div class="toolbar-field">
          <!-- <ejs-combobox placeholder="Loại tài sản"></ejs-combobox> -->
          <MISACombobox
            :hasIcon="true"
            :optionList="categoryData"
            filterby="FixedAssetCategoryName"
            placeholder="Loại tài sản"
            v-model="searchCategory"
          ></MISACombobox>
        </div>

        <div class="toolbar-field">
          <!-- <ejs-combobox placeholder="Bộ phận sử dụng"></ejs-combobox> -->
          <MISACombobox
            :hasIcon="true"
            :optionList="departmentData"
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

    <!-- Table -->
    <div class="m-grip">
      <div class="m-table-container">
        <table class="m-table">
          <thead>
            <tr>
              <th style="width: 50px; padding-left: 16px">
                <MISACheckbox
                  @click="onCheckedAll"
                  :checked="checked"
                ></MISACheckbox>
              </th>
              <th class="text-align-left" style="width: 40px">STT</th>
              <th class="text-align-left" style="width: 130px">Mã tài sản</th>
              <th class="text-align-left" style="width: 130px">Tên tài sản</th>
              <th class="text-align-left" style="width: 130px">Loại tài sản</th>
              <th class="text-align-left" style="width: 130px">
                Bộ phận sử dụng
              </th>
              <th class="text-align-right" style="width: 60px">Số lượng</th>
              <th class="text-align-right" style="width: 130px">Nguyên giá</th>
              <th class="text-align-right" style="width: 130px">
                HM/KH lũy kế
              </th>
              <th class="text-align-right" style="width: 130px">
                Giá trị còn lại
              </th>
              <th class="text-align-center" style="width: 80px">Chức năng</th>
            </tr>
          </thead>
          <!-- Loading -->
          <!-- <p style="height: 100%" v-if="isLoading">Loading...</p> -->
          <!-- <MISALoading v-if="isLoading"></MISALoading> -->
          <!-- Data -->
          <tbody>
            <tr
              @dblclick="showEditDialog(asset)"
              @click="onRowClick(asset, $event)"
              v-for="(asset, index) in assetData"
              :key="index"
              class="m-tr"
            >
              <td style="width: 50px; padding-left: 16px">
                <MISACheckbox
                  :checked="checkedaAssetList.includes(asset)"
                ></MISACheckbox>
              </td>
              <td class="text-align-left">{{ index + 1 }}</td>
              <td class="text-align-left text-limit">
                {{ asset.FixedAssetCode }}
              </td>
              <td
                class="text-align-left text-limit"
                :title="asset.FixedAssetName"
              >
                {{ asset.FixedAssetName }}
              </td>
              <td
                class="text-align-left text-limit"
                :title="asset.FixedAssetCategoryName"
              >
                {{ asset.FixedAssetCategoryName }}
              </td>
              <td
                class="text-align-left text-limit"
                :title="asset.DepartmentName"
              >
                {{ asset.DepartmentName }}
              </td>
              <td class="text-align-right">{{ asset.Quantity }}</td>
              <td class="text-align-right">
                {{ currencyFormat(asset.Cost) }}
              </td>
              <td class="text-align-right">
                {{
                  currencyFormat(
                    asset.Cost * asset.DepreciationRate * asset.LifeTime
                  )
                }}
              </td>
              <td class="text-align-right">
                {{
                  currencyFormat(
                    asset.Cost -
                      asset.Cost * asset.DepreciationRate * asset.LifeTime
                  )
                }}
              </td>
              <td style="width: 80px">
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

          <tfoot>
            <tr>
              <td style="width: 50px; padding-left: 16px">
                <MISACheckbox
                  @click="onCheckedAll"
                  :checked="checked"
                ></MISACheckbox>
              </td>
              <td class="text-align-left" style="width: 40px">STT</td>
              <td class="text-align-left" style="width: 130px">Mã tài sản</td>
              <td class="text-align-left" style="width: 130px">Tên tài sản</td>
              <td class="text-align-left" style="width: 130px">Loại tài sản</td>
              <td class="text-align-left" style="width: 130px">
                Bộ phận sử dụng
              </td>
              <td class="text-align-right" style="width: 60px">Số lượng</td>
              <td class="text-align-right" style="width: 130px">Nguyên giá</td>
              <td class="text-align-right" style="width: 130px">
                HM/KH lũy kế
              </td>
              <td class="text-align-right" style="width: 130px">
                Giá trị còn lại
              </td>
              <td class="text-align-center" style="width: 80px">Chức năng</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <!-- paging -->
      <!-- <table class="m-table-footer">
        <tbody>
          <tr>
            <td style="width: 610px">
              <div class="m-paging-left">
                <div class="m-total-number">
                  Tổng số: <strong>200</strong> bản ghi
                </div>
                <div class="m-dropdown-paging">
                  20
                  <div class="down"></div>
                </div>
                <div class="m-paging-list">
                  <button class="m-page-control">
                    <div class="pre"></div>
                  </button>
                  <div class="m-paging-group">
                    <button class="m-number m-number-selected">1</button>
                    <button class="m-number">2</button>
                    <div class="m-number-more">
                      <div class="more"></div>
                    </div>
                    <button class="m-number">10</button>
                  </div>
                  <button class="m-page-control">
                    <div class="next"></div>
                  </button>
                </div>
              </div>
            </td>
            <td class="text-align-right" style="width: 60px">
              {{ quantityTotal }}
            </td>
            <td class="text-align-right" style="width: 130px">
              {{ currencyFormat(costTotal) }}
            </td>
            <td class="text-align-right" style="width: 130px">
              {{ currencyFormat(accumulatedTotal) }}
            </td>
            <td class="text-align-right" style="width: 130px">
              {{ currencyFormat(costTotal - accumulatedTotal) }}
            </td>
            <td style="width: 80px"></td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <MISADialog
      ref="dialog"
      :dialogTitle="isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'"
      :isEditing="isEditing"
      v-if="isDialogShow"
      :assetCodes="assetCodes"
      :assetSelected="assetSelected"
      :departmentData="departmentData"
      :categoryData="categoryData"
      @getAssetData="getAssetData"
      @toastShow="toastShow"
      @dialogShow="dialogShow"
      @alertShow="alertShow"
    ></MISADialog>

    <MISAAlert
      v-if="alert.isShow"
      :isEditing="isEditing"
      :alertTitle="alert.title"
      :alertType="alert.type"
      @onSubmit="onSubmit"
      @removeAsset="removeAsset"
      @dialogShow="dialogShow"
      @alertShow="alertShow"
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

  computed: {
    /**
     * Mô tả : Giá trị ô check all
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:17 29/04/2022
     */
    checked: function () {
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
    costTotal: function () {
      const costTotal = this.assetData.reduce((currentValue, item) => {
        return currentValue + Number(item.Cost);
      }, 0);
      return costTotal;
    },
    accumulatedTotal: function () {
      const accumulatedTotal = this.assetData.reduce((currentValue, item) => {
        return (
          currentValue +
          Number(item.Cost * item.DepreciationRate * item.LifeTime)
        );
      }, 0);
      return accumulatedTotal;
    },
  },

  async beforeMount() {
    // lấy asset data từ api
    this.getAssetData();

    /**
     * Mô tả : Lấy dữ liệu Department
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:01 27/04/2022
     */
    try {
      const res = await axios.get("http://localhost:5234/api/v1/Departments");
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
      const res = await axios.get(
        "http://localhost:5234/api/v1/FixedAssetCategories"
      );
      this.categoryData = res.data;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    /**
     * Mô tả : lấy danh sách asset Data từ api
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:02 08/05/2022
     */
    async getAssetData() {
      this.isLoading = true;
      try {
        const res = await axios.get("http://localhost:5234/api/v1/FixedAssets");
        this.assetData = res.data;
        this.isLoading = false;
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
      var formatter = new Intl.NumberFormat("vi-VN", {
        currency: "VND",
      });
      return formatter.format(value);
    },

    /**
     * Mô tả :  Lấy mã mới
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:52 13/05/2022
     */
    async getNewAssetCode() {
      try {
        var res = await axios.get(
          "http://localhost:5234/api/v1/FixedAssets/NewFixedAssetCode"
        );
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
      this.assetSelected = {
        FixedAssetCode: this.newAssetCode,
        Cost: 0,
        DepreciationRate: 0,
        Quantity: 0,
        PurchaseDate: new Date(),
      };
      this.isEditing = false;
      this.dialogShow(true);
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
        this.alertShow(true, "Không có tài sản trong danh sách");
      } else {
        //kiểm tra xem có tích hết chưa
        // Nếu chưa chưa thì tích hết
        if (this.checkedaAssetList.length != this.assetData.length) {
          // thay đổi
          this.checkedaAssetList = [...this.assetData];
        }
        // nếu tích hết rồi thì click thứ 2 sẽ bỏ tích đi
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
        console.log("Nhận đôi");
      }
      // Nếu ấn vào cả dòng
      else {
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
      }
    },

    /**
     * Gắn dữ liệu từ component Table vào để truyền vào Dialog khi doubleclick
     * CREATED BY: LTTUAN(18.04.2022)
     */
    async showEditDialog(asset) {
      this.isEditing = true;
      try {
        const res = await axios.get(
          `http://localhost:5234/api/v1/FixedAssets/${asset.FixedAssetId}`
        );
        this.assetSelected = res.data;
      } catch (error) {
        console.error(error);
      }
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
      // vòng lặp danh sách lưu tạm đã được chọn và xóa
      for (let i = 0; i < this.checkedaAssetList.length; i++) {
        try {
          const res = await axios.delete(
            `http://localhost:5234/api/v1/FixedAssets/${this.checkedaAssetList[i].FixedAssetId}`
          );

          // Load lại bảng
          this.getAssetData();

          //  Hiển thị toast xóa thành công
          this.toastShow(true, toast_msg.REMOVE_SUCESS);
          setTimeout(() => {
            this.toastShow(false);
          }, 2300);

          // gán lại giá trị cho list tạm thời về rỗng
          this.checkedaAssetList = [];

          // Tắt alert
          this.alertShow(false);
        } catch (error) {
          console.log(error);
        }
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
    },

    /**
     * Mô tả : Đóng mở/ Hủy bỏ/ kiểu alert
     * @param {Boolean} alert
     * @param {String} title
     * @param {String} type kiểu của button alert
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
    toastShow(isShow, title) {
      this.toast.isShow = isShow;
      this.toast.title = title;
    },
  },

  data() {
    return {
      isEditing: null,
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
      assetCodes: null, //Danh sách mã tài sản
      departmentData: [], //Dữ liệu bộ phận sử dụng
      categoryData: [], // Dữ liệu loại tài sản
      searchCategory: "",
      searchDepartment: "",
      newAssetCode: "",
    };
  },
};
</script>
<style></style>
