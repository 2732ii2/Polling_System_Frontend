import React, { useEffect, useState } from 'react'
import axios from "axios";
export default function useAuth(code) {
    console.log("code",code);
    const [access_token,setaccess_token]=useState();
    const [refresh_token,setrefresh_token]=useState();
    const [expiresIn,setExpiresIn]=useState();


    useEffect(()=>{

      const call=  async ()=>{
          if(code)

        {
            console.log("code => ",code);
          try{
            const res= await axios.post("http://localhost:3001/login",{
                code,
            })
            setaccess_token(res.data);
          }
          catch(e){
            console.log(e);
          }
         
        }
        }
        call();
  

    },[code])


    return access_token
}
