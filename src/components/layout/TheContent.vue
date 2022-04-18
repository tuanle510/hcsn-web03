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

    <Table></Table>
  </div>
</template>
<script>
import Button from "../base/MISAButton.vue";
import Searchbox from "../base/MISASearch.vue";
import Combobox from "../base/MISACombobox.vue";
import Table from "../base/table/MISATable.vue";
export default {
  name: "the-content",
  components: {
    Button,
    Searchbox,
    Combobox,
    Table,
  },

  methods: {
    showDialog() {
      this.$emit("showDialog");
    },
  },
};
</script>
<style></style>
