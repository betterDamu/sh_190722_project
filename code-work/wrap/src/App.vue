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
        this.autoLogin()
    }
  }
</script>

<style scoped lang="stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
