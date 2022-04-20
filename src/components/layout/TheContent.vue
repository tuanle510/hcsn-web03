<template>
  <div class="m-content">
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <MISASearchbox placeholder="Tìm kiếm tài sản"></MISASearchbox>
        <MISACombobox hasIcon="true" title="Loại tài sản"></MISACombobox>
        <MISACombobox hasIcon="true" title="Bộ phận sử dụng"></MISACombobox>
      </div>
      <div class="m-toolbar-right">
        <MISAButton
          @click="showDialog"
          style="box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16)"
          >+Thêm tài sản</MISAButton
        >
        <div class="toolbar-btn icon-box">
          <div class="excel"></div>
        </div>
        <div class="toolbar-btn icon-box">
          <div class="remove"></div>
        </div>
      </div>
    </div>

    <div class="m-grip">
      <div class="m-table-container">
        <table class="m-table">
          <thead>
            <tr>
              <th style="width: 50px; padding-left: 16px">
                <MISACheckbox></MISACheckbox>
              </th>
              <th class="text-align-center" style="max-width: 50px">STT</th>
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
            <!-- <tr
              @mouseover="onMouseOver"
              @dblclick="onRowDblClick(product)"
              v-for="(product, index) in productData"
              :key="index"
            >
              <td style="width: 50px; padding-left: 16px">
                <MISACheckbox
                  v-on:dblclick.stop="this.$emit(dblclick)"
                ></MISACheckbox>
              </td>
              <td class="text-align-center">{{ count }}</td>
              <td class="text-align-left">{{ product.id }}</td>
              <td class="text-align-left">{{ product.name }}</td>
              <td class="text-align-left">{{ product.type }}</td>
              <td class="text-align-left">{{ product.partsUse }}</td>
              <td class="text-align-right">{{ product.quantity }}</td>
              <td class="text-align-right">{{ product.price }}</td>
              <td class="text-align-right">{{ product.accumulate }}</td>
              <td class="text-align-right">{{ product.priceExtra }}</td>
              <td style="width: 80px">
                <div class="m-function-box" :class="{ 'box-show': true }">
                  <div class="icon-box" v-on:click="btnEditClick">
                    <div class="table-icon edit"></div>
                  </div>
                  <div class="icon-box" v-on:click="btnPriceClick">
                    <div class="table-icon print"></div>
                  </div>
                </div>
              </td>
            </tr> -->
            <Row
              @dblclick="onRowDblClick(product)"
              v-for="(product, index) in productData"
              :count="index + 1"
              :key="product.id"
              :product="product"
            ></Row>
          </tbody>
        </table>
      </div>

      <div class="m-paging">
        <div class="m-paging-left">
          <div class="m-total-number">
            Tổng số: <strong>200</strong> bản ghi
          </div>
          <div class="m-dropdown-paging-paging">
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

        <div class="m-paging-right">
          <div class="text-align-right" style="width: 80px">13</div>
          <div class="text-align-right" style="width: 130px">249.2284.000</div>
          <div class="text-align-right" style="width: 130px">19.715.000</div>
          <div class="text-align-right" style="width: 130px">229.2284.000</div>
        </div>
      </div>
    </div>

    <MISADialog
      ref="dialog"
      v-show="isDialogShow"
      :productSelected="productSelected"
      @closeDialog="btnDialog"
    ></MISADialog>
  </div>
</template>
<script>
import axios from 'axios';
import Row from '../base/table/MISARow.vue';
export default {
  name: 'the-content',

  components: {
    Row,
  },

  async beforeMount() {
    // Lấy data
    var me = this;
    await axios
      .get('https://62591883c5f02d964a4c41d3.mockapi.io/assets')
      .then(function (res) {
        me.productData = res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  methods: {
    /**
     * Bật dialog thêm sản phẩm mới
     * CREATED BY: LTTUAN(19.04.2022)
     */
    showDialog() {
      this.btnDialog(true);
      //Focus vào input đầu tiên thông qua ref
      this.$refs.dialog.focusFirstInput();
    },
    btnDialog(isShow) {
      this.isDialogShow = isShow;
    },

    /**
     * Gắn dữ liệu từ component Table vào để truyền vào Dialog khi doubleclick
     * CREATED BY: LTTUAN(18.04.2022)
     */
    onRowDblClick(product) {
      this.btnDialog(true);
      this.productSelected = product;
      //focus
      this.$refs.dialog.focusFirstInput();
    },

    /**
     * Hiển thị chức năng khi hover chuột vào dòng
     */
    onMouseOver(event) {
      console.log(event.target);
    },
  },

  data() {
    return {
      count: 0,
      productSelected: {},
      isDialogShow: false,
      productData: {},
    };
  },
};
</script>
<style></style>
