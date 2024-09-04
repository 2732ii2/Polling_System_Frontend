import React from 'react'
import LibraryHeader from './LibraryHeader'
import CardComp from './Card'
import ClearIcon from '@mui/icons-material/Clear';
import img1 from "./Koenigsgg.jpeg";
import {useState,useEffect} from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import  BorderColorDetector from "./BorderColorDetector";
import { useDispatch, useSelector } from 'react-redux';
import { AddUserSession, ApiDataAddition } from './Redux/actions';
import { FadeLoader} from "react-spinners";
import { BorrowBook, getbook } from './Api';
import io from "socket.io-client"

import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const Url="https://polling-application-backend.onrender.com/";
// const Url='http://localhost:3001/';
const socket=io.connect(Url);
export default function Faviourates() {
  const dispatch=useDispatch();
  var select =useSelector(state=>state);
  var type=select?.usersession?.userprofile?.type;
  console.log(type);
  const localSavedSession=JSON.parse(localStorage.getItem("usersession"));
      if(localSavedSession){
          if(!select?.usersession?.userprofile)
          dispatch(AddUserSession(localSavedSession)); 
      }
  var [list,setlist]=useState([]);
  console.log(list);
  const [overduelist, setoverduelist]=useState();
  const [borrowedlist,setborrowedlist]=useState();
  console.log("overduelist",overduelist,borrowedlist);
  const [dates,setdates]=useState({
    start:"",
    end:""
  })
  const [recall,setrecall]=useState(false);
  useEffect(()=>{
    socket.emit("favourites",1);
    socket.on("updatedcountofBooks",data=>{
        console.log(data);
        // dispatch(countofBooks(data));
    })
    
  },[socket,recall])
const [isloading,setisLoading]=useState(true);
 var [selectedobj, setselectedobj]=useState();
  const [showmodel,setshowmodel] =useState(false);
  const [localStorageData,setlocal]=useState([]);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`${select?.usersession?.userprofile?._id}savelist`))?.filter(e => {
        if (e?.userId == select?.usersession?.userprofile?._id) {
            if (e.objectId) {
                return e;
            }
        }
    })?.map(e => e.objectId) || [];
    setlocal(storedData);
}, [select?.usersession?.userprofile?._id]); 
// useEffect(() => {
//   console.log(localStorageData);
// }, [localStorageData]); 
  // localStorageData=localStorageData?.length?localStorageData:[];
  console.log(localStorageData);
   async function callApi(){
    const data =await getbook();
    if(data?.mess){ 
      setisLoading(false);

    }
    else{
      console.log(data);
      var filteredData=data?.filter(ele=>{
        if(localStorageData.includes(ele?._id)){
          return ele
        }
      })
      console.log(filteredData,localStorageData)
     setoverduelist(data?.filter(ele=>{
      if(localStorageData.includes(ele?._id)){
        if(ele?.overdue){
          return ele;
        }
      }
    }))
    setborrowedlist(data?.filter(ele=>{
      if(localStorageData.includes(ele?._id)){
        if(ele?.borrowed){
          return ele;
        }
      }
    }))
      console.log(filteredData);
      setlist(filteredData);
      setisLoading(false);
      
    }
   }
  useEffect(()=>{
    callApi();
  },[localStorageData,showmodel])


  // useEffect(()=>{
  //   console.log("udpated show model =>",showmodel);
  // },[showmodel])


  function dateconverter(dateString){
    // const dateString = '1993-06-17T00:00:00.000Z';
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getUTCDate().toString().padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    return (formattedDate);
}

 const navi=useNavigate();
 const filters=[ "Favourite","Borrowed","Overdue"];
 const [showbyfilter, setshowbyfilter]=useState(filters[0]);
 console.log(showbyfilter);
  return (
    type=="user"?
    <div className='w-[100%] relative  h-[100vh] flex flex-col  '>

        
      <LibraryHeader />
      <KeyboardBackspaceIcon className=' cursor-pointer  transition-all active:scale-50 absolute top-[120px] left-[8%]' onClick={()=>{
          setTimeout(()=>{
              //  alert("hello");
              navi("/");
          },100)
         }}/>


        <div className=" rounded-[10px] flex items-center justify-center px-4 absolute top-[160px] right-[4%] w-[auto] h-[40px] bg-[rgba(0,0,0,.1)] text-black  spec !text-[18px]">Data count :  {  showbyfilter=="Overdue"?overduelist?.length:showbyfilter=="Borrowed"?borrowedlist?.length:list?.length}</div>
        
     <div className=" w-[10%] absolute h-[200px] bg-[rgba(0,0,0,0.6)] pt-2 flex flex-col items-center  top-[180px] shadow-md border-[1px] border-[white] rounded-[14px] left-[30px]">
      {
        filters.map((e,i)=>{
          return <div onClick={()=>{
            if(e!=showbyfilter){
              setshowbyfilter(e)
            }
          }} className={`text-[18px] h-[40px] ${e==showbyfilter?"bg-[white] text-black":"bg-transprent text-white"} flex items-center cursor-pointer hover:tracking-wider border-b-[1px] border-white font-medium tracking-wide justify-start w-[100%] pl-10 py-5  `} key={i}>{e}</div>
        })
      }
     </div>

        <div  className="w-[100%] scroller   h-[91%] flex items-center flex-col py-[50px] gap-[40px] overflow-y-scroll bg-[rgba(0,0,0,.05)] " >
        
        {
          isloading?<FadeLoader className='mt-[100px]' />:
        
          showbyfilter=="Overdue"?
          
          !overduelist?.length? <p className="spec text-[20px] tracking-wider"> Congratations , No overdue books , but hei did you even Borrowed  </p>:
          overduelist.map((e,i)=>{
            return  <Innercard e={e} key={i} i={i} setshowmodel={setshowmodel} setselectedobj={setselectedobj} dateconverter={dateconverter}/>
          })
          
          
          :showbyfilter=="Borrowed"?

          !borrowedlist?.length? <p> No, Borroed Book do check it for this </p>:
          borrowedlist.map((e,i)=>{
            return  <Innercard e={e} key={i} i={i} setshowmodel={setshowmodel} setselectedobj={setselectedobj} dateconverter={dateconverter}/>
          })
          
          
          :



        list.map((e,i)=>{
          return  <Innercard e={e} key={i} i={i} setshowmodel={setshowmodel} setselectedobj={setselectedobj} dateconverter={dateconverter}/>
        })

}
      

    {showmodel &&  <div className={` flex py-[50px]  flex-col border-t-[rgba(0,0,0,0.1)] justify-cen5ter border-[1px]  gap-[20px] items-center absolute w-[40%] shadow-lg rounded-[20px] z-30  p-[20px] h-auto bg-transparent backdrop-blur-[20px]    `}>

       <h1 className="text-[22px] text-[rgba(0,0,0,.8)]  font-medium opacity-[.8] spec tracking-wider"> Would do you like to borrow this book :  <span className="text-[rgba(0,0,0)] textShadow-md"> { selectedobj?.volumeInfo?selectedobj?.volumeInfo?.title:  '?'}</span>  </h1>
       <ClearIcon onClick={()=>{
              console.log("hello world");
                setshowmodel(!showmodel);
                setselectedobj({})
            }}  className="text-black text-[20px] transition-all cursor-pointer active:scale-100 absolute left-auto right-[10px] top-[5px]"/>
       <div  className="flex w-[85%] mt-[40px]  items-center h-[50px] justify-between"  >
        
        <h4 className="min-w-[auto] whitespace-nowrap tracking-wide font-semibold text-[18px]">Choose  Dates</h4>
        
        <div className="flex  w-auto   h-auto   items-center !gap-[10px]" >
          <input value={dates.start} onChange={(e)=>{
              setdates({
                ...dates,start:e.target.value
              })
          }} type='date' className="bg-[transparent] shadow-md border-[1px] border-[white] rounded-[20px] p-[5px]" />
          {"-"}
          <input  value={dates.end}  onChange={(e)=>{
              setdates({
                ...dates,end:e.target.value
              })
          }} type='date' className="bg-[transparent] shadow-md border-[1px] border-[white] rounded-[20px] p-[5px]" />
          </div>
   
        </div>
        <button onClick={async()=>{
          
          
          if( !dates?.start || !dates?.end){
               alert("select the dates to borrow");
          }
          else{
            const obj={
              startDate:dates?.start,
              endDate:dates?.end,
              id:selectedobj?._id,
              user_id:select?.usersession?.userprofile?._id
            }
            console.log(obj);
          const resp=await  BorrowBook(obj);
          console.log(resp);
          if(resp?.mess=="data has updated"){
            toast.success('data has updated');
          }
          else{
            toast.error("some problem has occured")
          }
          setshowmodel(false);
          setrecall(!recall);
          socket.emit(`sendupdatedcountofbooks`,[1,'something']);
          console.log(resp);
          }
        
        }} className=" mt-[20px] active:scale-50 transition-all w-[auto] bg-[black] h-[auto] text-white px-[50px] py-[5px] rounded-[5px] "   >Submit</button>
      </div>
}
     </div>
     <div>
                <Toaster
                position="top-right"
                reverseOrder={false}
            />
            </div>
    </div>
    :
    <div className="bg-black w-[100%]   h-[100vh] flex items-center   justify-center text-[white]  text-[25px] tracking-wider font-semibold "   > 403 Forbidden: You do not have access to this page. </div>
  )
}



