import VueRouter from "vue-router";
import Vue from "vue";
import routes from "@/routes"
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

export default new VueRouter({
    routes,
    linkActiveClass:"active"
})