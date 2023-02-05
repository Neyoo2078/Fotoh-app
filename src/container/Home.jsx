import React from 'react'
import { useState,useRef,useEffect } from 'react';
import {HiMenu} from "react-icons/hi"
import {AiFillCloseCircle} from "react-icons/ai"
import {Link,Routes,Route} from "react-router-dom"
import { client } from '../client';
import {Sidebar,UserProfile} from '../component';
import logos from "../assets (1)/assets/logos.png"
import Pin from "./pin"
import axios from 'axios';
import foto  from "../assets (1)/assets/foto.png"
import Avatar from '@mui/material/Avatar';
import { fetchUser } from '../assets (1)/utilitty/fetchUser';
import { userQuery } from '../assets (1)/utilitty/data';



const Home = () => {
   const userinfo = fetchUser();
  
  const [user,setuser] = useState(null);
  const [SanUser,setSanUser] = useState(null);
  const scrollref = useRef(null);
  const [ToggleSidebar, setToggleSidebar] = useState(false)
  
  
  
  useEffect(()=>async()=>{
    const {data} = await axios.get(`http://localhost:5000/fotor/${userinfo?._id}/finduser`);
   client.fetch(userQuery(userinfo?.email)).then((dat)=>{
    console.log({dat})
   setSanUser(dat)
   }).catch((err)=>{ console.log(err)})
    setuser(data)
   },[])
   console.log({SanUser})

   useEffect(()=>{
   scrollref.current.scrollTo(0,0)
   },[])

 
  return (
    <div className='flex md:flex-row flex-col h-screen bg-grey-50 transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user}  SanUser={SanUser && SanUser} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
        <HiMenu fontSize={40} className="cursor-pointer" onClick={()=>{setToggleSidebar(true)}}/>
        <Link to="/"> <img src={foto} alt="logos" className='w-28' /></Link>
        <Link to={ `UserProfile/${user?._id}`}> {SanUser?<Avatar src={SanUser?.[0]?.profilepicture} alt="logos" className='w-28' />:<Avatar src={""} alt="logos" className='w-28' />}</Link>
        <Link to={`/login`}>
          {!user ? <button className='bg-[#3f25b1] text-white p-2 rounded-lg'>Sign in</button>: <button onClick={()=>{localStorage.clear()}} className='bg-[#e54a61] text-white p-2 rounded-lg'>Log out</button>}
         
        </Link>
        </div>
        {ToggleSidebar && <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in' >
         <div className='absolute w-full flex justify-end items-center p-2'>
          <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={()=>{setToggleSidebar(false)}}/>
          </div> 
          <Sidebar  user={user && user} SanUser={SanUser && SanUser} closeToggle={setToggleSidebar} />   
          </div>
          }
      </div>
     
          <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollref}>
            <Routes>
              <Route path='/userProfile/:userid' element={<UserProfile user={user && user} SanUser={SanUser && SanUser}/>}/>
              <Route path='/*' element={<Pin user={user && user} SanUser={SanUser && SanUser}/>}/>
            </Routes>
          </div>
          
      </div>
  )
}

export default Home;