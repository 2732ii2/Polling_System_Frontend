import React, { useEffect, useState } from 'react'
import axios from "axios";
export default function useAuth(code) {
    console.log("code",code);
    const [access_token,setaccess_token]=useState();
    const [refresh_token,setrefresh_token]=useState();
    const [expiresIn,setExpiresIn]=useState();


    useEffect(()=>{

        if(code)

        {
            console.log("code => ",code);
            axios.post("http://localhost:3001/login",{
                code,
            })
            .then(res=>{
                setaccess_token (res.data);

            })
            .catch(e=>{
                console.log (e?.message);
            })
        }
  

    },[code])


    return access_token
}
