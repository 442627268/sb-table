/**
* Created by renlinfei on 2019-08-20.
*/
<template>
    <div>
        <div v-if="!isEdit" class="ui-w100 min-height" @dblclick="dbEdit(true)">
            {{valueStr}}
        </div>
        <div v-else>
            <el-select filterable
                       :clearable="clearable"
                       default-first-option
                       :filter-method="localfilterMethod"
                       @change="val=>handleInput(val,true)" ref="select" v-model="currentValue"
                       placeholder="请选择">
                <el-option
                        v-for="item in copyselectData"
                        :key="item[defaultItem.value]"
                        :label="item[defaultItem.label]"
                        :value="item[defaultItem.value]">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
  import mixin from './index'
  import childNode from '../utils/childNode'
  export default {
    name: "column-select",
    mixins: [mixin,childNode],
    props: {
      selectData: {
        required: true,
      },
      value: {
        type: [String, Number]
      },
      defaultStr: {
        type: [String, Number]
      },
      clearable: {
        type: [Boolean],
        default: false,
      },
      defaultItem: {
        type: Object,
        default: () => {
          return {
            value: "value",
            label: "label"
          }
        }
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
        isEdit: false,
        valueStr: this.defaultStr,
        copyselectData:this.selectData,
        currentValue: this.value
      }
    },
    mounted() {
    },
    methods: {
      dbEdit(flag) {
        if (this.canEditCell) {
          this.isEdit = flag;
          if (flag) {
            this.$nextTick(() => {
             this.getUid();
              this.$refs.select.visible = true;
              this.$refs.select.focus();
              document.addEventListener("click", this.hidePanel, false)
            })
          }
        }

      },
      handleInput(e, flag) {
        if (flag) {
          this.isEdit = false;
          document.removeEventListener("click", this.hidePanel, false)
          this.childNode();
        }
        this.valueStr = this.selectItem(e)
        this.currentValue = e;
        this.$emit("input", this.currentValue)
      },
      hidePanel(e) {
        if (!this.$refs.select.$el.contains(e.target)) {//点击除弹出层外的空白区域
          document.removeEventListener("click", this.hidePanel, false);
          this.isEdit = false;
        }
      },
      //设置下来的label值回显
      selectItem(code) {
        var itemValue = null;
        this.selectData.some(value => {
          if (value[this.defaultItem.value] == code) {
            itemValue = value[this.defaultItem.label]
            return true
          }
        });
        return itemValue;
      }
    }
  }
</script>

<style scoped>

</style>
