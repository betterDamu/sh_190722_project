<template>
    <div class="stars" :class="`stars-${size}`">
       <div class="star" v-for="item in starArr" :class="item"></div>
    </div>
</template>

<script>
    const Length = 5;
    const ON = "on";
    const HALF = "half";
    const OFF = "off";
    export default {
        props:{
          size:String,
          score:Number
        },
        computed:{
            starArr(){
                var arr = [];
                // 0.3 0.6  0.9  1.2  2.6  3.7  4.1
                const score = Math.floor((this.score * 2))/2;
                const needHalf = (score % 1) === 0  ? false : true;
                const onLength = Math.floor(score)
                for(let i=0;i<onLength;i++){
                    arr.push(ON)
                }
                if(needHalf){
                    arr.push(HALF)
                }
                while (arr.length < Length){
                    arr.push(OFF)
                }
                return arr;
            }
        },
        name: "ele-stars"
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .stars
        display inline-flex
        .star
            background-size 100% 100%
            background-repeat no-repeat
        &.stars-48
            .star
                width 20px
                height 20px
                margin-right 20px
                &:last-child
                    margin-right 0
                &.on
                    bg-image(star48_on)
                &.half
                    bg-image(star48_half)
                &.off
                    bg-image(star48_off)
        &.stars-36
            .star
                width 15px
                height 15px
                margin-right 15px
                &:last-child
                    margin-right 0
                &.on
                    bg-image(star36_on)
                &.half
                    bg-image(star36_half)
                &.off
                    bg-image(star36_off)
        &.stars-24
            .star
                width 10px
                height 10px
                margin-right 10px
                &:last-child
                    margin-right 0
                &.on
                    bg-image(star24_on)
                &.half
                    bg-image(star24_half)
                &.off
                    bg-image(star24_off)
</style>