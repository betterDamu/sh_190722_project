<template>
    <div class="header">
        <i class="damu-close close" @click="$router.replace(`/Msite`)"></i>
        <div class="headerTop">
            <img class="avatar" :src="seller.avatar" alt="">
            <div class="content">
                <div class="title">
                    <i class="brand"></i>
                    <span class="text">{{seller.name}}</span>
                </div>
                <div class="des">
                    <span class="text">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
                </div>
                <div class="supports" v-if="seller.supports">
                    <ele-icon class="icon" :size="1" :type="seller.supports[0].type"></ele-icon>
                    <span class="text">{{seller.supports[0].content}}</span>
                </div>
            </div>
            <div class="btn" @click="maskFlag=true" v-if="seller.supports && seller.supports.length">
                <span class="text" >{{seller.supports.length}}个</span>
                <i class="icon damu-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin"  @click="maskFlag=true">
            <div class="bulletinLeft">
                <i class="icon"></i>
                <span class="text">{{seller.bulletin}}</span>
            </div>
            <i class="arrow damu-keyboard_arrow_right"></i>
        </div>
        <div class="bg">
            <img :src="seller.avatar" alt="">
        </div>
        <transition name="mask">
            <div class="mask" v-show="maskFlag">
                <div class="wrap">
                    <div class="content">
                        <div class="title">{{seller.name}}</div>
                        <ele-stars size="48" :score="seller.score" class="stars"></ele-stars>
                        <ele-line class="line"></ele-line>
                        <ele-list :supports="seller.supports"></ele-list>
                        <ele-line class="line">
                            <span class="text">商家公告</span>
                        </ele-line>
                        <p class="bulletin">
                          {{seller.bulletin}}
                        </p>
                    </div>
                </div>
                <div class="footer">
                    <i class="close damu-close"  @click="maskFlag=false"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import line from "components/ele-line/ele-line.vue"
    import list from "./ele-list/ele-list.vue"
    import stars from "components/ele-stars/ele-stars.vue"
    import icon from "components/ele-icon/ele-icon.vue"
    export default {
        name: "ele-header",
        props:{
          seller:Object
        },
        data(){
          return {
              maskFlag:false
          }
        },
        components:{
            "ele-line":line,
            "ele-list":list,
            "ele-stars":stars,
            "ele-icon":icon
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .header
        position relative
        z-index 1
        font-size 0
        background rgba(7,17,27,.5)
        overflow hidden
        & > .close
            color red;
            font-size 25px;
            position absolute;
            z-index 2
            left 3px
            top 3px
        .headerTop
            position relative
            padding 24px 0 0 24px
            .avatar
                vertical-align top
                width 64px
                height 64px
                border-radius 4px
                margin-bottom 18px
                margin-right 16px
            .content
                vertical-align top
                display inline-block
                .title
                    margin-top 2px
                    margin-bottom 8px
                    .brand
                        bg-image(brand)
                        background-size 100% 100%
                        background-repeat no-repeat
                        vertical-align middle
                        margin-right 6px
                        display inline-block
                        width 30px
                        height 18px
                    .text
                        vertical-align middle
                        font-size 16px
                        font-weight bold
                        color rgba(255,255,255,1)
                        line-height 18px
                .des
                    .text
                        font-size 12px
                        line-height 12px
                        font-weight 200
                        color rgba(255,255,255,1)
                .supports
                    margin-top 10px
                    margin-bottom 2px
                    .icon
                        margin-right 4px
                        vertical-align middle
                    .text
                        vertical-align middle
                        font-size 10px
                        line-height 12px
                        font-weight 200
                        color rgba(255,255,255,1)
            .btn
                position absolute
                right 12px
                bottom 35px
                width 48px
                height 24px
                border-radius 10px
                background rgba(0,0,0,0.2)
                text-align center
                font-size 10px
                line-height 24px
                font-weight 200
                color rgba(255,255,255,1)


        .bg
            position absolute
            left 0
            right  0
            top 0
            bottom 0
            z-index -1
            filter blur(10px)
            img
                width 100%
                height 100%


        & > .bulletin
            position relative
            height 28px
            width 100%
            background rgba(7,17,27,0.2)
            font-size 10px
            font-weight 200
            color rgba(255,255,255,1)
            line-height 28px
            .bulletinLeft
                height 100%
                margin-left 12px
                margin-right 26px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                .icon
                    bg-image(bulletin)
                    background-size 100% 100%
                    background-repeat no-repeat
                    display inline-block
                    width 22px
                    height 12px
                    vertical-align middle
                    margin-right 4px
                .text
                    vertical-align middle


            .arrow
                position absolute
                right 10px
                top 10px
        .mask
            position fixed
            left 0
            right 0
            top 0
            bottom 0
            z-index 9
            background rgba(7,17,27,0.8)
            overflow auto
            font-size 16px
            line-height 16px
            font-weight 700
            color rgba(255,255,255,1)
            .wrap
                min-height 100%
                .content
                    padding-bottom 96px
                    padding-top 64px
                    text-align center
                    .title
                        text-align center
                    .stars
                        margin-top 16px
                        margin-bottom 28px
                    & > .bulletin
                        box-sizing border-box
                        margin 0 auto
                        margin-top 24px
                        width 80%
                        padding 0 12px
                        text-align left
                        font-size 12px
                        line-height 24px
            .footer
                height 32px
                padding-top 32px
                padding-bottom 32px
                text-align center
                margin-top -96px
                .close
                    font-size 32px
                    color rgba(255,255,255,.5)
</style>