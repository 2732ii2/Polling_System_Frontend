import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Main() {
   const navi= useNavigate();
  return (
    <div style={{width:"100%",height:"100vh",display:'flex',flexDirection:"column",alignItems:"center",justifyContent:'center',gap:"20px"}}>
        
            <button onClick={()=>{
                navi("/home");
            }} style={{width:"150px",height:"35px",border:"none",background:"black",color:"white",fontSize:"16px",borderRadius:"4px"}}>Messaging</button>
            <button onClick={()=>{
                navi("/polling");
            }}  style={{width:"150px",height:"35px",border:"none",background:"black",color:"white",fontSize:"16px",borderRadius:"4px"}}> Polling</button>
    </div>
  )
}
