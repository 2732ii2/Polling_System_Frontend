import React from 'react'

import { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const Url="https://polling-application-backend.onrender.com/";
const socket =io.connect(Url);

export default function Home() {
  const navi=useNavigate();
    const [inputvalue, setinputvalue]=useState("");
  const [states,setstates]=useState([]);
  const [room_id,setroom_id]=useState(0);
  const ChangeHandler=(e)=>{
    setinputvalue(e.target.value)
  }

  

  useEffect(()=>{
    socket.on('received',(data)=>{
      console.log(data);
      setstates((prev)=>{
        return [...prev,data]
      })
    })
  },[socket])
  return (
    <div  style={{width:"100%",height:"100vh",display:"flex",flexDirection:"column",justifyContent:'center',gap:"10px",alignItems:"center"}}>
      <div onClick={()=>navi("/")} style={{position:"absolute",top:"20px",left:"50px"}}> <KeyboardBackspaceIcon /> </div>
    <div style={{display:"flex",justifyContent:'center',gap:"10px",alignItems:"center"}}>  <input style={{height:"25px",border:"1px solid rgba(0,0,0,.2)",paddingLeft:"5px"}} onChange={(e)=>setroom_id(e.target.value)} value={room_id}  />
    <button onClick={()=>{

          socket.emit("join_room",room_id);
        }} style={{height:"25px",padding:"5px",border:"1px solid rgba(0,0,0,.2)",background:"transparent"}}>Join</button>
  </div>
  <div style={{display:"flex",justifyContent:'center',gap:"10px",alignItems:"center"}}>  <input style={{height:"35px",border:"1px solid rgba(0,0,0,.2)",paddingLeft:"5px"}} onChange={ChangeHandler} value={inputvalue}  />
    <button onClick={()=>{
          console.log(inputvalue);
          setstates((prev)=>{
            return [...prev,inputvalue]
          })
          socket.emit("client",{"inputvalue":[inputvalue,"ashad"],room_id});
        }} style={{height:"35px",padding:"5px",border:"1px solid rgba(0,0,0,.2)",background:"transparent"}}>Send</button>
  </div>
  

 {room_id ? <div style={{marginTop:"20px",width:"200px",height:"300px",border:"1px solid black"}}>
    
 {
    states?.length? <div>{
      
      states.map((e,i)=>{
        if(e.length==2)
        return <div key={i} style={{width:"40%",marginTop:"20px",marginLeft:"60%",height:'auto',padding:"2px",display:"flex",flexDirection:"column",background:"rgba(0,0,0,.2)",borderRadius:"10px"}}>
          <h5>{e[0]}</h5>
          <div style={{height:"90%"}}>
            {e[1]}
          </div>
          </div>
    else
      return <div key={i} style={{width:"40%",marginTop:"20px",height:'auto',padding:"2px",display:"flex",flexDirection:"column",background:"rgba(0,0,0,.2)",borderRadius:"10px"}}>
      <h5>amaan</h5>
      <div style={{height:"90%"}}>
        {e}
      </div>
      </div>
      })

      }</div>:null
  }

  </div>
  :null
  }

  </div>
  )
}
