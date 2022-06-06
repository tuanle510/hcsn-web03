<template>
  <div class="m-content m-lisence">
    <!-- toolbar -->
    <div class="m-lisence-toolbar">
      <div class="l-toolbar-left"><p>Ghi tăng tài sản</p></div>
      <div class="l-toolbar-right">
        <MISAButton buttonTitle="Thêm"></MISAButton>
        <div class="l-icon-container">
          <div class="icon-box">
            <div class="lisence"></div>
          </div>
          <div class="icon-box">
            <div class="arrow-down"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- main -->
    <div class="m-lisence-main">
      <div class="l-main-header">
        <MISAInput class="l-search"></MISAInput>
        <div class="l-icon-container">
          <div class="icon-box">
            <div class="export"></div>
          </div>
          <div class="icon-box">
            <div class="more"></div>
          </div>
        </div>
      </div>
      <div class="l-lisence-table">
        <table>
          <thead>
            <tr>
              <th>
                <MISACheckbox></MISACheckbox>
              </th>
              <th>STT</th>
              <th>Số chứng từ</th>
              <th>Ngày chứng từ</th>
              <th>Ngày ghi tăng</th>
              <th>Tổng nguyên giá</th>
              <th>Nội dung</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <MISACheckbox></MISACheckbox>
              </td>
              <td>STT</td>
              <td>Số chứng từ</td>
              <td>Ngày chứng từ</td>
              <td>Ngày ghi tăng</td>
              <td>Tổng nguyên giá</td>
              <td>Nội dung</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
