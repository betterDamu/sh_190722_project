import Vue from "vue"
import Vee_validate from "vee-validate"
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(Vee_validate)


Vee_validate.Validator.localize('zh_CN', {
    messages: zh_CN.messages,
    attributes: {
        phone: '该手机号码',
        code:"该验证码",
        name:"用户名",
        pwd:"密码",
        captcha:"验证码"
    }
})

Vee_validate.Validator.extend('mobile', {
    validate: value => {
        return /^1\d{10}$/.test(value)
    },
    getMessage: field => field + '必须是11位手机号码'
})