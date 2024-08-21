import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useAuth from './useAuth';
import SpotifyPlayer from 'react-spotify-player';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import SpotifyPlayer from './CustomPlayer/CustomPlayer';
export default function Dashboard() {
  const select=  useSelector(state=>state);
  const [res,setres]=useState();
  console.log(res);
  const [value,setvalue]=useState("");
  console.log(value);
  const [songurl,setsongurl]=useState('');
  const [data,setdata]=useState([]);
  const [access_token,setaccess_token]=useState();
  const [refresh_token,setrefresh_token]=useState();
  const [expiresIn,setExpiresIn]=useState();
  const navi=useNavigate();
  console.log(select.code);
 
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
    const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}
  const [current_track, setTrack] = useState(track);



  
  useEffect(()=>{
    console.log("song url updated");
  },[songurl])
   const getArtist= async (res)=>{
    const url='https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums';
    try{
      const resp=await axios.get( url?url:`https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg`, {
      headers: {
        'Authorization': 'Bearer ' + res?.access_token,
      },
      params: {
        limit: 10,
        offset: 5,
      },
    })
      console.log(resp?.data?.items);
      setdata(resp?.data?.items)
    }
    catch(e){
      console.log(e);
    }
   
   }
    async function getartist(res){
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
 
      
  


    async function searchSong(searchvalue){

      var url=`https://api.spotify.com/v1/search?q=${searchvalue}&type=album`;
    try{
      const resp=await axios.get( url?url:`https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg`, {
      headers: {
        'Authorization': 'Bearer ' + res?.access_token,
      },
      params: {
        limit: 10,
        offset: 5,
      },
    })
      console.log(resp,resp?.data?.albums?.items);
      setdata(resp?.data?.albums?.items);
    }
    catch(e){
      console.log(e);
    }
    }



    useEffect(()=>{
    const id= setTimeout(() => {
      if(value)
        searchSong(value)
      }, 3000);

      return ()=>{
        clearTimeout(id);
      }
    },[value])
      const {code}= select;
      useEffect(()=>{
  
        const call=  async ()=>{
            if(code)
          
           {
              console.log("code => ",code);
            try{
              const res= await axios.post("http://localhost:3001/login",{
                code,
              })
              // setaccess_token(res.data);
              setres(res.data);
            }
            catch(e){
              console.log(e);
            }
           
          }
          }
          call();
  
      },[code])
  



   


    useEffect(()=>{
      if(res){
        //  gettrack(res);
        getArtist(res);
      }

    },[res])


    const size = {
      width: '100%',
      height: 300,
    };
    const view = 'coverart'; // or 'coverart'
    const theme = 'black'; //
  return (
    <div>Dashboard


    
    
  <Link to={"http://localhost:3001/login"}  >  <button style={{width:"150px",height:"35px",border:"none",background:"black",color:"white",fontSize:"16px",borderRadius:"4px"}}> Get Artists</button></Link>


    <input onChange={(e)=>setvalue(e.target.value)} value={value} style={{width:"300px",height:"35px",borderRadius:"10px",border:"1px solid black"}} />
    <div style={{width:"100%",height:"70vh",border:"1px solid black",display:"flex",flexWrap:"wrap",padding:"40px",gap:"10px"}}>
   {
    data.length?data.map((e,i)=>{
      return <div onClick={()=>{
        console.log(e?.uri);
        setsongurl(e?.uri);
      }} key={i} style={{display:"flex",flexDirection:"column",alignItems:"start",gap:"10px"}}>
      <img src={e?.images[0].url} style={{width:"250px",height:"250px",borderRadius:"20px"}} />
        <p style={{background:"rgba(200,0,0,.4)",color:"red",padding:"5px",borderRadius:"5px"}}>{e?.name}</p>
      </div>
    }):null
   }


    </div>

  <div style={{width:"100%",height:"auto"}}>

{( res?.access_token && songurl) && 


    <SpotifyPlayer
      uri={songurl}
      size={size}
      view={view}
      theme={theme}
    />
      
      } 
 
  </div>

    </div>
    
  )
}
