import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useAuth from './useAuth';
import axios from 'axios';
export default function Dashboard() {
  const select=  useSelector(state=>state);
  console.log(select.code);
    // https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6
        // https://api.spotify.com/v1/artists


    async function call(res){
        const response = await axios.get('https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6', {
            headers: {
              'Authorization': 'Bearer ' + res?.access_token,
            },
            params: {
              limit: 0,
              offset: 50,
            },
          });
          console.log(response,response?.data?.artists?.items);
    }
    async function gettrack(res){
        const response = await axios.get('https://api.spotify.com/v1/albums/{id}/tracks?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6', {
            headers: {
              'Authorization': 'Bearer ' + res?.access_token,
            },
            params: {
              limit: 0,
              offset: 50,
            },
          });
          console.log(response);
    }
    async function AccessTokenCall(){
        var res=  await  useAuth(select.code);
        console.log("access_token",res);

        if(res?.access_token)
       {
        console.log("inside",res?.access_token);
        call(res);
        gettrack(res);
        // const data= await axios.post("http://localhost:3001/getartists",{
        //     Headers:{
        //         authorization:JSON.stringify(res.access_token)
        //     }

        // })
        // console.log(data);
       }

    }

    AccessTokenCall();





  
  return (
    <div>Dashboard

<button onClick={()=>{
    console.log("got hit");
            }}  style={{width:"150px",height:"35px",border:"none",background:"black",color:"white",fontSize:"16px",borderRadius:"4px"}}> Call Artists</button>

    </div>
  )
}
