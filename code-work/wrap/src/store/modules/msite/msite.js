import {GETADDRESS, GETCATEGORIES, GETSHOPS} from "../../mutation_types";

import $http from "@/api"
const OK = 0;
export default {
    state:{
        baseImgUrl:"https://fuss10.elemecdn.com",
        latitude: 40.10038, // 纬度
        longitude: 116.36867, // 经度
        address: {}, // 地址信息对象
        shops:[],
        categories:[],
    },
    getters:{},
    mutations:{
        [GETADDRESS](state,address){
            state.address = address
        },
        [GETSHOPS](state,shops){
            state.shops = shops
        },
        [GETCATEGORIES](state,categories){
            state.categories = categories
        },
    },
    actions:{
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
        async getCategories(store){
            const body = await $http.msite.getCategories()
            if(body.code===OK){
                store.commit(GETCATEGORIES,body.data)
            }
        },
    }
}