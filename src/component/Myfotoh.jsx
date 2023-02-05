import React from 'react'
import { useState,useEffect } from 'react';
import { MansoryLayout } from '.';
import { savedfeedQuery } from '../assets (1)/utilitty/data';
import { client } from '../client';
import Spinner from './Spinner';
import { fetchUser } from '../assets (1)/utilitty/fetchUser';
import { userQuery } from '../assets (1)/utilitty/data';

const Myfotoh = ({SanUser}) => {
  const [loading, setloading] = useState( false);
  const [SavePin, setSavePin] = useState([]);
  

  const userinfo = fetchUser();
  useEffect(()=>async()=>{
   setloading(true)
   client.fetch(userQuery(userinfo?.email)).then((dat)=>{
    console.log({dat})
setSavePin(dat)
setloading(false)
   }).catch((err)=>{ console.log(err)})
    
   },[])
console.log({SavePin})
  if(loading)return <div className='m-auto'><Spinner message={"we are adding new fotohs to your feed"}/></div>
 if(!SavePin?.[0]?.pinsave){
  return  <div className='m-auto flex justify-center'>No Saved Fotoh Yet</div>
 }
  return (

    <div>{SavePin && <MansoryLayout Pins={SavePin?.[0]?.pinsave} SanUser={SanUser}/>}</div>
  )

  
}

export default Myfotoh