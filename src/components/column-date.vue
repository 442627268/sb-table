/**
* Created by renlinfei on 2019-08-13.
*/
<template>
  <div>
    <div v-if="!isEdit" class="ui-w100 min-height" @dblclick="dbEdit(true)">
      {{value}}
    </div>
    <div v-else>
      <el-date-picker
        ref="handlerDate"
        v-model="currentValue"
        type="date"
        value="yyyy-MM-dd"
        @blur="dbEdit(false)"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  import index from './utils/index'
  import childNode from './utils/childNode'
  import moment from 'moment'
  export default {
    name: "column-date",
    mixins: [index, childNode],
    props: {
      value: {
        type: [String, Number]
      },
      isColumn: {
        type: [String, Boolean, Number]
      },
      canEditCell: {
        type: Boolean
      }
    },
    data() {
      return {}
    },
    methods: {
      dbEdit(flag) {
        this.isEdit = flag;
        if (flag) {
          this.$nextTick(() => {
            this.getUid();
            this.$refs.handlerDate.$refs.reference.focus();
          })
        } else {
          this.$emit("input", this.currentValue)
          if (this.$listeners.editCell) {
            this.$emit('editCell', this.currentValue,()=>{
              this.childNode();
            });
          }else{
            this.childNode();
          }
          //this.currentValue = e;


        }
      },
    },
    watch: {
      isEdit(val) {
        if (val && !this.value) {
          this.currentValue = moment().format("YYYY-MM-DD");// this.getdatatime();
        }else if(val){
          this.currentValue =this.value;
        }
      }
    }
  }
</script>

<style scoped>
</style>
