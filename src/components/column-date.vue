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
                    @change="handleInput"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
  import index from './mixin'

  export default {
    name: "column-date",
    mixins: [index],
    props: {
      value: {
        type: [String, Number]
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
            this.$refs.handlerDate.$refs.reference.focus();
          })
        } else {
          this.$emit("input", this.currentValue)
          const uid = this._uid;
          let childuid = this.$parent.$children.filter(value => value._uid == (uid + 1));
          if(!childuid.length){
            childuid=this.$parent.$children.filter(value => value._uid == (uid + 2));
          }
          childuid.length && childuid[0].dbEdit(true)
        }
      },
      getdatatime() {
        this.ct_month = new Date();
        //this.ct_month.setTime(this.ct_month.getTime() - 3600 * 1000 * 24 * 30);//获取上个月的日期（这一行去掉就是获取今天计算机上的日期了）
        var now = this.ct_month;
        var year = now.getFullYear(); //年
        var month = now.getMonth() + 1; //月
        var day = now.getDate(); //日
        //var hh = now.getHours(); //时
        //var mm = now.getMinutes(); //分
        var clock = year + "-";
        if (month < 10)
          clock += "0";
        clock += month + "-";
        if (day < 10)
          clock += "0";
        clock += day + " ";
        return clock;
      },
    },
    watch:{
      isEdit(val){
        if(val&&!this.currentValue){
          this.currentValue = this.getdatatime();
        }
      }
    }
  }
</script>

<style scoped>
</style>