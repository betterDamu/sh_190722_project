import axios from "axios"
const axiosObj = axios.create({
  // baseURL:"http://localhost:4000",
  timeout:15000
})

axiosObj.interceptors.request.use(function (config) {
    if (config.url === "/4000/position") {
        config.url = `${config.url}/${config.params.latitude},${config.params.longitude}`;
        config.params={}
    }
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
