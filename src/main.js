import { createApp } from "vue";
import App from "./App.vue";
import Button from "./components/base/MISAButton.vue";
import Table from "./components/base/table/MISATable.vue";
import Dialog from "./components/base/MISADialog.vue";
import Combobox from "./components/base/MISACombobox.vue";
import Searchbox from "./components/base/MISASearch.vue";
import Checkbox from "./components/base/MISACheckbox.vue";

const app = createApp(App);

app.component("MISAButton", Button);
app.component("MISATable", Table);
app.component("MISADialog", Dialog);
app.component("MISACombobox", Combobox);
app.component("MISASearchbox", Searchbox);
app.component("MISACheckbox", Checkbox);
app.mount("#app");
