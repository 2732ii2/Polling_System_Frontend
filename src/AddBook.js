import React, { useEffect, useState } from 'react'
import LibraryHeader from './LibraryHeader'
import {useNavigate} from "react-router-dom";
import  toast, { Toaster } from 'react-hot-toast';
import { addbook } from './Api';
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client";
import { countofBooks, setupdatecall } from './Redux/actions';
import { AddElementComp, InputComp } from './CustomCom/Custom';

const Url= "http://localhost:3001/";
const socket =io.connect(Url);
export default function AddBook() {
    const dispatch=useDispatch();
    const defaultob={
        "volumeInfo": {
          "title": " ",
          "subtitle": " ",
          "authors": [
          ],
          "publisher": " ",
          "publishedDate": " ",
          "description": " ",
          "industryIdentifiers": [
            
          ],
          "pageCount": 0,
          "categories": [
          ],
          
          "imageLinks": []
        },
        "type": "trendings"
      };
      const select =useSelector(state=>state);
      console.log(select);
      const [recall,setrecall]=useState(false);
      useEffect(()=>{
        socket.emit("libraryemits",1);
        socket.on("updatedcountofBooks",data=>{
            console.log(data);
            dispatch(countofBooks(data));
            // setTimeout(() => {
            //     dispatch(countofBooks(data));
            // }, 500);
            // setTimeout(() => {
            //     console.log("called");
            //     dispatch(setupdatecall);
            // }, 1000);
        })
        // updatedcountofBooks
      },[socket,recall])
      function Validateform(){
        var c=true;
          Object.keys(obj.volumeInfo).forEach((e)=>{
          if(typeof(obj.volumeInfo[e])=='string'){
            if(!obj.volumeInfo[e]){
              c= false;
            }
          }
          else if (typeof(obj.volumeInfo[e])=='object') {
            if (!(obj.volumeInfo[e]).length)
            {
              c= false;
            }
          }
        })
        return c;
      }
    
      const showTypes=[{name:"New Arrivals",value:"new_arrivals"},{name:"Trendings",value:"trendings"}];
      const [showtypes,setShowTypes]=useState([]);
      console.log(showtypes);

      useEffect(()=>{
        setobj(prev=>{
            return {...prev,
                type:showtypes,
            }
        })
    }
    ,[showtypes])
      const [obj,setobj]=useState(defaultob);
      console.log(obj);
      const [statetoshow,setstatetoshow]=useState("volumeInfo");
    //   console.log(statetoshow);
  return (
    <div className='w-[100%] h-[100vh] flex flex-col'>
        <LibraryHeader />
        <div className='w-[90%] flex   h-[85vh]  scroller bg-[rgba(0,0,0,.1111)] rounded-lg mx-auto mt-[20px]'>
            <div className='w-[20%]      h-[auto] flex flex-col'>
                {
                    Object.keys(defaultob)?.length?<>
                    { Object.keys(defaultob).map((e,i)=>{
                        return <div key={i} onClick={()=>setstatetoshow(e)} className={`w-[100%] h-[50px] text-[18px] flex items-center justify-start px-[10px] capitalize bg-[black] text-white border-b-2 border-[white] font-medium !tracking-widest font-mono  cursor-pointer transition-all  ${ e==statetoshow ?"text-[yellow] transition-all":" hover:text-[#f9f9a3]" } `}> {e==statetoshow ? <div className='w-[20px] h-[100%] pt-[6px] '>.</div>:null} {e}</div>
                    })
                    }
                    </>:null
                }
            </div>
            <div className='  w-[80%] h-[auto] flex items-center flex-col justify-center'>

                {/* content  */}
                <div className='flex w-[90%] h-[90%] overflow-hidden '>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                    }}  className={` overflow-y-scroll px-[20px]  transition-all ${statetoshow=="type"?"!-ml-[100%]":""} min-w-[100%] h-[100%] flex flex-wrap justify-center gap-3 py-5  shadow-lg rounded-md border-[1px] border-[rgba(0,0,0,.2)] bg-white `}> 
                
                    {
                        Object.keys(defaultob.volumeInfo).map((e,i)=>{
                            if(e!="categories" && e!="imageLinks"  && e!="industryIdentifiers" && e!="authors"){
                                return <InputComp setobj={setobj} e={e} index={i} key={i} />
                            }
                            else{
                                return <AddElementComp setobj={setobj} e={e} index={i} key={i} />
                            }
                        })
                    }
                
                    </form>
                    
                    <div className='min-w-[100%] h-[90%] flex  gap-2 p-5 shadow-lg rounded-md border-[1px] border-[rgba(0,0,0,.2)] bg-white '> 
                
                    {
                    showTypes.map((e,i)=>{
                        return <div key={i} onClick={()=>{
                            console.log(showtypes.includes(e.value),showTypes);
                            if(!showtypes.includes(e.value))
                            {setShowTypes(prev=>{
                                return [...prev,e.value]
                            })}
                            else{
                                var index =showtypes.indexOf(e.value);
                                showtypes.splice(index,1);
                                setShowTypes(prev=>{
                                    return [...showtypes]
                                })
                            }
                        }} className={`w-[auto] h-[40px]  rounded-[20px] px-5 py-2 cursor-pointer ${showtypes.includes(e.value)?"bg-[#f068f0]":"bg-[#f9dcf9]"} `}>{e.name}</div>
                    })
                    
                    }
                
                    </div>
                </div>
                <div className='w-[100%] h-[40px] flex justify-end pr-[60px] mt-2 '>
                    {/* active scale transition we don't have to show at the time of disabled */}
                 {statetoshow =="volumeInfo"?<button type='submit' className={`  bg-[white] border-[1px] border-[rgba(0,0,0,.2)] text-[black] px-[10px]  transition-all  active:scale-50 rounded-md`} onClick={()=>{
                if(Validateform()){
                    setstatetoshow("type");
                }
                else{
                    console.log("err");
                    toast.error('Fill the manadatory filleds');
                }
                 }} >Next</button>:  <button onClick={()=>{
                    if(!(obj.type).length){
                        toast.error('Select atleast one to submit');
                    }
                    else{
                        console.log(obj);
                        addbook(obj);
                        setrecall(!recall);
                        // socket.emit('sendupdatedcountofbooks',1);
                        socket.emit(`sendupdatedcountofbooks`,[1,'something']);
                        toast.success('Successfully Saved');
                    }
                 }} type='submit' className={` disabled:bg-[rgba(0,0,0,.2)] disabled:text-[rgba(0,0,0,.4)] bg-[white] border-[1px] border-black text-[black] px-[10px]  transition-all ${statetoshow=="type"?"active:scale-50":""} rounded-md`} disabled={statetoshow!="type"}>Submit</button>}
                </div>
            </div>̇̇̇̇̇̇̇̇̇̇
        </div>

            <div>
                <Toaster
                position="top-right"
                reverseOrder={false}
            />
            </div>
    </div>

  )
}


