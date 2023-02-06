import React from 'react';
import axios from "axios"
import {  useNavigate } from 'react-router-dom';
import foto from "../assets (1)/assets/foto.mp4"
import logos from "../assets (1)/assets/logos.png"
import logo from "../assets (1)/assets/logos.png"
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { client } from '../client';
import { BaseURL } from '../assets (1)/utilitty/Connection';




const Login = () => {

   const navigate = useNavigate();
   const [signup, setsignup] = useState(false)
  
   const [emailStaus, setemailStatus] = useState(true)
   const [pwdStaus, setpwdStatus] = useState(true)
   const [pwdmatch,setpwdmatch] = useState(true)
   const [emailError,setemailError] = useState(null)
   const [Error,setError] = useState(null)
   const [ErrMsg,setErrMsg] = useState(null)
   
  
   const [Emailfocus, setEmailfocus] = useState(null)
   const [ CpwdFocus,setCpwdFocus] = useState(null)

   const [ pwdFocus, setpwdFocus] = useState(null)
 
   const [logDetails, setlogDetails]= useState({
    username:"",
    email:"",
    password:"",
    repassword:""
})



const [accesDetails, setaccessDetails]= useState({
    email:"",
    password:""
   })
   
   const loginError = (message)=>{ setError(true)
    setErrMsg(message)
    setTimeout(()=>{   setError(false)},2000)}

    

// password verification
useEffect(()=>{
    const symbl = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,15}$/;
    if (symbl.test(logDetails.password) === false){
        setpwdStatus(false)
        
    }else {
        setpwdStatus(true)
    }  },[logDetails.password])


    // Login password verification
useEffect(()=>{
    const symbl = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,15}$/;
    if (symbl.test(accesDetails.password) === false){
        setpwdStatus(false)
        
    }else {
        setpwdStatus(true)
    }  },[accesDetails.password])

    useEffect(()=>{
        if(logDetails.password !== logDetails.repassword){
            setpwdmatch(false)
          
        }else{  setpwdmatch(true)}},[logDetails.repassword])

    // email verification
    useEffect(()=>{
        const symbl = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (symbl.test(logDetails.email) === false){
      
            setemailStatus(false)
         return;
        }else  setemailStatus(true)},[logDetails.email])


    // email Login verification
        useEffect(()=>{
            const symbl = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (symbl.test(accesDetails.email) === false){
          
                setemailStatus(false)
             return;
            }else  setemailStatus(true)},[accesDetails.email])
    


    const submitHandler= async(e)=>{
       e.preventDefault();
       const ran =Math.random().toString();
       if(logDetails.username.length <= 0 || logDetails.email.length <= 0|| logDetails.password.length <= 0){
        loginError("Fill all fields")
        
    return}
       
       await axios.post(`${BaseURL}`,{username:logDetails.username, email:logDetails.email,
       password:logDetails.password}).then((res)=>{
       
        if(res.data.status === false){
          
            loginError("Email Already Existing")
            return;
        }else{
            const doc = {...logDetails,_type:"user",_id:ran }
            const {_id,username,email}= doc
            localStorage.setItem("users", JSON.stringify({_id,username,email}))
     
            client.createIfNotExists(doc)
            setsignup(false)
           setlogDetails({
             username:"",
             email:"",
             password:"",
         
         }) 
        }
       })

      
    }
   

    const accessHandler =async(e)=>{
        e.preventDefault();
        if(!accesDetails.email && !accesDetails.password){   loginError("Fill all fields");
       return }
        await axios.post(`${BaseURL}/access`,{email:accesDetails.email,password:accesDetails.password}).then((res)=>{
         
        if(res.data.valid){
                
               localStorage.setItem("user",JSON.stringify({username:res.data.user.username,email:res.data.user.email,_id:res.data.user._id}))
               navigate("/",{replace:true});
            }else{
                console.log(res.data.error)
                loginError("Invalid Email or Password")
            }
        })
              
    }

  return (
    <div className='flex flex-col h-screen justify-start items-center'>
        <div className='w-full h-full  relative'>
            <video
            className='w-full h-full object-cover'
            src={foto}
            muted
            autoPlay
            control="false"
            loop
            type="video.mp4"
            />
        </div>
        <div className='absolute flex flex-col justify-center items-center bg-blackOverlay top-0 right-0 left-0 bottom-0 '>
            <div className='p-5'>
                <img src={logo} alt="foto" />
            </div>
            <div>
                {signup?<form className='flex flex-col gap-4' onSubmit={submitHandler}>
                <p className={` text-red-500` }>{Error && ErrMsg  }</p> 
                <input value={logDetails.username} type="text" onChange={(e)=>{setlogDetails({...logDetails,username: e.target.value})}} placeholder='userName' className='w-[300px] p-[5px] outline-none'/>
                  
                  <p className={` text-red-500` }>{!emailStaus && Emailfocus  && "invalid email"  }</p> 
                    <input onFocus={()=>{setEmailfocus(true)}} onBlur={()=>{setEmailfocus(false)}} value={logDetails.email} type="email" onChange={(e)=>{setlogDetails({...logDetails,email: e.target.value})}} placeholder='email' className='w-[300px] p-[5px] outline-none'/>
                   
                    <p  className={` text-red-500` }>{!pwdStaus && pwdFocus && "Password invalid"  }</p> 
                  <input onFocus={()=>{setpwdFocus(true)}} onBlur={()=>{setpwdFocus(false)}}  value={logDetails.password} type="password" onChange={(e)=>{setlogDetails({...logDetails,password: e.target.value})} } placeholder='password' className='p-[5px] outline-none'/>
                   
                    <p  className={` text-red-500` }>{!pwdmatch && CpwdFocus &&"Password does not match"  }</p> 
                    <input  onFocus={()=>{setCpwdFocus(true)}} onBlur={()=>{setCpwdFocus(false)}} value={logDetails.repassword} type="password" onChange={(e)=>{setlogDetails({...logDetails,repassword: e.target.value})} } placeholder='confirm password' className='p-[5px] outline-none'/>
                    <button type='submit' className='bg-white w-[150px] p-[5px] rounded-md' >Sign up</button>
                </form>
                :
                <form className='flex flex-col gap-4' onSubmit={accessHandler}>
                     <p className={` text-red-500` }>{Error && ErrMsg  }</p> 
                     <p className={` text-red-500` }>{Emailfocus && !emailStaus && "invalid email" }</p> 
                 <input   onFocus={()=>{setEmailfocus(true)}} onBlur={()=>{setEmailfocus(false)}} value={accesDetails.email} type="email" onChange={(e)=>{setaccessDetails({...accesDetails,email: e.target.value})}} placeholder='email' className='w-[300px] p-[5px] outline-none'/>
                 <p  className={` text-red-500` } >{!pwdStaus && pwdFocus && "Password invalid"  }</p> 
                    <input onFocus={()=>{setpwdFocus(true)}} onBlur={()=>{setpwdFocus(false)}} type="password" onChange={(e)=>{setaccessDetails({...accesDetails,password: e.target.value})} } placeholder='password' className='p-[5px] outline-none'/>
                    <button type='submit' className='bg-white w-[150px] p-[5px] rounded-md' >Log In</button>
                </form>}
                {signup?<div className='text-[#535ed9]'>
                    Already registered <span onClick={()=>{setsignup(!signup)}}>Log in</span>
                </div>:<div className='text-[#535ed9]'>
                    not registered yet <span onClick={()=>{setsignup(!signup)}}>Sign up</span>
                </div>}
                
            </div>
        </div>
   
    </div>
  )
}

export default Login
