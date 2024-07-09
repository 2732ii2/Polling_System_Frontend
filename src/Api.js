
import axios from "axios";

const Url="https://polling-application-backend.onrender.com/";
// http://localhost:3001/

const saveData=async(data)=>{
    try{
        const resp=await axios.post(`${Url}save`,data);
        console.log(resp);
    }
    catch(e){
        console.log(e?.message);
    }
}
const serverOn=async(data)=>{
    try{
        const resp=await axios.get(`${Url}`);
        console.log(resp);
    }
    catch(e){
        console.log(e?.message);
    }
}
const clearData=async()=>{
    try{
        const resp=await axios.post(`${Url}clear`,{});
        console.log(resp);
    }
    catch(e){
        console.log(e?.message);
    }
}
export {saveData,clearData,serverOn};