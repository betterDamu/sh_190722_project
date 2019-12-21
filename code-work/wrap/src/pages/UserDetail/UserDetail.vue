<template>
    <p style="text-align: center">
        <van-button type="primary" @click="exit">退出登录</van-button>
    </p>
</template>

<script>
    import { Button } from 'vant';
    export default {
        name: "UserDetail",
        components:{
            [Button.name]:Button
        },
        methods:{
            exit(){
                this.$store.dispatch("resetUser")
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>