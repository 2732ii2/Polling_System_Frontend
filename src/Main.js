import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getbook } from './Api';
import {useDispatch} from "react-redux";
import {ApiDataAddition} from "./Redux/actions";
export default function Main() {
   const navi= useNavigate();
  
  return (
    <div style={{width:"100%",height:"100vh",display:'flex',flexDirection:"column",alignItems:"center",justifyContent:'center',gap:"20px"}}>
        
            {/* <button onClick={()=>{
                navi("/home");
            }} style={{width:"150px",height:"35px",border:"none",background:"black",color:"white",fontSize:"16px",borderRadius:"4px"}}>Messaging</button>
            <button onClick={()=>{
                navi("/polling");
            }}  style={{width:"150px",height:"35px",border:"none",background:"black",color:"white",fontSize:"16px",borderRadius:"4px"}}> Polling</button>
                        <button onClick={()=>{
                navi("/dashboard");
            }}  style={{width:"150px",height:"35px",border:"none",background:"black",color:"white",fontSize:"16px",borderRadius:"4px"}}> Dashboard</button> */}
            {/* <button onClick={()=>{
                navi("/mediaplayer");
            }}  style={{width:"150px",height:"35px",border:"none",background:"black",color:"white",fontSize:"16px",borderRadius:"4px"}}> Songs</button> */}
                        <button onClick={()=>{
                navi("/library");
            }}  style={{width:"150px",height:"35px",border:"none",background:"black",color:"white",fontSize:"16px",borderRadius:"4px"}}> Library</button>
    </div>
  )
}
