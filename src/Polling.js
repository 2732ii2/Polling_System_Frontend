
import React, { useEffect, useState } from 'react'
import Lamborgini from "./l1.jpeg";
import buggati from "./buggati.jpeg";
import keigan from "./Koenigsgg.jpeg";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import io from "socket.io-client";
import { clearData, saveData, serverOn } from './Api';
import { useNavigate } from 'react-router-dom';
const Url="https://polling-application-backend.onrender.com/";
// "http://localhost:3001/"
const socket =io.connect(Url)

export default function Polling() {
    const [recall,setrecall]=useState(false);
    const [state,setstates]=useState([]);
    const arr=[{
        name:`Ashad's Car`,
        img:Lamborgini,
        Price:300 ,
        Poll: state.length?state[0]: 0
    },
    {
        name:`Amaan's Car`,
        img:buggati,
        Price:450 ,
        Poll: state.length?state[1]: 0
    },
    {
        name:`Anas's Car`,
        img:keigan,
        Price:200 ,
        Poll: state.length?state[2]: 0
    }
    ]
    useEffect(()=>{

        socket.emit("polling_room",1);

        socket.on("polling",(data)=>{
            console.log("data=>",data);
            setstates((prev)=>{
                return [...data]
            });
        })
       console.log("recalled updated");
    },[socket,recall])
   const navi= useNavigate();

    useEffect(()=>{
       const id=setTimeout(() => {
        console.log("server is on got hit")
        serverOn();
       }, 3000);
    },[recall])
   
    useEffect(()=>{
        console.log("states updated",state);
    },[state])

    useEffect(()=>{
        socket.on('send_back',(data)=>{
            // var newarr=[data,state[1],state[2]];
            console.log("send_back",data);
            const {name,val}=data;
            console.log(name,val);
            if(name=='first')
            {   
                state[0]=val;
            }
            else if (name=='second'){
                state[1]=val;
            }
            else if (name=='third'){
                state[2]=val;
            }
            console.log(state);
            setstates((prev)=>{
                return [...state]
            });
        })

        // send_back_of_clearing_data
        socket.on('send_back_of_udpated_data',(data)=>{
            console.log(data);
            // var newarr=[data,state[1],state[2]];
            // console.log("send_back",data);
            // const {name,val}=data;
            // console.log(name,val);
            // if(name=='first')
            // {   
            //     state[0]=val;
            // }
            // else if (name=='second'){
            //     state[1]=val;
            // }
            // else if (name=='third'){
            //     state[2]=val;
            // }
            // console.log(state);
            // setstates((prev)=>{
            //     return [...state]
            // });
        })
        socket.on('send_back_of_clearing_data',(data)=>{
            console.log("send_back_of_clearing_data",data);
            setstates((prev)=>{
                return [...data?.pollsData]
            });
        })

    },[socket,state,recall])
    function ClickHandler(e,index){
        if(state.length!=0)
        console.log(e,index,state);
        if(index==0 && state[0]!=0)
        socket.emit(`first`,[1,state[0]+=100]);
        else if(index==1 && state[1]!=0)
        socket.emit(`second`,[1,state[1]+=100]);
        else if(index==2 && state[2]!=0)
        socket.emit(`third`,[1,state[2]+=100]);
    }
  return (
    <div style={{width:"100%",height:"100vh",display:"flex",flexDirection:"column",justifyContent:'center',alignItems:"center",gap:"50px"}}>
        <div style={{width:"80%",height:"70px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",alignItems:"center",marginBottom:"10px",marginTop:"10px"}}>
            {/* <div onClick={()=>navi("/")} style={{position:"abs"}}> <KeyboardBackspaceIcon /> </div> */}
            <div onClick={()=>navi("/")} style={{position:"absolute",top:"3%",left:"3%"}}> <KeyboardBackspaceIcon /> </div>
            <h1 >Which is your favourite Car ? </h1>
            <div style={{width:"auto",display:"flex",gap:"10px",justifyContent:"center",alignItems:"center"}}>
            <button onClick={()=>{
                console.log(state);
                // clearData();
                setrecall(!recall);
                socket.emit("clear_data",[1]);
            }} style={{border:"1px solid red",background:"rgba(200,0,0,.4)",color:"red",padding:"8px",paddingLeft:"10px",paddingRight:"10px",borderRadius:"4px",fontSize:"14px",letterSpacing:"1px",cursor:"pointer"}}>Clear Result</button>
            <button onClick={()=>{
                console.log(state);
                saveData(state);
                socket.emit("update_data",[1]);
                setrecall(!recall);
            }} style={{background:"black",color:"white",padding:"8px",paddingLeft:"10px",paddingRight:"10px",borderRadius:"4px",fontSize:"14px",letterSpacing:"1px",cursor:"pointer"}}>Save Result</button>
            </div>
        </div>
        <div style={{width:"80%" ,height:"90%" ,display:"flex",justifyContent:"space-between",flexWrap:"wrap",transition:"all 1s",overflow:"scroll",gap:"10px",paddingTop:"10px",paddingBottom:"10px"}}>

            {
                arr.map((e,i)=>{
                    return <div key={i} style={{width:"32%",minWidth:"300px",height:"400px",border:"1px solid rgba(0,0,0,.2)",borderRadius:"10px",overflow:"hidden"}}>
                        <img src={e.img} style={{width:"100%",height:"50%",objectFit:"cover"}} />
                        <div style={{width:"90%",height:"50px",marginLeft:"auto",letterSpacing:"1px",fontWeight:600,marginRight:"auto",border:"1px solid rgba(0,0,0,.1)",marginTop:"20px",paddingLeft:"8px",paddingRight:"8px",display:"flex",justifyContent:"space-between",alignItems:'center'}}>

                            {e.name}
                           <div style={{border:"1px solid rgba(180,0,0,.5)",background:"rgba(180,0,0,.3)",letterSpacing:"1px",fontWeight:400,color:"red",padding:"4px",paddingLeft:"8px",paddingRight:"8px",borderRadius:"5px"}}> {`$ ${e.Price} ` }</div>
                        </div>
                        <div style={{width:"90%",height:"50px",marginLeft:"auto",letterSpacing:"1px",fontWeight:600,marginRight:"auto",border:"1px solid rgba(0,0,0,.1)",marginTop:"20px",paddingLeft:"8px",paddingRight:"8px",display:"flex",justifyContent:"space-between",alignItems:'center'}}>
                        Polling Count
                       <div style={{width:"auto",display:"flex",gap:"5px"}}>
                        <button onClick={()=>ClickHandler(e,i)} style={{paddingLeft:"10px",paddingRight:"10px",justifyContent:"center",alignItems:'center',display:"flex",background:"rgba(0,0,0,.6)",cursor:"pointer",color:"white",fontSize:"16px",borderRadius:"5px"}} >+</button>
                       <div style={{border:"1px solid rgba(100,0,0,.5)",transition:"all 1s",background:"rgba(100,0,0,.3)",letterSpacing:"1px",fontWeight:400,color:"white",padding:"4px",paddingLeft:"8px",paddingRight:"8px",borderRadius:"5px"}}> {` ${e.Poll} ` }</div>
                       </div>
                        </div>
                    </div>
                })
            }
        </div>
        
    </div>
  )
}
