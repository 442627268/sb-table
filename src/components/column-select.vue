/**
* Created by renlinfei on 2019-08-20.
*/
<template>
    <div>
        <div v-if="!isEdit" class="ui-w100 min-height" @dblclick="dbEdit(true)">
            {{valueStr}}
        </div>
        <div v-else>
            <el-select @change="val=>handleInput(val,true)" ref="select" v-model="currentValue"
                       placeholder="请选择">
                <el-option
                        v-for="(item,index) in selectData"
                        :key="index"
                        :label="item[defaultItem.label]"
                        :value="item[defaultItem.value]">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
  export default {
    name: "column-select",
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
      defaultItem: {
        type: Object,
        default: () => {
          return {
            value: "value",
            label: "label"
          }
        }
      },
    },
    data() {
      return {
        isEdit: false,
        valueStr: this.defaultStr,
        currentValue: this.value
      }
    },
    mounted() {
    },
    methods: {
      dbEdit(flag) {
        this.isEdit = flag;
        if (flag) {
          this.$nextTick(() => {
            this.$refs.select.visible = true;
            this.$refs.select.focus();
            document.addEventListener("click",this.hidePanel,false)
          })
        }
      },
      handleInput(e, flag) {
        console.log(1111111111)
        if (flag) {
          this.isEdit = false;
          document.removeEventListener("click",this.hidePanel,false)
          const uid = this._uid;
          const childuid = this.$parent.$children.filter(value => value._uid == (uid + 1));
          childuid.length && childuid[0].dbEdit(true)
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