<template>
    <div>
        {{give}}
        <div @click="returnBack">ok</div>
    </div>
</template>

<script>
    export default {
        name: "my-checkbox",
        model:{
            prop:'give',
            event:'returnBack'
        },
        props:{
            give:String,
        },
        methods:{
            returnBack(){
                this.$emit('returnBack','lalala')
            }
        }
    }
</script>

<style scoped>

</style>
