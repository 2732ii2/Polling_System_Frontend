import { useEffect, useState } from "react"
import LibraryHeader from "../LibraryHeader"
import toast, { Toaster } from "react-hot-toast"
import { AddElementComp, InputComp } from "../CustomCom/Custom"
import  CardComp from "../Card.jsx";
import { EditBook } from "../Api";
import {useNavigate} from "react-router-dom";
const Edit =()=>{

    function dateconverter(dateString){
        // const dateString = '1993-06-17T00:00:00.000Z';
        const date = new Date(dateString);
    
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getUTCDate().toString().padStart(2, '0');
    
        const formattedDate = `${year}-${month}-${day}`;
        return (formattedDate);
    }
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
      useEffect(()=>{
        console.log("data has been updated");
      },[obj])
      const [statetoshow,setstatetoshow]=useState("volumeInfo");

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


    return <div className="flex flex-col w-[100%] h-[100vh] bg-[rgba(0,0,0,.05)] ">
        <LibraryHeader/>
        <div className="flex w-[100%] h-[95%] bg-[rgba(0,0,0,.1)] relative">
        <h1 className="text-black text-[24px] absolute  right-[20%] py-2 top-[29px] bg-[rgba(255,255,255)] text-[rgba(0,0,0,.7)] font-medium px-[20px] rounded-[4px]">Edit your Book</h1>
            <div className="min-w-[50%] h-[100%] bg-[rgba(0,0,0,.05)] flex items-center justify-center" >
                
                     <div   className="min-w-[85%] w-[85%] max-w-[550px] overflow-hidden px-3 pt-3 rounded-[20px] relative bg-white  h-[300px] border-[1px] flex border-[white]">
                        <div className='w-[30%] h-[100%] truncate'>
                       <img src={obj?.volumeInfo?.imageLinks[0]} className='h-[85%] w-[100%]' />
                        <p className='font-semibold spec text-[22px]'>{obj?.volumeInfo?.authors[0]}</p>
                    </div>
                    <div className='w-[70%] h-[100%] px-[20px] flex flex-col'>
                        <h2 className=' font-sans text-[20px] font-semibold h-[30px] tracking-wider  overflow-clip'>{obj?.volumeInfo?.title}</h2>
                    <p className=' !line-clamp-5 text-[14px]  font-medium   '> {obj?.volumeInfo?.description}</p>
                         <div className='w-[100%] h-[40px]   flex '>
                            {
                                obj?.volumeInfo?.categories?.map((e,i)=>{
                                    return <div key={i} className='w-[auto] font-bold  text-[12px] flex h-[auto] !py-[5px] items-center justify-center px-[10px]   mt-[5px] text-[red] bg-[rgba(200,0,0,0.2)] rounded-md'>{e}</div>
                                })
                             }
                             {/* publishedDate */}
                             <div  className='w-[auto] ml-[20px] flex items-center font-bold justify-center px-[10px] h-[auto] !py-[5px] mt-[5px] text-[black] bg-[rgba(0,0,0,0.2)] rounded-md text-[12px]'>{
                             (obj?.volumeInfo?.publishedDate)}</div>
                    </div>
                </div>
                {/* <EditIcon onClick={()=>{
                 navi("/edit");
                 editHandler(id)
                }} className=" pt-[5px] !text-[26px] !text-[blue]  flex items-center justify-center  cursor-pointer  active:text-[red] active:scale-50 pb-1  absolute w-[20px] h-[20px] left-auto right-[45px] top-1 font-sans  transition-all"/>
                <FavoriteIcon onClick={()=>onClickHandler(id)} className={`delete   pt-[5px]   flex items-center justify-center  cursor-pointer  ${arr.includes(id)?"!text-[red]":"!text-[rgba(0,0,0)]"} active:text-[red] active:scale-50 pb-1  absolute w-[20px] h-[20px] left-auto right-2 top-1 font-sans  transition-all`}/>           */}
</div>
                
                
            </div>
            <div className="w-[100%] h-[90%] mt-[3%] flex  ">
              <FormComp obj={obj} statetoshow={statetoshow} defaultob={defaultob} setstatetoshow={setstatetoshow} setobj={setobj} Validateform={Validateform} showTypes={showTypes} setShowTypes={setShowTypes} showtypes={showtypes}/>
            </div>

        </div>
        <Toaster
                position="top-right"
                reverseOrder={false}
            />
    </div>
}
export default Edit

const FormComp =({obj,statetoshow,defaultob,setstatetoshow,setobj,Validateform,showTypes,setShowTypes,showtypes})=>{

   const navi=useNavigate();

    return <div className='  w-[100%] h-[auto] flex items-center flex-col justify-center'>

{/* content  */}
<div className='flex w-[90%] h-[90%] overflow-hidden '>
    <form onSubmit={(e)=>{
        e.preventDefault();
    }}  className={` overflow-y-scroll px-[20px]  scroller  transition-all ${statetoshow=="type"?"!-ml-[100%]":""} min-w-[100%] h-[100%] flex flex-wrap justify-center gap-3 py-5  shadow-lg rounded-md border-[1px] border-[rgba(0,0,0,.2)] bg-white `}> 

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
        console.log(obj,localStorage.getItem("editid"));
        // addbook(obj);
        
            EditBook({id:(localStorage.getItem("editid")),obj})
            localStorage.removeItem('editid');
            navi("/library");
        // setrecall(!recall);
        // socket.emit('sendupdatedcountofbooks',1);
        // socket.emit(`sendupdatedcountofbooks`,[1,'something']);
        toast.success('Successfully Saved');
    }
 }} type='submit' className={` disabled:bg-[rgba(0,0,0,.2)] disabled:text-[rgba(0,0,0,.4)] bg-[white] border-[1px] border-black text-[black] px-[10px]  transition-all ${statetoshow=="type"?"active:scale-50":""} rounded-md`} disabled={statetoshow!="type"}>Submit</button>}
    </div>

    </div>
}