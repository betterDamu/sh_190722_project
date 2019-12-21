import {GETADDRESS,GETSHOPS,GETCATEGORIES,GETUSER} from "./mutation_types"
import $http from "@/api"
const OK = 0;
const ERROR = 1;


function loginSuccess(commit,user){
    commit(GETUSER,user)
}
function loginFail(error){}

export default {
    async getAddress(store){
        const body = await $http.msite.getPosition({
            "latitude": store.state.latitude,
            "longitude": store.state.longitude
        })

        if(body.code===OK){
            store.commit(GETADDRESS,body.data)
        }
    },
    async getShops(store){
        const body = await $http.msite.getShops({
            "latitude": store.state.latitude,
            "longitude": store.state.longitude
        })

        if(body.code===OK){
            store.commit(GETSHOPS,body.data)
        }
    },
    async getCategories(store,cb){
        const body = await $http.msite.getCategories()
        if(body.code===OK){
            store.commit(GETCATEGORIES,body.data)
            //typeof cb === "function" && cb()
        }
    },
    async getUser({commit},{loginWay,phone,code,name,pwd,captcha}){
        let body = ""
        if(loginWay === "message"){
            body = await $http.login.loginSms({
                phone,
                code
            })
        }else if(loginWay === "password"){
            body = await $http.login.loginPwd({
                name,
                pwd,
                captcha
            })
        }

        body.code === OK && loginSuccess(commit,body.data)
        body.code === ERROR && loginFail(body.data)

    }
}