<template>
  <div class="m-grip">
    <div class="m-table-container">
      <table class="m-table">
        <thead>
          <tr>
            <th style="width: 50px; padding-left: 16px">
              <MISACheckbox></MISACheckbox>
            </th>
            <th class="text-align-center" style="max-width: 50px">STT</th>
            <th class="text-align-left" style="max-width: 80px">Mã tài sản</th>
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
            <th class="text-align-center" style="max-width: 80px">Chức năng</th>
          </tr>
        </thead>

        <tbody>
          <Row
            @dblclick="onRowDblClick(product)"
            v-for="(product, index) in productData"
            :count="index + 1"
            :key="product.id"
            :productCode="product.id"
            :productName="product.name"
            :productType="product.type"
            :productUse="product.partsUse"
            :productQuantity="product.quantity"
            :productPrice="product.price"
            :productAccum="product.accumulate"
            :productPriceless="product.priceExtra"
          ></Row>
        </tbody>
      </table>
    </div>

    <div class="m-paging">
      <div class="m-paging-left">
        <div class="m-total-number">Tổng số: <strong>200</strong> bản ghi</div>
        <div class="m-dropdown">
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
</template>
<script>
import axios from 'axios';
import Row from './MISARow.vue';
export default {
  name: 'the-table',
  components: {
    Row,
  },
  /**
   * Lấy data từ API
   * CREATED BTY: LTTUAN(19.04.2022)
   */
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
     * double Click vào dòng trên bảng
     * CREATED BY: LTTUAN(18.04.2022)
     */
    onRowDblClick(product) {
      this.$emit('showDialog', true);
      this.$emit('dblClick', product);
    },
  },

  data() {
    return {
      count: 0,
      productData: {},
    };
  },
};
</script>
<style></style>
