<template>
  <div class="m-dialog lisence-dialog">
    <div class="m-modal lisence-modal">
      <div class="m-modal-title lisence-title">Chọn tài sản ghi tăng</div>
      <div class="m-modal-close">
        <div class="close"></div>
      </div>
      <div class="m-modal-centent chose-asset-content">
        <!-- toolbar -->
        <div class="chose-asset-toolbar">
          <div class="search-field" style="width: 300px">
            <input
              placeholder="Tìm kiếm theo số chứng từ, nội dung"
              ref="searchInput"
              class="m-search"
              @input="searchInput"
            />
            <div class="search-icon">
              <div class="search"></div>
            </div>
          </div>
        </div>
        <!-- Bảng -->
        <div class="m-detail-table" style="height: calc(100% - 162px)">
          <table class="m-table">
            <thead>
              <tr>
                <th><MISACheckbox></MISACheckbox></th>
                <th class="text-align-center max-w-50">STT</th>
                <th class="text-align-left">Mã tài sản</th>
                <th class="text-align-left">Tên tài sản</th>
                <th class="text-align-left">Bộ phận sử dụng</th>
                <th class="text-align-right">Nguyên giá</th>
                <th class="text-align-right">Hao mòn năm</th>
                <th class="text-align-right">Giá trị còn lại</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th><MISACheckbox></MISACheckbox></th>
                <td class="text-align-center">1</td>
                <td class="text-align-left">Mã tài sản</td>
                <td class="text-align-left">Tên tài sản</td>
                <td class="text-align-left">Bộ phận sử dụng</td>
                <td class="text-align-right">Nguyên giá</td>
                <td class="text-align-right">Hao mòn năm</td>
                <td class="text-align-right">Giá trị còn lại</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- paging -->
        <div class="lisence-paging">
          <div class="m-total-number">
            Tổng số:
            <strong>31</strong> bản ghi
          </div>
          <!-- :defaultValue="this.pageSize"
            @onChose="getPageSize" -->
          <MISADropdown></MISADropdown>
          <MISAPaginate
            :pageCount="1"
            :prev-text="'pre'"
            :prev-link-class="'prev-link-class'"
            :next-text="'next'"
            :next-link-class="'next-link-class'"
            :container-class="'m-paging-list'"
            :prev-class="'prev-class'"
          ></MISAPaginate>
          <!-- :click-handler="getPageIndex" -->
        </div>
      </div>
      <div class="m-modal-footer">
        <MISAButton type="outline-button" buttonTitle="Hủy bỏ"></MISAButton>
        <MISAButton buttonTitle="Đồng ý"></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
