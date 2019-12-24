import VueRouter from "vue-router";
import Vue from "vue";
import routes from "@/routes"
import store from "@/store"
Vue.use(VueRouter);


//消除编程式导航的错误提醒
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}


const router = new VueRouter({
    routes,
    linkActiveClass:"active"
})

//路由守卫(全局前置守卫)
router.beforeEach(async (to, from, next) => {
    if(to.path !== '/Login'){
        await store.dispatch("autoLogin")
        if(store.state.login.user._id){
            next()
        }else{

            next('/Login')
        }
    }else {
        next()
    }
})

router.beforeResolve((to, from, next)=>{
    next()
})

router.afterEach((to, from) => {})

export default router