<template>
    <div class="ratings-filter">
        <div class="rating-type border-1px">
            <span   @click="select(2)"
                  class="block" :class="{active:selectType===2}">
                全部<span class="count">{{ratings.length}}</span>
          </span>
           <span   @click="select(0)"
                   class="block" :class="{active:selectType===0}">
                推荐<span class="count">{{ratings.filter( rating => rating.rateType === 0 ).length}}</span>
          </span>
           <span    @click="select(1)"
                   class="block" :class="{active:selectType===1}">
                吐槽<span class="count">{{ratings.filter( rating => rating.rateType === 1 ).length}}</span>
          </span>
        </div>
        <div class="switch" :class="{on:onlyText}">
            <span class="iconfont icon-check_circle" @click="switchText"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>


<script>
    export default {
        name: "ele-select",
        props:{
            selectType:Number,
            onlyText:Boolean,
            switchText:Function,
            ratings:Array
        },
        methods:{
            select(type){
                this.$emit("select",type)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"

    .ratings-filter
        .rating-type
            bottom-border-1px(rgba(7, 17, 27, 0.1))
            padding 18px 0
            margin 0 18px
            font-size 0
            .block
                display: inline-block
                padding: 8px 12px
                margin-right: 8px
                line-height: 16px
                border-radius: 1px
                font-size: 12px
                color: rgb(77, 85, 93)
                background: rgba(77, 85, 93, 0.2)
                &.active
                    background: $green
                    color: #fff
                .count
                    margin-left: 2px
                    font-size: 8px
        .switch
            padding: 12px 18px
            line-height: 24px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            color: rgb(147, 153, 159)
            font-size: 0
            &.on
                .icon-check_circle
                    color: $green
            .icon-check_circle
                display: inline-block
                vertical-align: top
                margin-right: 4px
                font-size: 24px
            .text
                display: inline-block
                vertical-align: top
                font-size: 12px
</style>

