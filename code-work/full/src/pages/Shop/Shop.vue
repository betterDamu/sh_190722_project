<template>
    <div id="app">
        <ele-header :seller="seller"></ele-header>
        <div class="navs">
            <div class="item">
                <router-link :to="`/Shop/${id}/goods`">商品</router-link>
            </div>
            <div class="item">
                <router-link :to="`/Shop/${id}/ratings`">评价</router-link>
            </div>
            <div class="item">
                <router-link :to="`/Shop/${id}/sellers`">商家</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import header from "components/ele-header/ele-header.vue"

    const OK = 0;
    export default {
        name: 'Shop',
        props:{
            id:String
        },
        data(){
            return {
                seller:{}
            }
        } ,
        components:{
            "ele-header":header
        },
        async mounted(){
            //根据id去数据库找属于当前商家的数据
            console.log(this.id,"mounted")
            const data = await this.$http.sellers.getSellers();
            if(data.errno === OK){
                this.seller = data.body
            }
        },
        beforeRouteUpdate (to, from, next) {
            console.log(to.params.id,"beforeRouteLeave")
            next()
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    #app
        .navs
            one-px(rgba(7,17,27,0.1))
            display flex
            height 40px
            line-height 40px
            .item
                flex 1
                a
                    font-size 14px
                    display block
                    text-align center
                    color rgba(77,85,93,1)
                    &.active
                        color:rgba(240,20,20,1)
</style>
