import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
import login from "./modules/login/login"
import msite from "./modules/msite/msite"
export default new Vuex.Store({
    modules:{
        login,
        msite
    }
})