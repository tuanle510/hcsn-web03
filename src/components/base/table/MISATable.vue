
<script>
import axios from "axios";
/* eslint-disable */
// import Row from "./MISARow.vue";
export default {
  name: "the-table",
  components: {},
  /**
   * Lấy data từ API
   * CREATED BTY: LTTUAN(19.04.2022)
   */
  async beforeMount() {
    // Lấy data
    var me = this;
    await axios
      .get("https://62591883c5f02d964a4c41d3.mockapi.io/assets")
      .then(function (res) {
        me.productData = res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  methods: {
    /**
     * double Click vào dòng trên bảng
     * CREATED BY: LTTUAN(18.04.2022)
     */
    onRowDblClick(product) {
      this.$emit("showDialog", true);
      this.$emit("dblClick", product);
    },

    // Gán product vào biến tạm
    onClickRow(product) {
      this.productItem = product;
      this.productList.push(this.productItem);
      console.log(
        this.productList[this.productList.length - 1].id == product.id
      );
    },
  },

  data() {
    return {
      count: 0,
      productData: {},
      productItem: {},
      productList: [],
      isFunShow: false,
    };
  },
};
</script>
<style></style>
