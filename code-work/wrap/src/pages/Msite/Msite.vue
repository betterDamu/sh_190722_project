<template>
    <section class="content">
        <div class="on">
            <section class="msite">
                <!--首页头部-->
                <HeaderTop :title="address.name">
                    <template slot="left">
                        <span class="header_search">
                            <i class="iconfont icon-sousuo"></i>
                        </span>
                    </template>
                    <template slot="right">
                        <span class="header_login">
                           <span class="header_login_text">登录|注册</span>
                       </span>
                    </template>
                </HeaderTop>
                <!--首页导航-->
                <nav class="msite_nav">
                    <div class="swiper-container">
                        <div class="swiper-wrapper" >
                            <div class="swiper-slide" v-for="categoryItem in categoryArr">
                                <a href="javascript:" v-for="category in categoryItem" class="link_to_food">
                                    <div class="food_container">
                                        <img :src="baseImgUrl + category.image_url">
                                    </div>
                                    <span>{{category.title}}</span>
                                </a>
                            </div>
                        </div>
                        <!-- Add Pagination -->
                        <div class="swiper-pagination"></div>
                    </div>
                </nav>
                <ShopList></ShopList>
            </section>
        </div>
    </section>
</template>

<script>
    import ShopList from "components/ShopList/ShopList"
    import HeaderTop from "components/HeaderTop/HeaderTop"
    import {mapActions,mapState} from "vuex"
    import _ from "lodash"
    import Swiper from "swiper"
    import "swiper/css/swiper.min.css"
    export default {
        name: "Msite",
        computed:{
            // ...mapState(["address","categories","baseImgUrl"]),
            ...mapState({
                address:state => state.msite.address,
                categories:state => state.msite.categories,
                baseImgUrl:state => state.msite.baseImgUrl
            }),
            categoryArr(){
                return _.chunk(this.categories,8)
            }
        },
        methods:{
            ...mapActions(["getAddress","getCategories"]),
            //1. 计算属性 + $nextTick
            //2. wtach + $nextTick
            //3. cb + $nextTick
            //4. promise + 函数调用
            swiperRender(){
                // this.$nextTick(()=>{
                    new Swiper('.swiper-container', {
                        autoplay: true,
                        pagination: {
                            el: '.swiper-pagination',
                        }
                    })
                // })
            }
        },
        components:{
            ShopList,
            HeaderTop
        },
        async created(){
            this.getAddress();
            // 每一个action在被执行后 返回的是一个promise
            // 当前这个promise在vue把数据更新完 界面渲染成功之后才会确定状态
            await  this.getCategories(this.swiperRender);
            this.swiperRender()
        },
        /*watch:{
            categories(){
               this.swiperRender()
            }
        }*/
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixins.styl"
    .content  //每个页面的内容
        >div //决定哪个页面显示
            display none
            &.on
                display block
            >section
                &.msite  //首页
                    width 100%
                    .msite_nav
                        bottom-border-1px(#e4e4e4)
                        margin-top 45px
                        height 200px
                        background #fff
                        .swiper-container
                            width 100%
                            height 100%
                            .swiper-wrapper
                                width 100%
                                height 100%
                                .swiper-slide
                                    display flex
                                    justify-content center
                                    align-items flex-start
                                    flex-wrap wrap
                                    .link_to_food
                                        width 25%
                                        .food_container
                                            display block
                                            width 100%
                                            text-align center
                                            padding-bottom 10px
                                            font-size 0
                                            img
                                                display inline-block
                                                width 50px
                                                height 50px
                                        span
                                            display block
                                            width 100%
                                            text-align center
                                            font-size 13px
                                            color #666
                            .swiper-pagination
                                >span.swiper-pagination-bullet-active
                                    background #02a774

</style>