
import  toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
const Url="https://polling-application-backend.onrender.com/";
// const Url= "http://localhost:3001/";

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
const addbook=async(data)=>{
    try{
        const resp=await axios.post(`${Url}addbook`,data);
        return (resp);
    }
    catch(e){
        console.log(e?.message);
    }
}
const getbook=async()=>{
    try{
        const resp=await axios.get(` ${Url}getbook`);
        // console.log("resp-",resp.data.data);
        return (resp.data.data);
    }
    catch(e){
        console.log(e?.message);
        // toast.error(e?.message);
        return {mess:e?.message};
    }
}

const deletebyid=async(id)=>{
    console.log(id);
    try{
        const resp=await axios.post(`${Url}deletebyid`,{"id": id});
        console.log("resp-",resp.data.data);
        return (resp.data.data);
    }
    catch(e){
        console.log(e?.message);
        // toast.error(e?.message);
        return {mess:e?.message};
    }
}
// borrow
const BorrowBook=async (data)=>{
 try{
    const resp=await axios.post(`${Url}borrow`,data);
    console.log(resp?.data);
    return (resp.data);
 }
 catch(e){
    console.log(e);
    return {mess:e?.message};
 }
}

const EditBook=async ({id,obj})=>{
    try{
       const resp=await axios.post(`${Url}updatebook`,{id,data:obj});
       console.log(resp);
    
       return (resp.data.data);
    }
    catch(e){
       console.log(e);
       return {mess:e?.message};
    }
   }
const SignIn=async(data)=>{
    try{
        const resp=await axios.post(`${Url}signin`,data);
        console.log(resp?.data);
        return resp?.data
    }
    catch(e){
        console.log(e?.message);
        return {mess:e?.message};
    }
}

export {saveData,clearData,SignIn,serverOn,addbook,getbook,deletebyid,BorrowBook,EditBook};