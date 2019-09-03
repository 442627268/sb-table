/**
* Created by renlinfei on 2019-08-21.
*/
<template>
    <div v-if="!isEdit" class="ui-w100 min-height nowrap" @dblclick="dbEdit(true)">
        {{value}}
    </div>
    <div v-else>
        <el-input
                ref="input"
                :value="currentValue"
                @input="handleInput"
                @keyup.38.native="rowSelect(38)"
                @keyup.enter.native="rowSelect(13)"
                @keyup.40.native="rowSelect(40)">
        </el-input>
        <el-table
                :data="columnData"
                v-if="isShow"
                @row-click="rowClick"
                highlight-current-row
                ref="singleTable"
                class="ui-absolute"
                height="300px"
                :style="styleObject"
                style="width:450px;">
            <el-table-column show-overflow-tooltip v-for="(item,index) in column"
                             :prop="item.prop"
                             :key="index"
                             :align="item.align"
                             :label="item.label"
                             :width="item.width">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  import debounce from './debounce'
  import mixin from '../utils/childNode'
  export default {
    name: "column-table",
    mixins:[mixin],
    props: {
      value: {
        type: [String, Number]
      },
      column: {
        type: Array,
      },
      columnData: {
        type: Array
      },
      canEditCell: {
        type: Boolean,
        default: false
      },
      isColumn: {
        type: [String, Boolean, Number]
      },
    },
    data() {
      return {
        currentValue: this.value,
        isEdit: false,
        isShow: false,
        activeIndex: 0,
        popoverTable: '',
        styleObject: {}
      }
    },
    methods: {
      loadMore() {
      },
      dbEdit(flag) {

        if (this.canEditCell) {
          this.isEdit = flag;
          if (flag) {
            setTimeout(() => {
              this.getUid();
              this.$refs.input.focus();
              let inputCurrent = this.$refs.input.$el;
              document.addEventListener('click', this.hidePanel, false);
              //弹出表格的位置
              //this.popoverTable = this.$refs.singleTable;
              if (this.$parent.$el.clientHeight - this.$el.offsetParent.offsetTop < 300) {
                this.styleObject = {
                  top: inputCurrent.offsetTop - 300 + 'px'
                }
              } else {
                this.styleObject = {
                  top: inputCurrent.offsetTop + 32 + "px"
                }
              }
              this.isShow = true;
              setTimeout(() => {
                // 获取需要绑定的table
                this.$emit("infinitescroll", this.currentValue?this.currentValue:"", false);
                this.dom = this.$refs.singleTable.bodyWrapper;
                this.dom.addEventListener("scroll", this.infinitescroll, false);
              }, 0);
            }, 0);
          }
        }
      },
      infinitescroll() {
        // 滚动距离
        let scrollTop = this.dom.scrollTop;
        // 变量windowHeight是可视区的高度
        let windowHeight = this.dom.clientHeight || this.dom.clientHeight;
        // 变量scrollHeight是滚动条的总高度
        let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight;
        if (scrollTop + windowHeight + 50 > scrollHeight) {
          this.$emit("infinitescroll", this.currentValue, true)
        }
      },
      rowSelect(key) {
        if (key === 38 && this.activeIndex > 0) {
          --this.activeIndex;
          this.setCurrentRow(this.columnData[this.activeIndex])
        }
        if (key === 40 && this.activeIndex != this.columnData.length) {
          ++this.activeIndex;
          this.setCurrentRow(this.columnData[this.activeIndex])
        }
        if (key === 13) {
          this.rowDataSet();
        }
      },
      rowClick(row) {
        this.row = row;
        this.rowDataSet();
      },
      rowDataSet() {
        document.removeEventListener("click", this.hidePanel, false);
        document.removeEventListener("scroll", this.infinitescroll, false);
        this.$emit("rowEnter", this.row, val => {
          this.$nextTick(() => {
            this.currentValue = this.value;
            this.handleInput(true);
          });
        });
      },
      //设置上下选中row并scroll到选中的位置
      setCurrentRow(row) {
        const height = this.$refs.singleTable.$el.children[2].children[0].clientHeight
        this.$refs.singleTable.$el.children[2].scrollTop = (height / this.columnData.length) * (this.activeIndex - 1);
        this.row = row;
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleInput(flag) {
        if (typeof flag == "boolean") {
          this.childNode();
          this.isEdit = false;
          return
        }
        this.currentValue = flag;
        // this.$emit("input", this.currentValue);
        debounce(() => {
          this.$emit("infinitescroll", this.currentValue, false);
        });
      },

      hidePanel(e) {
        if (!this.$refs.input.$el.contains(e.target) && !this.$refs.singleTable.$el.contains(e.target)) {//点击除弹出层外的空白区域
          document.removeEventListener("click", this.hidePanel, false);
          document.removeEventListener("scroll", this.infinitescroll, false);
          this.isEdit = false;
        }
      },
    },
    watch: {
      isEdit(val) {
        if (val && this.columnData.length) {
          setTimeout(() => {
            this.row = this.columnData[0];
            this.setCurrentRow(this.row)
          }, 0)
        }
      },
    }
  }
</script>

<style scoped>
    .ui-relative {
        position: relative;
    }

    .nowrap {
        /*display: inline-block;*/
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .ui-absolute {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        position: absolute;
        z-index: 100;
    }

    .el-table /deep/ {
        max-width: none;
    }
</style>
