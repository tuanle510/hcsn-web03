<template>
  <div class="m-content">
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <MISASearchbox placeholder="Tìm kiếm tài sản"></MISASearchbox>
        <MISACombobox title="Loại tài sản"></MISACombobox>
        <MISACombobox title="Bộ phận sử dụng"></MISACombobox>
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
    <MISATable @dblClick="onRowDblClick" @showDialog="btnDialog"></MISATable>
    <MISADialog
      v-show="isDialogShow"
      :productSelected="productSelected"
      @closeDialog="btnDialog"
    ></MISADialog>
  </div>
</template>
<script>
export default {
  name: "the-content",

  methods: {
    /**
     * Bật dialog thêm sản phẩm mới
     * CREATED BY: LTTUAN(19.04.2022)
     */
    showDialog() {
      this.btnDialog(true);
      this.$refs.firstInput.focus();
    },
    btnDialog(isShow) {
      this.isDialogShow = isShow;
    },

    /**
     * Gắn dữ liệu từ component Table vào để truyền vào Dialog
     * CREATED BY: LTTUAN(18.04.2022)
     */
    onRowDblClick(product) {
      this.productSelected = product;
    },
  },

  data() {
    return {
      productSelected: {},
      isDialogShow: false,
    };
  },
};
</script>
<style></style>