const Innercard=(props)=>{
  const {e,i,setshowmodel,setselectedobj,showmodel,dateconverter}=props;
  return <div key={i}  className={ `w-[70%] rounded-[20px] overflow-hidden relative min-h-[50vh] flex   ${i%2==0?"  shadow-green ":"shadow-blue"}  bg-[white]  `} >

  <div className={`min-w-[30%] h-[100%] ${i%2==0?"bg-[#b1f2ba]  ":"bg-[#a3d7ff]"}   `}></div>
  <div className={`min-w-[60%] h-[100%]  flex flex-col justify-between  py-[70px]  `}>
   
    <h1 className='ml-[35%] w-[40%] line-clamp-2 text-[2vw]'>{e?.volumeInfo?.title}</h1>
    <p className='ml-[35%] text-[1.2vw] w-[45%] line-clamp-5'>{e?.volumeInfo?.description ? e?.volumeInfo?.description:"-"}</p>

    <div className='flex justify-between w-[45%] gap-[20px] ml-[35%] '>
    {/* e?.volumeInfo?.publishedDate */}
    <p  className="w-[auto]  h-[40px] bg-[black] text-[black] border-[1px] border-[rgba(0,0,0)] whitespace-nowrap px-2  font-semibold tracking-wide bg-[rgba(0,0,0,.01)] flex items-center justify-center  rounded-md  ">Published Date:  {e?.volumeInfo?.publishedDate?dateconverter(e?.volumeInfo?.publishedDate):  "10-06-2022"}</p>
   { 
    e?.borrowed? <button  className="min-w-[120px] !z-40  h-[40px] bg-[black] text-[white]  rounded-md " onClick={()=>{
      console.log("hello world");
        // setshowmodel(!showmodel);
        // setselectedobj(e);
    }} > Checkout</button> :
    
    <button  className="min-w-[120px] !z-40  h-[40px] bg-[black] text-[white]  rounded-md " onClick={()=>{
      console.log("hello world");
        setshowmodel(!showmodel);
        setselectedobj(e);
    }} > Borrow</button>
    
    
    }
    </div>
  </div>  
  <img src={ e?.volumeInfo?.imageLinks[0] ?e?.volumeInfo?.imageLinks[0] :img1} className=" w-[30%] left-[20%] top-[50px] rounded-lg bottom-auto z-20 absolute  h-[80%]   shadow-sm"/>

  <h5 className=" spec  drop-shadow-lg   opacity-[.1] top-[35%] left-[5%] text-[72px] font-bold tracking-wider z-10 text-black absolute w-[90%] line-clamp-2 ">{ e?.volumeInfo?.subtitle ? e?.volumeInfo?.subtitle : "Crazy"}</h5>

    {
      e?.borrowed?<div className="absolute left-auto right-[1px] flex bg-[rgba(220,0,0,.2)] w-auto px-4 py-2 text-[red] font-bold tracking-wider ">Returned Date : {dateconverter(e?.endDate)} </div>:null
    }
 
  </div>
}