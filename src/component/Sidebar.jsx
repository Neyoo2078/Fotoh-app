import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {RiHomeFill} from "react-icons/ri"
import {IoIosArrowForward} from "react-icons/io"
import logos from "../assets (1)/assets/logos.png"
import foto  from "../assets (1)/assets/foto.png"
import Avatar from '@mui/material/Avatar';
import { category } from '../assets (1)/utilitty/category'

const Sidebar = ({user,closeToggle,SanUser}) => {
const handleclosebar = ()=>{
  if(closeToggle) closeToggle(false)
}


console.log((SanUser))
const isNotActiveStyle="flex items-center px-5 gap-3 text-grey-500 font-[1px] hover:text-black transition-all duration-200 ease-in-out capitalize  "
const isActiveStyle="flex items-center  px-5 gap-3 font-extrabold  border-r-2 border-black  transition-all duration-200 ease-in-out capitalize  "
  return (
    <div className='flex flex-col h-full min-w-210 overflow-y-scroll bg-white justify-between hide-scrollbar'>
      < div className='flex flex-col'>
        <Link to="/" className="flex px-5 gap2 my-6 pt-1 w-190 items-center  "
       onClick={handleclosebar} >
          <img src={foto} alt="logo" className='w-full '/> 
        </Link>
        <div className='flex flex-col gap-5'>
            <NavLink
             to="/"
            className={({isActive})=>isActive? isActiveStyle: isNotActiveStyle}
            onClick={handleclosebar} >
              <RiHomeFill/>
              Home
            </NavLink>
            <h3 className='mt-2 px-5  text-base 2xl:text-xl'> Discover categories</h3>
            {category.slice(0, category.length-1).map((items)=> (<NavLink   to={`/categories/${items.name}`}
            className={({isActive})=>isActive? isActiveStyle: isNotActiveStyle}
            onClick={handleclosebar} >
              <img src={items.image} className="w-[20px] h-[20px] rounded-full"/>
              {items.name}
           
            </NavLink>))}
            <NavLink
             to="/Saved"
            className={({isActive})=>isActive? isActiveStyle: isNotActiveStyle}
            onClick={handleclosebar} >
           
             My Fotors
            </NavLink>
        </div>
      </div> {user && <Link to={`userProfile/${SanUser?.[0]?._id}`}
       onClick={handleclosebar}
       className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3">
      <Avatar src={SanUser?.[0].profilepicture} className='w-10 h-10 rounded-full'/>
      <p>{user?.username}</p>
      </Link>}
      
      </div>
  )
}

export default Sidebar