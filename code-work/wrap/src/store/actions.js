import {GETADDRESS,GETSHOPS,GETCATEGORIES,GETUSER,RESTUSER} from "./mutation_types"
import $http from "@/api"
import router from "@/router"
import {Toast} from "vant"
const OK = 0;
const ERROR = 1;



function loginSuccess(commit,user,resetData){
    commit(GETUSER,user)
    //跳转到个人中心
    router.replace("/Msite")
    //清空界面上的登录信息
    resetData()
}
function loginFail(error,loginWay,getCaptcha,resetData){
    Toast.fail("登录失败 请检验参数",{
        duration:3000
    })
    //更新图片验证码(用户名 密码)
    if(loginWay === "password"){
        getCaptcha()
    }
    //清空界面上的登录信息
    resetData()
}

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
    async getUser({commit},{loginWay,phone,code,name,pwd,captcha,getCaptcha,resetData}){
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

        body.code === OK && loginSuccess(commit,body.data,resetData)
        body.code === ERROR && loginFail(body.data,loginWay,getCaptcha,resetData)

    },
    resetUser({commit}){
        commit(RESTUSER)
        router.replace("/Login")
    }
}