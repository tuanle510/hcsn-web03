<template>
  <tr @mouseover="this.isFunShow = true" @mouseleave="this.isFunShow = false">
    <td style="width: 50px; padding-left: 16px">
      <MISACheckbox v-on:dblclick.stop="this.$emit(dblclick)"></MISACheckbox>
    </td>
    <td class="text-align-left">{{ count }}</td>
    <td class="text-align-left">{{ product.id }}</td>
    <td class="text-align-left">{{ product.name }}</td>
    <td class="text-align-left">{{ product.type }}</td>
    <td class="text-align-left">{{ product.partsUse }}</td>
    <td class="text-align-right">{{ product.quantity }}</td>
    <td class="text-align-right">{{ product.price }}</td>
    <td class="text-align-right">{{ product.accumulate }}</td>
    <td class="text-align-right">{{ product.priceExtra }}</td>
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
</template>
<script>
export default {
  name: "table-row",
  props: ["product", "count"],
  data() {
    return {
      isFunShow: false,
    };
  },
};
</script>
<style></style>
