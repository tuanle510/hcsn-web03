<template>
  <div class="m-content">
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <Searchbox placeholder="Tìm kiếm tài sản"></Searchbox>
        <Combobox title="Loại tài sản"></Combobox>
        <Combobox title="Bộ phận sử dụng"></Combobox>
      </div>
      <div class="m-toolbar-right">
        <Button
          @click="showDialog"
          style="box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16)"
          >+Thêm tài sản</Button
        >
        <div class="toolbar-btn icon-box">
          <div class="excel"></div>
        </div>
        <div class="toolbar-btn icon-box">
          <div class="remove"></div>
        </div>
      </div>
    </div>
    <Table @dblClick="onRowDblClick" @showDialogWithData="btnDialog"></Table>
    <Dialog
      :class="{ 'm-dialog-showed': isDialogShow }"
      :productSelected="productSelected"
      @closeDialog="btnDialog"
    ></Dialog>
  </div>
</template>
<script>
import Button from '../base/MISAButton.vue';
import Searchbox from '../base/MISASearch.vue';
import Combobox from '../base/MISACombobox.vue';
import Table from '../base/table/MISATable.vue';
import Dialog from '../base/MISADialog.vue';
export default {
  name: 'the-content',
  components: {
    Button,
    Searchbox,
    Combobox,
    Table,
    Dialog,
  },

  methods: {
    showDialog() {
      this.btnDialog(true);
      
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
      // console.log(this.productSelected);
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
