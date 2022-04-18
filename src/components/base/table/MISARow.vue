<template>
  <tr @mouseover="this.isFunShow = true" @mouseleave="this.isFunShow = false">
    <td style="width: 50px; padding-left: 16px">
      <Checkbox></Checkbox>
    </td>
    <td class="text-align-center">{{ 1 }}</td>
    <td class="text-align-left">{{ productCode }}</td>
    <td class="text-align-left">{{ productName }}</td>
    <td class="text-align-left">{{ productType }}</td>
    <td class="text-align-left">{{ productUse }}</td>
    <td class="text-align-right">{{ productQuantity }}</td>
    <td class="text-align-right">{{ productPrice }}</td>
    <td class="text-align-right">{{ productAccum }}</td>
    <td class="text-align-right">{{ productPriceless }}</td>
    <td style="width: 80px">
      <div class="m-function-box" v-show="isFunShow">
        <div class="icon-box" v-on:click="btnEditClick">
          <div class="table-icon edit"></div>
        </div>
        <div class="icon-box" v-on:click="btnPriceClick">
          <div class="table-icon print"></div>
        </div>
      </div>
    </td>
  </tr>
</template>
<script>
import Checkbox from '../MISACheckbox.vue';
export default {
  name: 'table-row',
  components: {
    Checkbox,
  },
  props: [
    'productCode',
    'productName',
    'productType',
    'productUse',
    'productQuantity',
    'productPrice',
    'productAccum',
    'productPriceless',
  ],
  data() {
    return {
      isFunShow: false,
    };
  },
};
</script>
<style></style>
