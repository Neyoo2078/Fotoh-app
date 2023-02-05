import React from 'react'
import { useState,useEffect } from 'react'
import MansoryLayout from './MansoryLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { client } from '../client'
import Spinner from './Spinner'
import { userDetails } from '../assets (1)/utilitty/data'
import {feedQuery,userSavedPinsQuery} from '../assets (1)/utilitty/data';
import { Avatar } from '@mui/material'

const UserDetails = ({SanUser,User, userid,EditProfile,setEditProfile}) => {
   
const [ActiveBtn,setActiveBtn] = useState("Created");
const [Text,setText] = useState("Created");
const [Pin,setPin] = useState(null);
const ActiveStyle ="bg-red rounded-full p-2 text-white mr-3"
const NActiveStyle ="bg-white rounded-full p-2 text-black  ";


  const RandomImage ="https://source.unsplash.com/1600x900/?nature,photography,technology,automobile,catoon"
  
  useEffect(()=>{
   console.log({userid})
        if( Text ==="Created"){
            client.fetch(feedQuery).then((res)=>{
              
       const Created = res?.filter((items)=> items?.postedby?._id === userid)
        setPin(Created)
        }
            )
    }else{
        client.fetch(userSavedPinsQuery(userid)).then((res)=>{
            console.log({res})
               setPin(res)}
            
                 )
    }}
    
  ,[Text, userid])

  console.log({User})
  
  return (
    <div className='relative p-2 h-full justify-center items-center'>
        <div className='flex flex-col p-5'> 
        <div className='relative flex flex-col mb-7'> 
            <div className='flex flex-col justify-center items-center'>
                <img
                src={RandomImage}
                className="w-full h-[250px] 2xl:h-150 shadow-lg object-cover" />
                {User?.[0].profilepicture?<img className='rounded-full w-40 h-40 -mt-[120px]  border-2  bshadow-xl'
                src={User?.[0].profilepicture
               }
               alt="user-pics"
                />: <Avatar size="large"  sx={{fontSize:"250px", width:"160px", height:"160px"}} className='rounded-full text-[200px] -mt-[120px]  border-2  bshadow-xl'/>}
                <div className='flex items-end w-full justify-end' >
                    <button 
                    className='-mt-[30px] outline-4 border-2 bg-gray-100 p-2 rounded-full'
                    onClick={()=>{setEditProfile(!EditProfile)}} >
                        EditProfile
                        </button>
                        </div>
                
                <div className=' flex flex-col w-full mb-4 justufy-center items-start'>
                <h1 className='font-bold text-3xl mt-3 ' >{User?.[0].firstname && `${User?.[0].firstname} ${User?.[0].othername}`}</h1>
                <h1 className='font-semibold  my-3 ' >@{User?.[0].username}</h1>
                <p  className='font-semibold ' >{User?.[0]?.bio &&`${User?.[0]?.bio}`}</p></div>
                <div className='flex justify-center mt-6'>
                    <button
                    type='button'
                    onClick={(e)=>{setText(e.target.textContent)
                        setActiveBtn("Created")}}
                   className={ActiveBtn == "Created" ?`${ActiveStyle}`:`${NActiveStyle}`}>Created</button>
                    <button
                    type='button'
                    onClick={(e)=>{setText(e.target.textContent)
                        setActiveBtn("Saved")}}
                        className={ActiveBtn == "Saved" ?`${ActiveStyle}`:`${NActiveStyle}`}
                    >Saved</button>
                </div>
                <div className='px-2 w-full'>
                    {Pin && <MansoryLayout Pins={Pin && Pin}></MansoryLayout>}
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default UserDetails
 