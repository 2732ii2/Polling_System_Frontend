
import React, { useEffect } from "react";
import logo from "./books.webp";
import logo2 from "./books2.jpeg";
import axios from "axios";
import {useRef,useState} from "react";
import eye1 from "../Images/eye.png";
import hide from "../Images/hide.png";
import toast,{Toaster} from "react-hot-toast";
import {useDispatch} from "react-redux";
import { AddUserSession } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client"
const socket =io.connect( "http://localhost:3001/");
const Login =()=>{
    const list=[{label:"Email",type:"text"},{
        label:"Password",type:"password"
    }]
    useEffect(()=>{
      socket.emit("loginemits",1);
    },[socket])

    const [states, setstates]=useState({
        Email:"",
        Password:""
    })
    function ChangeEventHandler(e,ele,state,setstates){
        console.log(e,ele.target.value,state,setstates);
        setstates( {
            ...state,[e.label]:ele.target.value
        })
    }
    console.log(states);
    const [show,setshow]=useState(true);
    return <div className="w-[100%] h-[100vh] flex bg-[white]">
        <div className="min-w-[50%] overflow-hidden !transition-all   relative h-[100%] flex items-center justify-center">
            <div className="w-[60%] h-[auto] py-[20px] flex flex-col  ">
                    <div className="w-[100%] relative  flex ">
                        <div className="firstbubble absolute w-[50%] rounded-[20px] -top-[80px] -right-[35px] h-[150px] bg-[red] opacity-[.2]"></div>
                        <div className="firstbubble absolute w-[80%] rounded-[200px] -bottom-[40px] left-[35px] h-[200px] bg-[red] opacity-[.2]"></div>
                        <h1 className="text-[42px] w-[100%] text-center spec ">Welcome to Library Management</h1>
                    </div>
                    <div className="my-[50px]">
                    {
                        list.map((e,i)=>{
                            return  <InputElement states={states} setstates={setstates} ChangeEventHandler={ChangeEventHandler} e={e} key={i}/>
                        })
                        
                        }
                    </div>
                    <button className=" mt-[10px] bg-black w-[auto] mx-auto px-[50px] py-[10px] text-[20px] text-white rounded-[10px]">Login</button>
                    <p className="text-[18px] mt-[20px] w-[100%] text-center unselect">Don't have an account ? Go to <span onClick={()=>{
                        // alert("hellor");
                        setshow(!show)
                    }} className="text-[red] cursor-pointer font-semibold tracking-wider underline">SignUp</span></p>
            </div>
            < SignUp show={show} />
        </div>
        <div className="min-w-[50%] h-[100%] relative flex items-center justify-center  bg-[white]">
            <img src={logo} className=" w-[100%] h-[100%] object-cover opacity-[.9]"/>
        <SignUpComp  show={show} setshow={setshow}/>
        </div>
    </div>
}


export default Login

const InputElement=({e,states,setstates,ChangeEventHandler})=>{
    // states={states} setstates={setstates} ChangeEventHandler={ChangeEventHandler}
    const ref=useRef(null);
    const [setref,setrefState]=useState(false);
    const EventHandler=()=>{
        setrefState(true)
    }
    const [show,sethide]=useState(false);
    useEffect(()=>{
        if(setref && ref){
            ref.current.focus();
        }
    },[setref])
    useEffect(()=>{
        console.log("states",states);
    },[states])
    return <div onClick={EventHandler} className="w-[90%] flex px-[20px] items-center mx-[auto] h-[70px] mt-[20px] bg-white rounded-[10px]">
    <h2 onClick={EventHandler} className="min-w-[150px] unselect tracking-wider   text-[24px]">{e?.label}</h2>
    <input value={states?.[`${e?.label}`]} onChange={(ele)=>{
        return ChangeEventHandler(e,ele,states,setstates);
    }} type={ show ?"text":e?.type} ref={ setref? ref:null} className="!outline-none border-b-[1px] border-[blue] w-[100%] h-[40px]"/>
    
    {
        e?.type=="password"?<img src={!show?hide:eye1} onClick={()=>{
            sethide(!show)
        }} className="w-[auto]  active:scale-50     cursor-pointer h-[20px]"/>:null
    }
    </div>
}



