import React from 'react'
import { deletebyid } from './Api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect,useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AddUserSession } from './Redux/actions';
export default function CardComp(props) {
   var select=useSelector(state=>state);
   console.log( select?.usersession)
   var type=select?.usersession?.userprofile?.type;
   const dispatch=useDispatch();
    const localSavedSession=JSON.parse(localStorage.getItem("usersession"));
  if(localSavedSession){
      if(!select?.usersession?.userprofile)
      dispatch(AddUserSession(localSavedSession)); 
  }
function dateconverter(dateString){
    // const dateString = '1993-06-17T00:00:00.000Z';
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getUTCDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return (formattedDate);
}
// editHandler={editHandler}
 var {keyvalue,editHandler,data,id,onClickHandler,arr}=props;
 console.log(arr);
 if(!arr.length){
    arr=(JSON.parse(localStorage.getItem(`${select?.usersession?.userprofile?._id}savelist`)) )
 }
 var {borrowed}=(data );
 var {volumeInfo}=data;
 data=volumeInfo;
  const navi=useNavigate();
  return (
    // <div key={keyvalue}  className='w-[95%] hover:scale-[1.05] hover:shadow-lg  transition-all relative bg-[white] min-h-[200px]   shadow-sm border-[1px] flex  p-4  rounded-lg'>
    //                             <div className='w-[30%] h-[100%] truncate'>
    //                                 <img src={data.imageLinks[0]} className='h-[80%] w-[100%]' />
    //                                 <p className='font-semibold text-[22px]'>{ data.authors?data.authors[0]:"-"}</p>
    //                             </div>
    //                             <div className='w-[70%] h-[100%] px-[20px] flex flex-col'>
    //                                 <h2 className=' font-sans text-[20px] h-[30px] tracking-wider  overflow-clip'>{data.title}</h2>
    //                                 <p className=' line-clamp-4 text-[14px] py-[10px]'> {data?.description}</p>
    //                                 <div className='w-[100%] h-[40px]   flex '>
    //                                     {
    //                                         data?.categories?.map((e,i)=>{
    //                                             return <div key={i} className='w-[auto] text-[12px] flex h-[auto] !py-[5px] items-center justify-center px-[10px]   mt-[5px] text-[red] bg-[rgba(200,0,0,0.2)] rounded-md'>{e}</div>
    //                                         })
    //                                     }
    //                                     {/* publishedDate */}
    //                                     <div  className='w-[auto] ml-[20px] flex items-center justify-center px-[10px] h-[auto] !py-[5px] mt-[5px] text-[black] bg-[rgba(0,0,0,0.2)] rounded-md text-[12px]'>{dateconverter(data?.publishedDate)}</div>
    //                                 </div>
    //                             </div>

    //         {/* <button className='delete bg-red-50 flex items-center justify-center   active:scale-50 rounded-[50%] pb-1  absolute w-[20px] h-[20px] left-auto right-2 top-1 font-sans text-[red]' onClick={()=>{
    //             console.log(id);
    //             deletebyid(id);
    //         }}> x </button> */}
            
    //         <FavoriteIcon onClick={()=>onClickHandler(id)} className={`delete  pt-[5px]   flex items-center justify-center  cursor-pointer  ${arr.includes(id)?"!text-[red]":"!text-[rgba(0,0,0)]"} active:text-[red] active:scale-50 pb-1  absolute w-[20px] h-[20px] left-auto right-2 top-1 font-sans  transition-all`}/>
    //  </div>
    <div  key={keyvalue} className="min-w-[35%] overflow-hidden px-3 py-3 rounded-[20px] relative bg-white  h-[90%] border-[1px] flex border-[white]">
                                   <div className='w-[30%] h-[100%] truncate'>
                                  <img src={data?.imageLinks[0]} className='h-[80%] w-[100%]' />
                                   <p className='font-semibold spec text-[22px]'>{ data?.authors?data?.authors[0]:"-"}</p>
                               </div>
                               <div className='w-[70%] h-[100%] px-[20px] flex flex-col'>
                                   <h2 className=' font-sans text-[20px] font-semibold h-[30px] tracking-wider  overflow-clip w-[80%]  '>{data?.title}</h2>
                               <p className=' !line-clamp-5 text-[14px]  font-medium   '> {data?.description}</p>
                                    <div className='w-[100%] h-[40px]   flex '>
                                       {
                                           data?.categories?.map((e,i)=>{
                                               return <div key={i} className='w-[auto] font-bold  text-[12px] flex h-[auto] !py-[5px] items-center justify-center px-[10px]   mt-[5px] text-[red] bg-[rgba(200,0,0,0.2)] rounded-md'>{e?.split(" ")[0] }</div>
                                           })
                                        }
                                        {/* publishedDate */}
                                        <div  className='w-[auto] ml-[20px] flex items-center font-bold justify-center px-[10px] h-[auto] !py-[5px] mt-[5px] text-[black] bg-[rgba(0,0,0,0.2)] rounded-md text-[12px]'>{dateconverter(data?.publishedDate)}</div>
                               </div>
                           </div>
                        {  Object.keys(select?.usersession).length ? <>
                        
                        
                        {type=="librarian"?   <EditIcon onClick={()=>{
                        navi("/edit");
                        editHandler(id)
                        }} className=" pt-[5px] !text-[26px] !text-[blue]  flex items-center justify-center  cursor-pointer  active:text-[red] active:scale-50 pb-1  absolute w-[20px] h-[20px] left-auto right-2 top-1 font-sans  transition-all"/> :<div></div>}
                        
                     {type=="user"?!borrowed?   <FavoriteIcon onClick={()=>onClickHandler(id)} className={`delete   pt-[5px]   flex items-center justify-center  cursor-pointer  ${arr?.filter(e=>{
            if (e?.userId == select?.usersession?.userprofile?._id) {
                if (e.objectId) {
                    return e;
                }
            }
        })?.map(e=>e.objectId).includes(id)?"!text-[red]":"!text-[rgba(0,0,0)]"} active:text-[red] active:scale-50 pb-1  absolute w-[20px] h-[20px] left-auto right-2 top-1 font-sans  transition-all`}/> :<div className="flex items-center justify-center px-2 border-[1px] h-[30px] border-black ">Booked</div> :<></> }
                        </> 
                        :<div></div>
                        }      
    </div>
  )
}
