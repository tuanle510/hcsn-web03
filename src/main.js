import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5234/api/v1/";

import Header from "./components/layout/TheHeader.vue";
import Navbar from "./components/layout/TheNavBar.vue";
import Content from "./components/layout/TheContent.vue";

import Button from "./components/base/MISAButton.vue";
import Dialog from "./components/base/MISADialog.vue";
import Combobox from "./components/base/MISACombobox.vue";
import Searchbox from "./components/base/MISASearch.vue";
import Checkbox from "./components/base/MISACheckbox.vue";
import Alert from "./components/base/MISAAlert.vue";
import Input from "./components/base/MISAInput.vue";
import Toast from "./components/base/MISAToast.vue";
import Loading from "./components/base/MISALoading.vue";
import Dropdown from "./components/base/MISADropdown.vue";
import Datepicker from "./components/base/MISADatepicker";
import Paginate from "vuejs-paginate-next";

const app = createApp(App);
app.use(router);
app.use(store);
//
app.component("MISAHeader", Header);
app.component("MISAContent", Content);
app.component("MISANavbar", Navbar);
//
app.use(require("vue3-shortkey"));
app.component("MISAButton", Button);
app.component("MISADialog", Dialog);
app.component("MISACombobox", Combobox);
app.component("MISASearchbox", Searchbox);
app.component("MISACheckbox", Checkbox);
app.component("MISAAlert", Alert);
app.component("MISAInput", Input);
app.component("MISAToast", Toast);
app.component("MISALoading", Loading);
app.component("MISADatepicker", Datepicker);
app.component("MISAPaginate", Paginate);
app.component("MISADropdown", Dropdown);
app.mount("#app");
