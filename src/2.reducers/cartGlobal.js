const INITIAL_STATE={cartlength:0,cart:[]}

export default (state=INITIAL_STATE,action)=>{
    if(action.type=="ADD_CART"){
        return {...INITIAL_STATE,cartlength:action.payload.length}
    } else if(action.type="CART_SAVE") {
        return {...INITIAL_STATE,cart:action.payload}
    } else if(action.type="EMPTY_CART") {
        return INITIAL_STATE
    }
    else
    {
        return state
    }
}