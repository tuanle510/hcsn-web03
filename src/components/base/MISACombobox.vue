<template>
  <div class="m-combobox-out" v-if="isOptionShow" @click="onClickOut()"></div>
  <div class="m-combobox" ref="combobox">
    <div class="combobox-contaner">
      <div v-if="hasIcon" class="combobox-icon">
        <div class="filter"></div>
      </div>
      <input
        ref="input"
        class="combobox-text"
        :class="{ 'input-no-icon': !hasIcon }"
        @keydown.tab="tab"
        @focus="setFocus"
        @blur="outFoucs"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="selectItem"
        :placeholder="placeholder"
        @input="onChangeHandler"
        :value="this.modelValue"
      />

      <div
        style="position: absolute; right: 20px"
        @click="clearInput"
        v-if="hasInput"
        class="icon-combobox"
      >
        <div class="clear"></div>
      </div>
      <div
        style="position: absolute; right: 0"
        @click="isOptionShow = !isOptionShow"
        class="icon-combobox"
      >
        <div v-if="isOptionShow" class="up"></div>
        <div v-else class="down"></div>
      </div>
    </div>
    <ul class="m-option-list" v-if="isOptionShow" ref="optionList">
      <li
        v-for="(option, index) in matches"
        :key="index"
        class="m-option-item"
        @keydown.down="down"
        @keydown.up="up"
        @keydown.enter="selectItem"
        @click="choseOpton(index)"
        :class="{ 'm-item-selected': this.selecedIndex == index }"
      >
        {{ option[this.filterby] }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'the-combobox',

  props: ['hasIcon', 'placeholder', 'filterby', 'optionList', 'modelValue'],

  computed: {
    matches() {
      if (
        this.modelValue == undefined ||
        this.optionList
          .map((item) => item[this.filterby])
          .includes(this.modelValue)
      ) {
        return this.optionList;
      } else {
        return this.optionList.filter((item) =>
          item[this.filterby]
            .toLowerCase()
            .includes(this.modelValue.toLowerCase())
        );
      }
    },
  },

  watch: {
    modelValue: function (newValue) {
      if (newValue == undefined) {
        this.hasInput = false;
      } else {
        this.hasInput = true;
      }
    },
  },

  methods: {
    /**
     * Mô tả : Lấy giá trị từ v-model bên cha
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:00 02/05/2022
     */
    onChangeHandler(e) {
      e.preventDefault();
      this.$emit('update:modelValue', e.target.value);
    },

    /**
     * Mô tả : click ra ngoài thì tắtt
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:42 01/05/2022
     */
    onClickOut() {
      this.isOptionShow = false;
      this.$refs.modelValue.blur();
    },
    /**
     * Mô tả : khi focus vào thì hiện out line, blur thì bỏ outline
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:23 30/04/2022
     */
    setFocus() {
      this.$refs.combobox.style.border = '1px solid #22a7ca';
      this.isOptionShow = true;
    },
    outFoucs() {
      this.$refs.combobox.style.border = '1px solid #afafaf';
    },

    /**
     * Mô tả : clear input
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 14:52 28/04/2022
     */
    clearInput() {
      this.$emit('update:modelValue');
      this.hasInput = false;
      this.isOptionShow = false;
      this.selecedIndex = 0;
    },

    /**
     * Mô tả : Tab thì ẩn option listt
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:51 01/05/2022
     */
    tab() {
      this.isOptionShow = false;
    },

    /**
     * Mô tả : Chọn option
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:31 28/04/2022
     */
    choseOpton(index) {
      this.selecedIndex = index;
      this.selectItem();
    },

    selectItem() {
      this.$emit(
        'update:modelValue',
        this.matches[this.selecedIndex][this.filterby]
      );
      this.isOptionShow = false;
      this.$refs.input.blur();
      this.$emit(
        'selected',
        JSON.parse(JSON.stringify(this.matches[this.selecedIndex]))
      );
    },

    up() {
      if (this.selecedIndex == 0) {
        return;
      }
      this.selecedIndex -= 1;
      this.scrollToItem();
    },

    down() {
      if (this.selecedIndex >= this.matches.length - 1) {
        return;
      }
      this.selecedIndex += 1;
      this.scrollToItem();
    },

    scrollToItem() {
      this.$refs.optionList.scrollTop = this.selecedIndex * 36;
    },
  },

  data() {
    return {
      selecedIndex: 0,
      isOptionShow: false,
      hasInput: false,
    };
  },
};
</script>
<style></style>
