import React, { useEffect, useState } from 'react'
import CardComp from "./Card.jsx"
;import CloseIcon from '@mui/icons-material/Close';
import LibraryHeader from './LibraryHeader';
import { getbook } from './Api.js';
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch, useSelector} from "react-redux"
import { FadeLoader,BounceLoader} from "react-spinners";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AddUserSession, ApiDataAddition } from './Redux/actions.js';
import EditIcon from '@mui/icons-material/Edit';
import {useRef} from "react";
export default function Library() {
    const [newarr,setnewarr]=useState([]);
    const [newtrendings,setTrendingarr]=useState([]);
    const [searchResults,setsearchResults]=useState([]);
    const [filteredsearchResults,setfilteredsearchResults]=useState([]);
    const selector=useSelector(state=>state);
    console.log(selector?.usersession?.userprofile?._id);
    const [inputvalue,setInputValue]=useState();
    const [pagination,setpagination]= useState({
        startIndex:0,
        maxResults:10,
    })

   const [isloading,setisloading]=useState(true);
    const [state,setstate]=useState(false);
    const listofLocalStorage=JSON.parse(localStorage.getItem(`${selector?.usersession?.userprofile?._id}savelist`));
    const [arr,setarr]=useState(JSON.parse(localStorage.getItem(`${selector?.usersession?.userprofile?._id}savelist`))?.length?[...JSON.parse(localStorage.getItem(`${selector?.usersession?.userprofile?._id}savelist`))]:[]);
    console.log(arr);

   
    async function newarriavalApicall(){    
        try{
            const data =await getbook();
            console.log("resp=>",data);
            if(data?.mess){
                console.log(data?.mess);
                toast.error(data?.mess);
                setisloading(false)
            }
            else{

            setsearchResults(data);
            var fildata=data?.filter(element => {
                if(element?.type[0]!='trendings'){
                    return element
                }
            });
            var fildataone=data?.filter(element => {
                if(element?.type[0]=='trendings'){
                    return element
                }
            });
            console.log(fildata,fildataone)
            setnewarr(fildata);
            setTrendingarr(fildataone);
            setisloading(false)

                }
                }
        catch(e){
            console.log(e);
        }
    }
    async function trendingApicall(){
        // const resp=await fetch(`https://www.googleapis.com/books/v1/volumes?q=trendingbooks+terms&startIndex=${pagination?.startIndex}&maxResults=${pagination?.maxResults}`);
        // const data=await  resp.json();
        // console.log(data);
        // setTrendingarr(data?.items);
    }
    async function searchapicall(){
       
        // inputvalue
        if(searchResults.length)
       {   
        var updated= searchResults.filter(e=>{
        console.log(e?.volumeInfo?.title);
           if(e?.volumeInfo?.title?.toLowerCase()?.includes(inputvalue?.toLowerCase())){
            return e;
           }
        })
        console.log("updated",updated,searchResults)
        setfilteredsearchResults(updated)
        }
    }
  
    useEffect(()=>{
        newarriavalApicall();
        // trendingApicall();
        
    },[]);
    // useEffect(()=>{
    //     console.log("state got updated");
    // },[searchResults])
    useEffect(()=>{
            const id =setTimeout(() => {
                searchapicall()
            }, 500);
            return ()=>{
                clearTimeout(id);
        }
    },[inputvalue])


   
    function addElementId(id){
        console.log(id,arr);
        var new_arr=arr?.filter(e=>{
            if(e.objectId)
            return e;
        })?.map(e=>e.objectId);
        console.log(new_arr);
        if (new_arr.length){
            // means arr is not null
            console.log(arr.length);
            // console.log(arr.includes(id),"gone inside");
            if(new_arr.includes(id)){
                //  means elem is there inside the arr
                var index= new_arr.indexOf(id);
                console.log(index);
                arr.splice(index,1);
            }
            else{
                // means elem is not inside the arr
                // console.log(arr)
                arr.push({objectId:id,userId:selector?.usersession?.userprofile?._id});
                        }
        }
        else {
            //  arr is empty
            arr.push({objectId:id,userId:selector?.usersession?.userprofile?._id});
            // localStorage.setItem("savelist",JSON.stringify([id]));
        }
        localStorage.setItem(`${selector?.usersession?.userprofile?._id}savelist`,JSON.stringify(arr));
         console.log(arr);
       setarr((prev)=>{
        return [...arr]
       })
       setstate(!state);
      }
    //   useEffect(()=>{
    //     console.log("after updating the state",arr);
  
    //   },[arr])
    

      const refOne=useRef(null);
      const refTwo=useRef(null);
      function scrollHandler(dir){
        if(dir=="left"){
            refOne.current.scrollLeft+=-500;
        }
        else{
            refOne.current.scrollLeft+=500;
        }
      }
      function scrollHandlerTwo(dir){
        if(dir=="left"){
            refTwo.current.scrollLeft+=-500;
        }
        else{
            refTwo.current.scrollLeft+=500;
        }
      }

      function editHandler(id){
        if(!localStorage.getItem("editid"))
        localStorage.setItem("editid",id);
      }
     useEffect(()=>{
        console.log("reference updated ",refOne.current.scrollLeft);
     },[refOne,refTwo])
  return (
    <div className='w-[100%] h-[110vh]   !bg-[rgba(0,0,0,0.045)]  flex flex-col overflow-hidden'>
        
        <LibraryHeader />
        {/* header ends over here */}

        <div className='search relative flex flex-col items-center bar w-[70%] min-w-[450px]   h-[120px] mx-[auto]   mt-[20px]'>
            <h2 className='text-[32px] spec opacity-[.8]'>Search Your <span className="bg-[rgba(220,0,0)] text-white px-4 py-1 rounded-[10px] ">Favourite</span> Book</h2>
            <div className='flex gap-[20px] w-[100%] mt-[20px] border-1px border-black relative'>
                    <input value={inputvalue}  onChange={(e)=>setInputValue(e.target.value)}  className='w-[100%] h-[50px] border-[2px]  border-[black] bg-[transparent] outline-none border-[rgba(110,82,250,0.98)]  rounded-md px-[20px]' placeholder='Harry & Potter ....'/>
                   {inputvalue && <CloseIcon onClick={()=>setInputValue("")} className=' cursor-pointer active:scale-50 absolute right-5 top-[12px]' />}
            </div>
           {inputvalue && <div className=' z-20 scroller absolute flex flex-col gap-3 overflow-scroll w-[100%] h-[60vh] border-[1px] border-[rgba(0,0,0,.2)] shadow-lg rounded-md top-[120px] p-[20px]  backdrop-blur-lg'>
            {
               filteredsearchResults.length? filteredsearchResults.map((e,i)=>{
                return <div key={i} className='w-[95%]  flex gap-[100px] py-[5px] px-[20px] min-h-[100px] !z-200 border-[1px] border-black bg-transparent rounded-md '>
                    
                   <h2 className='text-[black] text-[16px] w-[45%] h-[auto] text-clip font-medium line-clamp-3'>{e?.volumeInfo?.title}</h2>
                   <img src={e?.volumeInfo?.imageLinks[0]} />
                   <h2 className='  text-[16px] min-w-[220px] text-clip font-semibold text-center flex items-center justify-center text-[black] '> Date : {e?.volumeInfo?.publishedDate}</h2>
                   <div className='  h-[auto]   flex  items-center w-[40%]'>
                                    {
                                        e?.volumeInfo?.categories?.map((e,i)=>{
                                            return <div key={i} className='w-[auto] flex items-center justify-center px-[10px] h-[auto] mt-[5px] text-[red] bg-[rgba(200,0,0,0.2)] rounded-md'>{e}</div>
                                        })
                                    }
                    </div>
                </div>
            }): searchResults.length? searchResults.map((e,i)=>{
                    return <div key={i} className='w-[95%] flex gap-[100px] py-[5px] px-[20px] min-h-[100px]  border-[1px] border-black bg-transparent rounded-md '>
                        
                       <h2 className='text-[black] text-[16px] w-[45%] h-[auto] text-clip font-medium line-clamp-3'>{e?.volumeInfo?.title}</h2>
                       <img src={e?.volumeInfo?.imageLinks[0]} />
                       <h2 className='  text-[16px] min-w-[220px] text-clip font-semibold text-center flex items-center justify-center text-[black] '> Date : {e?.volumeInfo?.publishedDate}</h2>
                       <div className='  h-[auto]   flex  items-center w-[40%]'>
                                        {
                                            e?.volumeInfo?.categories?.map((e,i)=>{
                                                return <div key={i} className='w-[auto] flex items-center justify-center px-[10px] h-[auto] mt-[5px] text-[red] bg-[rgba(200,0,0,0.2)] rounded-md'>{e}</div>
                                            })
                                        }
                        </div>
                    </div>
                }):null
            }
            </div>
            }
        </div>

        {/* search bar ends  */}
        <div className='w-[90%] h-[75%] mt-[10px] flex-col  pb-7 flex mx-auto z-10   items-center justify-center gap-4 '>

            <div className='w-[100%]  h-[45%] relative  '>
                <h1 className='text-[30px] font-medium tracking-normal font-sans '>New Arrivals</h1>
                <div ref={refOne} className='scroll-smooth  bg-[rgba(0,0,0,.1)] rounded-[20px] opacity-[.8] scroller-spec w-[100%] h-[90%]  flex items-center  py-[10px] gap-[20px] overflow-x-scroll  px-[20px]'>
                {
                 isloading? <BounceLoader className="mx-auto mt-[200px]" />:    newarr?.length? newarr.map((e,i)=>{
                            // console.log(e?.volumeInfo);
                            return <CardComp keyvalue={i} key={i} data={e} id={e?._id} editHandler={editHandler} onClickHandler={addElementId} arr={arr} />
                        }):null
// volumeInfo.          
                }
               <ChevronLeftIcon onClick={()=>scrollHandler("left")} className="!text-[28px] text-black active:bg-[rgba(0,0,0,.1)] cursor-pointer  w-[20px] h-[20px] rounded-[50%] absolute right-[50px] top-[10px]"/>
               <ChevronRightIcon onClick={()=>scrollHandler("right")}   className="!text-[28px] text-black  active:bg-[rgba(0,0,0,.1)] cursor-pointer  w-[20px] h-[20px] rounded-[50%] absolute right-[10px] top-[10px]"/>
            </div>
            </div>
            {/* new arrivals ends */}
            <div className='w-[100%] h-[46%] relative    '>
            <h1 className='text-[30px] font-medium tracking-normal font-sans'>Trendings</h1>
            <div ref={refTwo} className='scroller-spec scroll-smooth  rounded-[20px]  bg-[rgba(0,0,0,.1)] opacity-[.8] w-[100%] h-[90%]  flex items-center gap-[20px] overflow-x-scroll  px-[20px]'>
                {
                  isloading? <BounceLoader className="mx-auto mt-[200px] text-[white]" />:    newtrendings?.length?   newtrendings.map((e,i)=>{
                            return  <CardComp keyvalue={i} data={e} key={i} id={e?._id} editHandler={editHandler} onClickHandler={addElementId} arr={arr} />
                        }):null
                }
                 <ChevronLeftIcon onClick={()=>scrollHandlerTwo("left")} className="!text-[28px] text-black active:bg-[rgba(0,0,0,.1)] cursor-pointer  w-[20px] h-[20px] rounded-[50%] absolute right-[50px] top-[10px]"/>
                <ChevronRightIcon onClick={()=>scrollHandlerTwo("right")}   className="!text-[28px] text-black  active:bg-[rgba(0,0,0,.1)] cursor-pointer  w-[20px] h-[20px] rounded-[50%] absolute right-[10px] top-[10px]"/>
            </div>
            </div>
            
            <div>
                <Toaster
                position="top-right"
                reverseOrder={false}
            />
            </div>
        </div>
    </div>
  )
}
