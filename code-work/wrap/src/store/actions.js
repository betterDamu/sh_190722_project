import {GETADDRESS,GETSHOPS,GETCATEGORIES} from "./mutation_types"
import $http from "@/api"
const OK = 0;
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
    async getCategories(store){
        const body = await $http.msite.getCategories()
        if(body.code===OK){
            store.commit(GETCATEGORIES,body.data)
        }
    }
}