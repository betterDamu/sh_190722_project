import goods from "pages/ele-goods/ele-goods.vue"
import ratings from "pages/ele-ratings.vue"
import sellers from "pages/ele-sellers.vue"

export default [
    {path:"/goods",component:goods},
    {path:"/ratings",component:ratings},
    {path:"/sellers",component:sellers},
    {path:"/",redirect:"/goods"}
]