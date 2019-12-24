import store from "@/store"
import Profile from "pages/Profile/Profile";
import Msite from "pages/Msite/Msite";
import Order from "pages/Order/Order";
import Search from "pages/Search/Search";
import Login from "pages/Login/Login";
import UserDetail from "pages/UserDetail/UserDetail";
import Shop from "pages/Shop/Shop";
import Defined from "pages/Defined/Defined";
/*
import goods from "pages/ele-goods/ele-goods.vue"
import ratings from "pages/ele-ratings/ele-ratings.vue"
import sellers from "pages/ele-sellers/ele-sellers.vue"
*/
const goods = () => import(/* webpackChunkName: "goods" */ "pages/ele-goods/ele-goods.vue")
const ratings = () => import(/* webpackChunkName: "ratings" */ "pages/ele-ratings/ele-ratings.vue")
const sellers = () => import(/* webpackChunkName: "sellers" */ "pages/ele-sellers/ele-sellers.vue")
export default [
    {path:"/Search",component:Search,meta:{showFooter:true}},
    {path:"/Profile",component:Profile,meta:{showFooter:true}},
    {path:"/Order",component:Order,meta:{showFooter:true}},
    {path:"/Msite",component:Msite,meta:{showFooter:true}},
    {
        path:"/Login",
                component:Login,
                beforeEnter: (to, from, next) => {
                if(store.state.login.user._id){
                    next("/Msite")
                }else {
                    next()
                }
        }
    },
    {path:"/UserDetail",component:UserDetail},
    {
        path:"/Defined",
        component:Defined,
        beforeEnter: (to, from, next) => {
           console.log("路由独享")
           next()
        }
    },
    {
        path:"/Shop/:id",
        component:Shop,
        props:true,
        children:[
            {path:"goods",component:goods},
            {path:"ratings",component:ratings},
            {path:"sellers",component:sellers},
            {path:"",redirect:"goods"},
        ]
    },
    {path:"/",redirect:"/Msite"}
]