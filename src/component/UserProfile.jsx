import React from 'react'
import NavBar from './NavBar'
import { Avatar } from '@mui/material'
import { GrFormAdd } from "react-icons/gr";
import FileBase64 from "react-file-base64";
import { useState,useEffect } from 'react'
import MansoryLayout from './MansoryLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { client } from '../client'
import Spinner from './Spinner'


import {BiArrowBack} from "react-icons/bi"



// import {userDetails,userCreatedPinQuery,userSavedQuery} from '../assets (1)/utilitty/data.js'

const UserProfile = ({ user, SanUser }) => {

  const [profilePicture, setprofilePicture] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [otherNames, setotherNames] = useState("");
  const [Bio, setBio] = useState("");
  const [Gender, setGender] = useState("male");
  const [Intrest, setIntrest] = useState("");
  const [EditProfile, setEditProfile] = useState(false);


  





  const Navigate = useNavigate();



 



 




const doc = {
  profilepicture: profilePicture,
  firstname:firstName,
  othername:otherNames,
   bio:Bio,
   gender:Gender,
   intrest: Intrest
}

console.log({doc})
  const updateProfile=()=>{
   
    if(profilePicture && firstName && otherNames && Bio && Gender && Intrest){
      const doc = {
        profilepicture: profilePicture,
        firstname:firstName,
        othername:otherNames,
         bio:Bio,
         gender:Gender,
         intrest: Intrest
      }
    

      client.patch(SanUser[0]._id).set(doc).commit().then(()=>{
        console.log("upload completed");
        Navigate("/")
      })
    }
  }

  
  return (
    <div className=' bg-gray-50  pt-5 '>
      <div className='flex items-center flex-col w-4/5 p-3 bg-gray-100 m-auto h-full '>
        <div className='flex justify-end items-center mr-10 w-full'
        onClick={()=>{setEditProfile(false)}}>
       <BiArrowBack size={20}  className='text-gray-500 '/>
          <button type="button"
            onClick={()=>{Navigate(`/user-detail/${SanUser?.[0]._id}`)}}
        className='text-gray-500 mx-2 border-2 border-gray-200 p-1 rounded-full'>Back</button>
       
        </div>
        <div className=' flex justify-center  items-center   '>
        {profilePicture ?
         
            <img src={profilePicture} alt="user-fotoh" className='w-[150px] h-[150px] rounded-full' />
           : <label className=' flex flex-col justify-center  items-center'>
          
              <Avatar square className="border-2 border-gray-500 " style={{ width: "150px", height: "150px" }} />
              
              <FileBase64
                typr="file"
                multiple="false"
                className="w-0 h-0"
                onDone={(base64) => { setprofilePicture(base64[0].base64) }} />
           
          </label>}</div>
        <div className='flex flex-col'>
          <input placeholder='enter first name' className='mt-5 p-2 w-[300px]'
            onChange={(e) => { setfirstName(e.target.value) }}
             />

          <input placeholder='enter second and last name' className='mt-5  p-2 w-[300px]'
            onChange={(e) => { setotherNames(e.target.value) }} />
          <select  value={Gender} className='mt-5  p-2 w-[300px]'
            onChange={(e) => { setGender(e.target.value) }}>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          <textarea onChange={(e)=>{setBio(e.target.value)}} placeholder="enter bio"  maxLength="40" className='mt-5 h-[100px] p-2 w-[300px] resize-none' />
          <input onChange={(e)=>{setIntrest(e.target.value.split(","))}} placeholder='my intrest' className='mt-5  p-2 w-[300px]' />
          <button type='button' className='mt-5  p-2 w-[300px] border-2 ' onClick={updateProfile}>Update Profile </button>
        </div>
      </div>
    </div>


  )
}

export default UserProfile