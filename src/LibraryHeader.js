import React,{useEffect,useState} from 'react'
import LMSIcon from "./libraryicon.jpeg";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AddUserSession } from './Redux/actions';
export default function LibraryHeader() {
  const navi=useNavigate();
  const select=useSelector(state=>state);
  var type=(select?.usersession?.userprofile?.type);
  const [submenu,setsubmenu]=useState(false);
  // useEffect(()=>{
  //   console.log(select);
    
  // },[select])
  const dispatch=useDispatch();
  const localSavedSession=JSON.parse(localStorage.getItem("usersession"));
  if(localSavedSession){
      if(!select?.usersession?.userprofile)
      dispatch(AddUserSession(localSavedSession)); 
  }
  const list=["Profile",type =="admin"?"Dashboard":type=="user"?"Favourites":"Add Book","LogOut"];
  function clickHandler(index){
    if(index == 2){
      dispatch(AddUserSession({})); 
      localStorage.removeItem("usersession");
      navi("/")
    }
    else if (index==1){
      if(type=="admin"){
        navi("/admin");
      }
      else if (type=="user"){
        navi("/save");
      }
      else{
        navi("/addbook")
      }
     
    }
  }
  return (
    <div className='header relative w-[100%] h-[100px]  bg-[white]  flex justify-between items-center px-[50px]'>
    <div  onClick={()=>{
        navi("/");
       }} className='icon  cursor-pointer w-[auto] h-[80px] flex items-center gap-[10px] '>
        <img src={LMSIcon} className='w-[80px] h-[80px]   ' />
       <div className='text-[32px] spec'> <strong>C</strong>entral  <strong>L</strong>ibrary</div>
    </div>
    <div className='Login '>
{
select?.usersession?.userprofile ? <div onClick={()=>setsubmenu(!submenu)} className="w-[40px] capitalize cursor-pointer unselect rounded-[50%] bg-[black] text-[white] h-[40px] flex items-center justify-center ">
{ select?.usersession?.userprofile?select?.usersession?.userprofile?.UserName[0]:"A"}

{ submenu &&
<div className="w-[150px] z-50 bg-[black] h-[auto] !top-[100px] rounded-[5px] right-[40px] absolute flex flex-col">
{
  list.map((e,i)=>{
    return <div onClick={()=>clickHandler(i)} className="min-h-[50px] w-[100%] hover:tracking-wider font-semibold cursor-pointer flex items-center pl-4 border-b-[1px] border-[white] text-white">{e}</div>
  })
}
</div>
}
</div>:

        <button onClick={()=>{
          navi("/login");
        }} className='bg-[black] w-[100px] h-[40px] text-white rounded-md active:scale-50  selection:default:false transition-all'>Login</button>
    }
    
    </div>
    </div>
  )
}
