import {AUTOLOGIN, GETUSER, RESTUSER} from "../../mutation_types";
import {Toast} from "vant";

import $http from "@/api"
import router from "@/router"
const OK = 0;
const ERROR = 1;
function loginSuccess(commit,user,resetData){
    //将user存到vuex的仓库中
    commit(GETUSER,user)
    //跳转到主页
    router.replace("/Msite")
    //清空界面上的登录信息
    // resetData()
    //将返回的token进行持久化
    localStorage.setItem("ele-token",user.token)
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
    // resetData()
}
export default {
    state:{
        user:{},
        token:localStorage.getItem("ele-token")
    },
    getters:{},
    mutations:{
        [GETUSER](state,user){
            state.user = user;
            state.token = user.token;
        },
        [RESTUSER](state){
            state.user = {}
            state.token = ""
        },
        [AUTOLOGIN](state,user){
            state.user = user
        }
    },
    actions:{
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
            localStorage.removeItem("ele-token")
            router.replace("/Login")
        },
        async autoLogin({commit}){
            try{
                const body = await $http.msite.autoLogin()
                if(body.code === OK){
                    //代表token没有失效 在数据库中有对应的用户
                    commit(AUTOLOGIN,body.data)
                }else if(body.code === ERROR){
                    //代表进入的时候没有Token
                    Toast({
                        type:"fail",
                        message: body.msg ,
                        duration:2000,
                        onClose(){
                            router.replace("/Login")
                        }
                    })
                }
            }catch (e) {
                //代表进入的时候Token过期 之前的登录信息应该清除
                commit(RESTUSER)
                localStorage.removeItem("ele-token")
                Toast({
                    type:"fail",
                    message: e.response.data.message ,
                    duration:2000,
                    onClose(){
                        router.replace("/Login")
                    }
                })
            }
        }
    }
}