const SignUp=({show})=>{
    return <div className={` min-w-[100%]     bg-black  !transition-all flex items-center justify-center min-h-[100%] absolute ${show?"":"translate-y-[100%]"}`}>
        <img src={logo2} className=" w-[100%]  min-h-[100vh] object-cover   opacity-[.5]"/>
    </div>
}
const SignUpComp=({show,setshow})=>{
    const list=[{label:"UserName",type:"text"},{label:"Email",type:"text"},{
        label:"Password",type:"password"
    }]
    const navi=useNavigate();
   const dispatch=useDispatch();
   const [role,setroles]=useState({
    librarian:false,
    user:false
   })
   console.log(role);
    const SubmitHandler=async()=>{
        //  we have to check whether type of role is selected or not in future 
        const main={...states,"type":Object.keys(role).filter(e=>{
            if(role[e]){
                return e;
            }
           
        })[0]
    };
    console.log(main);
       try{
        const resp= await axios.post("http://localhost:3001/register",main);
        console.log(resp?.data);
        if(resp?.data?.error){
            // condition of error ;
            toast.error(resp?.data?.error);
        }
        else{
            dispatch(AddUserSession(resp?.data));
            socket.emit(`sendupdatedcountofbooks`,[1,'something']);
            localStorage.setItem("usersession",JSON.stringify(resp?.data))
            toast.success(resp?.data?.mess);
            setTimeout(()=>{
               navi("/library");
            },1000)
        }
        setroles({
            librarian:false,
            user:false
           })
        setstates({
            UserName:"",
            Email:"",
            Password:""
        })
       }
       catch(e){
        console.log(e);
        toast.error(e?.message);

       }
    }
    const [states, setstates]=useState({
        UserName:"",
        Email:"",
        Password:""
    })
    function ChangeEventHandler(e,ele,state,setstates){
        // console.log(e,ele.target.value,state,setstates);
        setstates( {
            ...state,[e.label]:ele.target.value
        })
    }
    return <div className={` min-w-[100%] flex flex-col items-center  justify-center bg-white !transition-all min-h-[100%] absolute ${show?"":"-translate-y-[100%]"}`}>
             <div className="w-[60%] h-[auto] py-[20px] flex flex-col  ">
                    <div className="w-[100%] relative  flex ">
                        <div className="firstbubble absolute w-[150px] rounded-[50%] -top-[80px] -left-[1px] h-[150px] bg-[black] opacity-[.1] border-[1px] border-black"></div>
                        {/* <div className="firstbubble absolute w-[80%] rounded-[200px] -bottom-[40px] left-[35px] h-[200px] bg-[red] opacity-[.2]"></div> */}
                        <h1 className="text-[42px] w-[100%] text-center spec ">Initiate your first step towards your best management  </h1>
                    </div>
                    <div className="my-[50px]">
                    {
                        list.map((e,i)=>{
                            return  <InputElement states={states} setstates={setstates} ChangeEventHandler={ChangeEventHandler}  e={e} key={i}/>
                        })
                        
                        }
                        <div  className="w-[90%] flex px-[20px] items-center mx-[auto] h-[70px] mt-[20px] bg-white rounded-[10px]">
        <h2  className="min-w-[150px] unselect tracking-wider   text-[24px]">User Role</h2>
        <div className="flex w-[100%] h-[40px] border-[1px] border-black">
          {Object.keys(role).map((e,i)=>{
            console.log(e)
            return <div onClick={()=>{
                        setroles({
                            ...role, "librarian":false,"user":false, [e]:!role?.[`${e}`]
                        })
            }} className={`w-[50%] ${role[e]?"bg-[black] text-white":""} h-[100%] border-r-[1px] border-black flex items-center justify-center  capitalize text-[18px] tracking-wider font-semibold cursor-pointer  `}>{e}</div>
          })  }
        </div>
    {/* <select name="cars" id="cars" className="border-[1px] border-black w-[100%] py-[10px] text-[black] font-semibold tracking-wider px-3  ">
     <option value="volvo">Volvo</option>
     <option value="saab">Saab</option>
     <option value="mercedes">Mercedes</option>
     <option value="audi">Audi</option>
     </select> */}
    </div>
                    </div>
                    <button onClick={SubmitHandler} className=" mt-[10px] bg-black w-[auto] mx-auto px-[50px] py-[10px] text-[20px] text-white rounded-[10px]">SignUp</button>
                    <p className="text-[18px] mt-[20px] w-[100%] text-center unselect">Already have an account ? Go to <span onClick={()=>{
                        // alert("hellor");
                        setshow(!show)
                    }} className="text-[red] cursor-pointer font-semibold tracking-wider underline">Login</span></p>
            </div>
            <Toaster position={"top-right"} reverseOrder={false}/>
    </div>
}