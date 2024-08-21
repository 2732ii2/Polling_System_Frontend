import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddElementComp=(props)=>{
    // console.log(props);
    const navigate = useNavigate();

  const navi = (path) => {
    console.log(path)
    path=path.replace("http://localhost:3000/library/addbook/",'')
    // navigate(path, { replace: true });
  };
    const {e,index,setobj}=(props);
    var copy_e=e;
    const [arrofElement,setArrofElement]=useState([]);
    const [inpvalue,setinpvalue]=useState();
    function callthatone(elem){
        if(inpvalue)
        setArrofElement((prev)=>{
            return [...prev,inpvalue]
        })
       

        setinpvalue("");
    }
 
    useEffect(()=>{
        setobj(prev=>{
            return {...prev,
            volumeInfo:{
                ...prev.volumeInfo,[e]:[...arrofElement]
            }
            }
        })
    }
    ,[arrofElement])
    return  <div  key={index}  className='min-w-[35%] relative  h-[20%] text-[16px] flex-col flex font-sans capitalize font-semibold'>{e}
    <input   onKeyDown={(el)=>{
        if(el.key=="Enter"){
            callthatone(e);
        }
    }} value={inpvalue} onChange={(e)=>setinpvalue(e.target.value)}  className='w-[100%] h-[40px] border-[1px]  border-[#0073ff] outline-none rounded-md mt-[5px] px-[20px]' />
    <button onClick={()=>{
        callthatone(e);
    }} className='text-[red] absolute top-[35px] left-auto right-3   px-[8px] pb-[2px] rounded-[5px] bg-[#fc9797]'>+</button>
    <div className='w-[100%] h-[40px]   mt-2  flex gap-[5px] '>
        {
            arrofElement.length?<>
                {
                    arrofElement.map((e,i)=>{
                        console.log(e);
                        return <div key={i} className={` ${copy_e=="imageLinks"?"w-[200px] truncate":""}  shadow-md relative  h-[25px] px-3 `}>
                            
                            {copy_e=="imageLinks"?<a href={`${e}`}  className='max-w-[200px] text-[blue] w-[200px] truncate'>{e}</a>: e}
                            <button onClick={()=>{
                                var index=arrofElement.indexOf(e);
                                console.log(arrofElement.splice(index,1));
                                setArrofElement(()=>{
                                    return [...arrofElement]
                                });
                            }}   className=' absolute top-0  right-0 cursor-pointer text-[red] border-[1px] pb-[3px] flex items-center justify-center border-[red] w-[10px] h-[10px] rounded-[50%] '>-</button>
                        </div>
                    })
                }
            
            </>:null
        }
    </div>
    </div>
}



const InputComp=(props)=>{

    const {e,index,setobj}=(props);
    var copy_e=e;
    // console.log(copy_e);
    const [inpvalue,setinpvalue]=useState();
    function callthatone(){
        setinpvalue("");
    }

    
    console.log(inpvalue)
    return  <div  key={index}  className='min-w-[auto] w-auto relative  h-[20%] text-[16px] flex-col flex font-sans capitalize font-semibold'>{e}
   { e!="description"? <input type={e=="publishedDate"?"date":""} required={true} value={inpvalue} onChange={(el)=>{
    setinpvalue(el.target.value)

    setobj((obj)=>{
        return {...obj,volumeInfo:{
                ...obj.volumeInfo,[e]:el.target.value
        }}
    })
   }}  className={`w-[100%]  ${e=="description"?"h-[100%] text-start":"h-[40px]"} border-[1px]  border-[#0073ff] outline-none rounded-md mt-[5px] px-[20px]`} />
    :
    <textarea required={true} value={inpvalue} onChange={(el)=>{
        setinpvalue(el.target.value)
        setobj((obj)=>{
            return {...obj,volumeInfo:{
                    ...obj.volumeInfo,[e]:el.target.value
            }}
        })
        }}  className={`w-[100%] ${e=="description"?"h-[100%] text-start":"h-[40px]"} border-[1px]  border-[#0073ff] outline-none rounded-md mt-[5px] px-[20px]`} />}
    </div>
}
export {InputComp,AddElementComp}