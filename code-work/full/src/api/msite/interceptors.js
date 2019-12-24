import axios from "axios"
import store from "@/store"
import router from "@/router"
import {Toast} from "vant"
const axiosObj = axios.create({
  // baseURL:"http://localhost:4000",
  timeout:1500
})

axiosObj.interceptors.request.use(function (config) {
    if (config.url === "/4000/position") {
        config.url = `${config.url}/${config.params.latitude},${config.params.longitude}`;
        config.params={}
    }

    //判断出哪些接口是需要携带token
    if(config.headers.needToken){
        config.headers.Authorization = store.state.login.token;
    }
    delete config.headers.needToken

    return config;
}, function (error) {
  return Promise.reject(error);
});


axiosObj.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
    return Promise.reject(error);
});


export default axiosObj
