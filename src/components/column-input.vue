/**
* Created by renlinfei on 2019-08-13.
*/
<template>
    <div>
        <div v-if="!isEdit" class="ui-w100 min-height" @dblclick="dbEdit(true)">
            {{value}}
        </div>
        <div v-else>
            <el-input
                    ref="input"
                    @keyup.enter.native="e=>handleInput(e.target.value,true)"
                    @blur="dbEdit(false)"
                    @input="handleInput"
                    :value="currentValue"
                    placeholder="">
            </el-input>
        </div>
    </div>
</template>

<script>
  import index from './utils/index'
  import childNode from './utils/childNode'

  export default {
    name: "column-input",
    mixins: [index,childNode],
    props: {
      value: {
        type: [String, Number]
      },
      canEditCell: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      dbEdit(flag) {
        if (this.canEditCell) {
          this.isEdit = flag;
          if (flag) {
            setTimeout(() => {
              this.getUid();
              this.$refs.input.focus();
            }, 300);
          }
        }
      },
    },
    watch: {
      value(val) {
        this.currentValue = val;
        this.$emit("input", this.currentValue)
      }
    }
  }
</script>

<style scoped>
</style>
