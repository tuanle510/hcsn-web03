<template>
  <Datepicker
    locale="vi"
    cancelText="Hủy"
    selectText="Chọn"
    format="MM/dd/yyyy"
    :enableTimePicker="false"
    :maxDate="new Date()"
    class="mt-input input-datepicker"
    textInput
  ></Datepicker>
  <!-- :modelValue="date"
    @update:modelValue="setDate" -->
</template>
<script>
import Datepicker from "@vuepic/vue-datepicker";

export default {
  components: { Datepicker },
};
</script>
<style></style>
