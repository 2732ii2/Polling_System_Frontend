
const initialstate={
    code:""
}

const reducer=(state=initialstate,action)=>{
    console.log(action?.payload);
    if(action.type=="getCode"){
        return {
            ...state,code:action?.payload
        }
    }
    else
    return state;
}

export default reducer;