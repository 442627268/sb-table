<template>
    <div>
        <el-input :value="value" @input="changeVal"></el-input>
    </div>
</template>

<script>
    export default {
        name: "my-input",
        data(){
            return{
            }
        },
        props:{
            value:String
        },
        methods:{
            changeVal(val){
                this.$emit('input',val)
            }
        },
        watch:{
            value:function (val) {
                console.log(val)
            }
        }
    }
</script>

<style scoped>

</style>
