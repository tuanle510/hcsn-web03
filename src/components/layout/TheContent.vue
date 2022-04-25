<template>
  <div class="m-content">
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <div class="toolbar-field">
          <MISASearchbox placeholder="Tìm kiếm tài sản"></MISASearchbox>
        </div>
        <div class="toolbar-field">
          <MISACombobox
            hasIcon="true"
            placeholder="Loại tài sản"
          ></MISACombobox>
        </div>
        <div class="toolbar-field">
          <MISACombobox
            hasIcon="true"
            placeholder="Bộ phận sử dụng"
          ></MISACombobox>
        </div>
      </div>
      <div class="m-toolbar-right">
        <MISAButton
          @click="showAddDialog"
          style="box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16)"
          >+Thêm tài sản</MISAButton
        >
        <div class="toolbar-btn icon-box">
          <div class="excel"></div>
        </div>
        <div class="toolbar-btn icon-box" @click="btnRemove">
          <div class="remove"></div>
        </div>
      </div>
    </div>
    <p style="height: 100%" v-if="isLoading">Loading...</p>
    <div v-else class="m-grip">
      <div class="m-table-container">
        <table class="m-table">
          <thead>
            <tr>
              <th style="width: 50px; padding-left: 16px">
                <MISACheckbox @click="onCheckedAll"></MISACheckbox>
              </th>
              <th class="text-align-left" style="max-width: 50px">STT</th>
              <th class="text-align-left" style="max-width: 80px">
                Mã tài sản
              </th>
              <th class="text-align-left" style="max-width: 130px">
                Tên tài sản
              </th>
              <th class="text-align-left" style="max-width: 150px">
                Loại tài sản
              </th>
              <th class="text-align-left" style="max-width: 200px">
                Bộ phận sử dụng
              </th>
              <th class="text-align-right" style="max-width: 80px">Số lượng</th>
              <th class="text-align-right" style="max-width: 130px">
                Nguyên giá
              </th>
              <th class="text-align-right" style="max-width: 130px">
                HM/KH lũy kế
              </th>
              <th class="text-align-right" style="max-width: 130px">
                Giá trị còn lại
              </th>
              <th class="text-align-center" style="max-width: 80px">
                Chức năng
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              @dblclick="onRowDblClick(product)"
              @click="onRowClick(product)"
              v-for="(product, index) in assetData"
              :key="index"
              class="m-tr"
            >
              <td style="width: 50px; padding-left: 16px">
                <MISACheckbox
                  :checked="chekcedaAssetList.includes(product)"
                  v-on:dblclick.stop="this.$emit(dblclick)"
                ></MISACheckbox>
              </td>
              <td class="text-align-left">{{ product.id }}</td>
              <td class="text-align-left">{{ product.code }}</td>
              <td class="text-align-left">{{ product.name }}</td>
              <td class="text-align-left">{{ product.typeName }}</td>
              <td class="text-align-left">{{ product.partUseName }}</td>
              <td class="text-align-right">{{ product.quantity }}</td>
              <td class="text-align-right">{{ product.price }}</td>
              <td class="text-align-right">{{ product.accumulate }}</td>
              <td class="text-align-right">
                {{ product.price - product.accumulate }}
              </td>
              <td style="width: 80px">
                <div class="m-function-box" style="display: none">
                  <div class="icon-box" v-on:click="btnEditClick">
                    <div class="table-icon edit"></div>
                  </div>
                  <div class="icon-box" v-on:click="btnPriceClick">
                    <div class="table-icon print"></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="6">
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

              <td class="text-align-right">13</td>
              <td class="text-align-right">249.2284.000</td>
              <td class="text-align-right">19.715.000</td>
              <td class="text-align-right">229.2284.000</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <MISADialog
      ref="dialog"
      :dialogTitle="isEditing ? 'Sửa tài sản' : 'Thêm tài sản '"
      v-show="isDialogShow"
      :assetSelected="assetSelected"
      @closeDialog="closeDialog"
      @showSaveToast="showSaveToast"
    ></MISADialog>

    <MISAAlert
      v-if="isDeleteAlertShow"
      :alert="alertTitle"
      :removeAsset="removeAsset"
    >
    </MISAAlert>
    <MISAToast v-show="isDeleteToastShow" title="Xóa dữ liệu thành công">
    </MISAToast>
    <MISAToast
      v-if="isSaveToastShow"
      title="Lưu dữ liệu thành công"
    ></MISAToast>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "the-content",

  /**
   * Mô tả : lấy data từ api
   * @param
   * @return
   * Created by: Lê Thiện Tuấn - MF1118
   * Created date: 15/04/2022
   */
  async beforeMount() {
    this.isLoading = true;
    // Lấy data
    var me = this;
    await axios
      .get("https://62616774327d3896e27b58d2.mockapi.io/api/asset")
      .then(function (res) {
        me.assetData = res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
    this.isLoading = false;
  },

  /**
   * Mô tả : cung cấp method cho component con thực hiện
   * @param
   * @return
   * Created by: Lê Thiện Tuấn - MF1118
   * Created date: 21:55 24/04/2022
   */
  provide() {
    return {
      removeAsset: this.removeAsset,
    };
  },

  methods: {
    /**
     * Bật dialog thêm sản phẩm mới
     * CREATED BY: LTTUAN(19.04.2022)
     */
    showAddDialog() {
      this.isEditing = false;
      this.btnDialog(true);
      //Focus vào input đầu tiên thông qua ref
      this.$refs.dialog.focusFirstInput();
    },
    btnDialog(isShow) {
      this.isDialogShow = isShow;
    },

    /**
     * Đóng dialog và hiển thị cảnh báo
     * 5.15
     */
    closeDialog() {
      // validate: Kiểm tra xem có sự thay đổi không

      // hiển thị cảnh báo có muốn đóng form

      // Đóng form
      this.btnDialog(false);
    },

    /**
     * Mô tả : Chọn tất cả sản phẩm
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 17:42 23/04/2022
     */
    onCheckedAll() {
      //kiểm tra xem có tích hết chưa
      // Nếu chưa chưa thì tích hết
      if (this.chekcedaAssetList.length != this.assetData.length) {
        this.chekcedaAssetList = [...this.assetData];
      }
      // nếu tích hết rồi thì click thứ 2 sẽ bỏ tích đi
      else {
        this.chekcedaAssetList = [];
      }
    },

    /**
     * Mô tả : Click nào dòng thì chọn dòng đấy
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1108
     * Created date: 17:14 23/04/2022
     */
    onRowClick(product) {
      console.log(this.chekcedaAssetList);
      // Kiểm tra xem đã tích sản phẩm trước đó chưa
      if (this.chekcedaAssetList.includes(product)) {
        // Nếu tích r thì bỏ tích
        // Lấy index của sản phẩm được chọn
        const selecedIndex = this.chekcedaAssetList.findIndex(
          (prd) => prd.id == product.id
        );
        // Xóa theo index splice(start, deleteCount)
        this.chekcedaAssetList.splice(selecedIndex, 1);
      } else {
        // Nếu chưa thì add vào list
        this.chekcedaAssetList.push(product);
      }
    },

    /**
     * Gắn dữ liệu từ component Table vào để truyền vào Dialog khi doubleclick
     * CREATED BY: LTTUAN(18.04.2022)
     */
    async onRowDblClick(product) {
      //Lấy dữ liệu từ api theo id của sản phẩm
      var me = this;
      await axios
        .get(
          `https://62616774327d3896e27b58d2.mockapi.io/api/asset/${product.id}`
        )
        .then(function (res) {
          me.assetSelected = res.data;
        })
        .catch(function (err) {
          console.log(err);
        });

      //Hiểm thị form
      this.btnDialog(true);
      this.isEditing = true;

      //focus
      this.$refs.dialog.focusFirstInput();
    },

    /**
     * Xóa dòng đã chọn
     * CREATED BY: LTTUAN(23.04.2022)
     */
    btnRemove() {
      if (this.chekcedaAssetList.length == 0) {
        alert("bạn chưa chọn sản phẩm để xóa");
      } else {
        let length = this.chekcedaAssetList.length;
        // Hiển thị cảnh báo
        this.isDeleteAlertShow = true;
        if (length == 1) {
          this.alertTitle = `Bạn có muốn xóa tài sản ${this.chekcedaAssetList[0].code} - ${this.chekcedaAssetList[0].name}?`;
        } else if (length > 1) {
          if (length < 10) {
            length = `0${length}`;
          }
          this.alertTitle = `${length} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?`;
        }
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
      var me = this;
      // vòng lặp danh sách lưu tạm đã được chọn và xóa
      for (let i = 0; i < this.chekcedaAssetList.length; i++) {
        // Xóa trên api
        await axios
          .delete(
            `https://62616774327d3896e27b58d2.mockapi.io/api/asset/${this.chekcedaAssetList[i].id}`
          )
          .then(function (res) {
            if (res.statusText == "OK") {
              //  Hiển thị toast xóa thành công
              me.isDeleteToastShow = true;
            }
          })
          .catch(function (err) {
            console.log(err);
          });

        // xóa trên giao diện
        const prdIndex = this.assetData.findIndex(
          (prd) => prd.id === this.chekcedaAssetList[i].id
        );
        // Xóa theo index splice(start, deleteCount)
        this.assetData.splice(prdIndex, 1);
      }

      // xóa hết giá trị cho list tạm thời
      this.chekcedaAssetList = [];
      // tắt alert
      this.isDeleteAlertShow = false;
    },

    /**
     *Hiển thị toast messege khi lưu thành công
     4.48
     */
    showSaveToast(isShow) {
      this.isSaveToastShow = isShow;
    },
  },

  data() {
    return {
      isEditing: true,
      isDeleteAlertShow: false,
      isDeleteToastShow: false,
      isSaveToastShow: false,
      alertTitle: "",
      isLoading: false,
      assetSelected: null, //sản phẩm lưu tạm khi bdlClick vào khi lấy về từ API
      chekcedaAssetList: [], // lưu tạm khi click
      isDialogShow: false, //Hiển thị form hay không
      assetData: [], //dữ liệu lấy về từ api
    };
  },
};
</script>
<style></style>
