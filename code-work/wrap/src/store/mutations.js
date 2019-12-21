import {GETADDRESS,GETSHOPS,GETCATEGORIES,GETUSER} from "./mutation_types"
export default {
    [GETADDRESS](state,address){
        state.address = address
    },
    [GETSHOPS](state,shops){
        state.shops = shops
    },
    [GETCATEGORIES](state,categories){
        state.categories = categories
    },
    [GETUSER](state,user){
        state.user = user
    }
}