<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import {mapActions} from "vuex"
  import FooterGuide from "components/FooterGuide/FooterGuide.vue"
  export default {
    name: 'app',
    methods:{
        ...mapActions(["autoLogin"])
    },
    components:{
        FooterGuide
    },
    created(){
        /*这个action是用来检验token的,
            token 有效 --> 跳转路由
            token 没有 无效 --> 拦住 去登录页*/
        //this.autoLogin()
    }
  }
</script>

<style scoped lang="stylus">
  #app
    width 100%
    height 100%
    overflow hidden
    background #f5f5f5
    position relative
</style>
