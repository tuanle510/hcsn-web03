import { createApp } from "vue";
import App from "./App.vue";
import Button from "./components/base/MISAButton.vue";
import Dialog from "./components/base/MISADialog.vue";
import Combobox from "./components/base/MISACombobox.vue";
import Searchbox from "./components/base/MISASearch.vue";
import Checkbox from "./components/base/MISACheckbox.vue";
import Alert from "./components/base/MISAAlert.vue";
import Input from "./components/base/MISAInput.vue";
import Toast from "./components/base/MISAToast.vue";
import Loading from "./components/base/MISALoading.vue";
import Datepicker from "@vuepic/vue-datepicker";
import { ComboBoxComponent } from "@syncfusion/ej2-vue-dropdowns";
import { registerLicense } from "@syncfusion/ej2-base";

// Registering Syncfusion license key
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFaclhJWHxKf0x0RWFbb19wfldCalhWVAciSV9jS3xTc0ViWH9ad3BQQGReVQ=="
);

const app = createApp(App);
/* eslint-disable */
app.component("MISAButton", Button);
app.component("MISADialog", Dialog);
app.component("MISACombobox", Combobox);
app.component("MISASearchbox", Searchbox);
app.component("MISACheckbox", Checkbox);
app.component("MISAAlert", Alert);
app.component("MISAInput", Input);
app.component("MISAToast", Toast);
app.component("MISALoading", Loading);
app.component("Datepicker", Datepicker);
app.component("ejs-combobox", ComboBoxComponent);
// app.use(SimpleTypeahead);
app.mount("#app");
