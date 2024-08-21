

const GetCode =(data)=>{
    return {
        type:"getCode",
        payload:data,
    }
}
const countofBooks =(data)=>{
    return {
        type:"countofBooks",
        payload:data,
    }
}
const setupdatecall ={
        type:"setupdatecall",
}
const ApiDataAddition=(data)=>{
    return {
        type:"addData",
        payload:data
    }
}
const AddUserSession=(data)=>{
    return {
        type:"UserSession",
        payload:data,
    }
}
export {GetCode,countofBooks,setupdatecall,ApiDataAddition,AddUserSession}