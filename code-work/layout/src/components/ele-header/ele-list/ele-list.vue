<template>
    <ul class="list">
        <li class="item" v-for="support in supports">
            <ele-icon  class="icon" :size="2" :type="support.type"></ele-icon>
            <span class="text">{{support.content}}</span>
        </li>
    </ul>
</template>

<script>
    import icon from "components/ele-icon/ele-icon.vue"
    export default {
        name: "ele-list",
        props:{
            supports:Array
        },
        components:{
            "ele-icon":icon
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../../common/stylus/mixin.styl"
    .list
        box-sizing border-box
        width 80%
        text-align left
        margin 0 auto
        margin-top 24px
        margin-bottom 28px
        padding 0 12px
        .item
            font-size 12px
            line-height 12px
            color rgba(255,255,255,1)
            margin-bottom 12px
            &:last-child
                margin-bottom 0px
            .icon
                margin-right 6px
                vertical-align middle
</style>