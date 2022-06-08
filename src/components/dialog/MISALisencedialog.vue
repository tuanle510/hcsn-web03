<template>
  <div class="m-dialog lisence-dialog">
    <div class="m-modal">
      <div class="m-modal-title lisence-title">Thêm chứng từ ghi tăng</div>
      <div class="m-modal-close">
        <div class="close"></div>
      </div>

      <div class="m-modal-centent lisence-modal" ref="form" autocomplete="off">
        <!-- Thông tin chứng từ -->
        <div class="center-title">Thông tin chứng từ</div>
        <form action="" class="lisence-form">
          <div class="modal-row">
            <div class="modal-field">
              <label>Mã chứng từ <span>*</span></label>
              <MISAInput></MISAInput>
            </div>
            <div class="modal-field">
              <label>Ngày bắt đầu sử dụng <span>*</span></label>
              <MISADatepicker></MISADatepicker>
            </div>
            <div class="modal-field">
              <label>Ngày ghi tăng <span>*</span></label>
              <MISADatepicker></MISADatepicker>
            </div>
          </div>
          <div class="modal-row" style="margin-bottom: 0">
            <div class="modal-field modal-field-full">
              <label>Ngày ghi tăng</label>
              <MISAInput></MISAInput>
            </div>
          </div>
        </form>

        <!-- Thông tin chi tiết -->
        <div class="center-title">Thông tin chi tiết</div>
        <div class="lesence-detail">
          <div class="lisence-table-toolbar">
            <!--  -->
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

            <MISAButton
              style="border: none; box-shadow: 0 2px 6px rgb(0 0 0 / 16%)"
              type="outline-button"
              buttonTitle="Chọn tài sản"
            ></MISAButton>
            <!--  -->
          </div>
          <!-- bảng -->
          <div class="m-detail-table" style="height: 200px">
            <table class="m-table">
              <thead>
                <tr>
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
            <MISADropdown
              :defaultValue="this.pageSize"
              @onChose="getPageSize"
            ></MISADropdown>
            <MISAPaginate
              v-model="pageIndex"
              :pageCount="totalPageIndex"
              :prev-text="'pre'"
              :prev-link-class="'prev-link-class'"
              :next-text="'next'"
              :next-link-class="'next-link-class'"
              :container-class="'m-paging-list'"
              :prev-class="'prev-class'"
              :click-handler="getPageIndex"
            ></MISAPaginate>
          </div>
        </div>
      </div>

      <div class="m-modal-footer">
        <MISAButton
          style="border: none; box-shadow: 0 2px 6px rgb(0 0 0 / 16%)"
          type="outline-button"
          buttonTitle="Hủy"
        ></MISAButton>
        <MISAButton @click="onSubmit($event)" buttonTitle="Lưu"></MISAButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
