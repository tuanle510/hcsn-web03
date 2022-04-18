<template>
  <div class="m-grip">
    <div class="m-table-container">
      <table class="m-table">
        <thead>
          <tr>
            <th style="width: 50px; padding-left: 16px">
              <Checkbox></Checkbox>
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
          <Tableline
            v-for="tabledata in tabletdatas"
            :key="tabledata.counter"
            :count="(counter += 1)"
            :productCode="tabledata.productCode"
            :productName="tabledata.productName"
            :productType="tabledata.productType"
            :productUse="tabledata.productUse"
            :productQuantity="tabledata.productQuantity"
            :productPrice="tabledata.productPrice"
            :productAccum="tabledata.productAccum"
            :productPriceless="tabledata.productPriceless"
          >
          </Tableline>
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
import Checkbox from "../MISACheckbox.vue";
import Tableline from "./MISAtableline.vue";
export default {
  name: "the-table",
  components: {
    Checkbox,
    Tableline,
  },

  methods: {},

  data() {
    return {
      counter: 0,
      tabletdatas: [
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
        {
          productCode: "55H7WN7",
          productName: "Dell Inspiron 3467",
          productType: "Máy vi tính xách tay",
          productUse: "Phòng Hành chính Kế toán",
          productQuantity: "2",
          productPrice: "10.000.000",
          productAccum: "1.225.000",
          productPriceless: "8.775.000",
        },
      ],
    };
  },
};
</script>
<style>
@import url(/src/css/base/table.css);
</style>
