import React, { useEffect, useState } from 'react'
import axios from 'axios';

import SearchIcon from '@mui/icons-material/Search';
export default function Mediaplayer() {
    var list_=[1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    const [songInfo, setSongInfo] = useState(null);
    const [songUrl, setSongUrl] = useState('');

    async function ApicallforSearch(){
        const options = {
            method: 'POST',
            url: 'https://youtube-music4.p.rapidapi.com/search',
            headers: {
              'x-rapidapi-key': '5f473171c0msh74bda403cfe26ccp11d9adjsn83830e050179',
              'x-rapidapi-host': 'youtube-music4.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            data: {
              q: 'all of me',
              shelf: 'song'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
          } catch (error) {
              console.error(error);
          }
    }
    async function ApiforAlbumCall(){
            const options = {
            method: 'POST',
            url: 'https://youtube-music4.p.rapidapi.com/album',
            headers: {
                'x-rapidapi-key': '5f473171c0msh74bda403cfe26ccp11d9adjsn83830e050179',
                'x-rapidapi-host': 'youtube-music4.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                album_id: 'MPREb_ss5zabwj1Tn'
            }
            };

            try {
                const response = await axios.request(options);
                const songData = response.data;
                // Assuming the response contains an array of songs
                const song = songData.results.contents[0]; // Modify this based on your actual response structure
                const songId = song.id;
                const songTitle = song.title;
                const songDuration = song.duration.text;
                setSongInfo({ title: songTitle, duration: songDuration });
                setSongUrl(`https://www.youtube.com/watch?v=${songId}`);
                console.log("response=>",songData,song,songId,songTitle,songDuration);
            } catch (error) {
                console.error(error);
            }
    }
    // MPREb_JIdvUbsCbwZ
    // MPREb_ss5zabwj1Tn
    // MPREb_SI3uUbEnXVL

    useEffect(()=>{
        ApicallforSearch();
        ApiforAlbumCall();
    },[])
  return (
    <div className='w-[100%] h-[100vh]   bg-black  flex  '>
        <div className='w-[10%] h-[100%] flex flex-col bg-[rgba(255,255,255,.1)]   '>
            <div className='icon w-[100%] h-[100px] !border-[red] text-white   tracking-wider font-bold text-[20px] flex items-center  justify-center'> M-player</div>

        </div>

        <div className='w-[100%] h-[100%] bg-[rgba(255,255,255,.1)]   flex flex-col '>

        <div className='w-[100%] h-[100px] flex justify-between items-center  '>
             <div></div>
             <div className='w-[45%] h-[50%] border-[1px] border-white rounded-lg overflow-hidden flex ' >
                <input className='bg-[rgba(255,255,255,.5)]  w-[80%] h-[100%] outline-none border-none px-[20px] py-[10px] text-[16px] text-[rgba(0,0,0,.8)] '  placeholder='Search your Song ...'/>
                <div className='w-[20%] h-[100%]  flex items-center justify-center searchicon '>
                    <SearchIcon  className='text-[white] icon'/>
                </div>
             </div>
             <div></div>

        </div>
        
        <div className='w-[100%] h-[90%]  bg-[rgba(0,0,0,.8)] gap-[10px] flex flex-col  items-center py-[50px] overflow-y-scroll'>
            <div className='w-[95%] min-h-[auto] h-auto  flex flex-wrap justify-center  gap-[20px] py-[20px] '>
            {
                list_.map((e,i)=>{
                    return <div key={i} className='w-[300px] h-[450px] border-[1px] border-white'>{i}
                  {songInfo && (
                <div>
                    <p>Playing: {songInfo.title} ({songInfo.duration})</p>
                    <audio controls src={songUrl} autoPlay>
                        Your browser does not support the audio element.
                    </audio>
                </div>
                
            )}
                    </div>
                })
            }

            </div>
            <div className='w-[90%] min-h-[110vh] border-[1px] border-white'></div>

        </div>


        </div>
    </div>

    
  )
}
