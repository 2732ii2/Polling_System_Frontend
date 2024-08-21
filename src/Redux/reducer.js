import { getbook } from "../Api";

var initialstate={
    code:"",
    count:[],
    update:false,
    data:[],
    usersession:{}
}


const reducer=(state=initialstate,action)=>{
    console.log(action?.payload);
    if(action.type=="getCode"){
        return {
            ...state,code:action?.payload
        }
    }
    // countofBooks
    else if(action.type=="countofBooks"){
        return {
            ...state,count:action?.payload
        }
    }
    // setupdatecall
    else if (action.type=="addData"){
        return {
            ...state,data:action?.payload
        }
    }
    else if(action.type=="setupdatecall"){
        return {
            ...state,update:!state.update
        }
    }
    else if (action.type == "UserSession"){
        return {
            ...state,usersession:action?.payload
        }
    }
    else
    return state;
}

export default reducer;