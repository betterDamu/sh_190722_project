import {GETADDRESS} from "./mutation_types"
export default {
    [GETADDRESS](state,address){
        state.address = address
    }
}