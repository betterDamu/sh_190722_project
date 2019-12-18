<template>
    <div class="goods">
        <div class="menu-wrap" ref="menuWrap">
            <ul class="menu-list" ref="menuList">
                <li v-for="(good,index) in goods" class="menu-item"
                    :class="{active:currentIndex === index}" @click="handleCForMenuList(index)">
                    <ele-icon class="icon" :size="3" :type="good.type" v-show="good.type >= 0"></ele-icon>
                    <span class="text">{{good.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foods-wrap" ref="foodsWrap">
            <ul class="foods-list" ref="foodsList">
                <li class="foods-item" v-for="(good,goodIndex) in goods">
                    <h2 class="title">{{good.name}}</h2>
                    <ul class="food-list">
                        <li class="food-item" v-for="(food,foodIndex) in good.foods" >
                            <div class="left">
                                <img :src="food.icon">
                            </div>
                            <div class="right">
                                <div class="name">{{food.name}}</div>
                                <div class="description">{{food.description}}</div>
                                <div class="others">
                                    <span class="sellCount">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="prices">
                                    <span class="nowPrice">¥{{food.price}}</span>
                                    <span class="oldPrice" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                                </div>
                                <ele-control :food="food" class="control"
                                    @addCount="addCount"  @removeCount="removeCount"
                                    :goodIndex="goodIndex" :foodIndex="foodIndex"></ele-control>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <ele-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"
                  :selectedFoods="selectedFoods" @clear="clear"
                    @addCount="addCount" @removeCount="removeCount"></ele-cart>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import icon from "components/ele-icon/ele-icon"
    import control from "components/ele-control/ele-contorl"
    import cart from "components/ele-cart/ele-cart.vue"
    const OK = 0;
    export default {
        name: "ele-goods",
        props:{
            seller:Object
        },
        data(){
          return{
              goods:[],
              scrollY:0,
              tops:[]
          }
        },
        computed:{
            selectedFoods(){
              let selectedFoods = [];
              this.goods.forEach((good)=>{
                  good.foods.forEach((food)=>{
                      if(food.count > 0){
                          selectedFoods.push(food)
                      }
                  })
              })
              return selectedFoods;
            },
            currentIndex(){
                //依赖于右侧列表的滑动位置
                let {tops,scrollY} = this;
                let index =tops.findIndex((top,index)=>{
                    return scrollY >=top && scrollY < tops[index+1]
                })

                //左侧列表到置顶
                if(index !== this.oldindex){
                    this.oldindex = index;
                    var liNode = this.$refs.menuList.children[index];
                    this.menuScroll.scrollToElement(liNode,300)
                }
                return index
            }
        },
        components:{
            "ele-icon":icon,
            "ele-control":control,
            "ele-cart":cart
        },
        methods:{
            clear(){
                this.selectedFoods.forEach((selectedFood)=>{
                    selectedFood.count = 0;
                })
            },
            addCount(food){
               /* let food = this.goods.find( (good,index)=> index === goodIndex )
                    .foods.find((food,index) => index ===  foodIndex);*/

                if(!food.count){
                    this.$set(food,"count",1)
                }else {
                    food.count++
                }
            },
            removeCount(food){
               /* let food = this.goods.find( (good,index)=> index === goodIndex )
                    .foods.find((food,index) => index ===  foodIndex);*/
                if(food.count > 0){
                    food.count--
                }
            },
            handleCForMenuList(index){
                const top = this.tops[index];
                this.foodsScroll.scrollTo(0,-top,300)
            },
            _initScroll(){
                this.menuScroll = new BScroll(this.$refs.menuWrap,{
                    click:true
                })
                this.foodsScroll = new BScroll(this.$refs.foodsWrap,{
                    click:true,
                    probeType:3
                })
                this.foodsScroll.on("scroll",({x,y})=>{
                    this.scrollY = Math.abs(y)
                })
            },
            _initTops(){
                let liNodes = this.$refs.foodsList.children;
                let top = 0;
                let tops = [top];
                Array.from(liNodes).forEach((liNode)=>{
                    top += liNode.offsetHeight;
                    tops.push(top)
                })
                this.tops = tops;
            }
        },
        async mounted(){
            const  {errno,body} = await this.$http.goods.getGoods()
            if(errno === OK){
                this.goods = body
            }
            //滑屏
            this._initScroll();
            this.$nextTick(()=>{
                this._initTops()
            })
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        display flex
        position absolute
        left 0
        right 0
        top 174px
        bottom 48px
        overflow hidden
        .menu-wrap
            flex 0 0 80px
            .menu-list
                .menu-item
                    one-px(rgba(7,17,27,0.1))
                    display flex
                    align-items center
                    justify-content center
                    width 100%
                    height 54px
                    background #f3f5f7
                    &::after
                        width 56px
                    &.active
                        background pink
                    .icon
                        margin-right 2px
                    .text
                        font-size 12px
                        line-height 14px
                        color rgba(7,17,27,1)
        .foods-wrap
            flex 1
            .foods-list
                .foods-item
                    .title
                        height 26px
                        background #f3f5f7
                        font-size 12px
                        line-height 26px
                        color rgba(147,153,159,1)
                        border-left 4px solid #d9dde1
                        padding-left 14px
                    .food-list
                        .food-item
                            position relative
                            one-px(rgba(7,17,27,0.3))
                            padding 18px
                            display flex
                            &::after
                                width 88%
                            &:last-child
                                 border-none()
                            .left
                                flex 0 0 80px
                                margin-right 10px
                                img
                                    width 100%
                                    height 93%
                            .right
                                flex 1
                                .name
                                    font-size 14px
                                    line-height 14px
                                    color rgba(7,17,27,1)
                                    margin-top 2px
                                    margin-bottom 8px
                                .description
                                    font-size 10px
                                    line-height 10px
                                    color rgba(147,153,159,1)
                                .others
                                    font-size 14px
                                    line-height 14px
                                    color rgba(147,153,159,1)
                                    margin-top 8px
                                    margin-bottom 8px
                                .prices
                                    .nowPrice
                                        margin-right 8px
                                        font-size 14px
                                        color rgba(240,20,20,1)
                                        line-height 24px
                                        font-weight 700
                                    .oldPrice
                                        font-size 10px
                                        color rgba(240,20,20,1)
                                        line-height 24px
                                        font-weight 700
                                        text-decoration line-through

                                .control
                                    position absolute
                                    right 18px
                                    bottom 18px
</style>