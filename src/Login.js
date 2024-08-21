import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetCode } from './Redux/actions';


const code= new URLSearchParams(window.location.search).get('code');


 function Login() {
    const navi=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        console.log("updated");
        if(code){
            dispatch(GetCode(code));
            setTimeout(()=>{
                navi("/dashboard");
            },[500])
        }
    },[code])
  return (
    <div> {code?code: "Login"}</div>
  )
}
