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
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/1.jpg">
                                    </div>
                                    <span>甜品饮品</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/2.jpg">
                                    </div>
                                    <span>商超便利</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/3.jpg">
                                    </div>
                                    <span>美食</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/4.jpg">
                                    </div>
                                    <span>简餐</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/5.jpg">
                                    </div>
                                    <span>新店特惠</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/6.jpg">
                                    </div>
                                    <span>准时达</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/7.jpg">
                                    </div>
                                    <span>预订早餐</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/8.jpg">
                                    </div>
                                    <span>土豪推荐</span>
                                </a>
                            </div>
                            <div class="swiper-slide">
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/9.jpg">
                                    </div>
                                    <span>甜品饮品</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/10.jpg">
                                    </div>
                                    <span>商超便利</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/11.jpg">
                                    </div>
                                    <span>美食</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/12.jpg">
                                    </div>
                                    <span>简餐</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/13.jpg">
                                    </div>
                                    <span>新店特惠</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/14.jpg">
                                    </div>
                                    <span>准时达</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/1.jpg">
                                    </div>
                                    <span>预订早餐</span>
                                </a>
                                <a href="javascript:" class="link_to_food">
                                    <div class="food_container">
                                        <img src="./images/nav/2.jpg">
                                    </div>
                                    <span>土豪推荐</span>
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
    export default {
        name: "Msite",
        computed:{
            ...mapState(["address"])
        },
        methods:{
            ...mapActions(["getAddress"])
        },
        components:{
            ShopList,
            HeaderTop
        },
        created(){
            this.getAddress()
        }
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