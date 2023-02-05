import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { Avatar } from '@mui/material'

const NavBar = ({ Searcher, setSearcher, user,SanUser }) => {


  const navigate = useNavigate()

  return (
    <div className='flex gap-2 md:gap-5 w-full pb-7'>
      <div className='flex justify-start items-center w-[85%] px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className="ml-1" />
        <input type="text"
          onChange={(e) => { setSearcher(e.target.value) }}
          placeholder="Search"
          value={Searcher}
          onFocus={() => { navigate("/search") }}
          className="p-2 w-full bg-white outline-none" />
      </div>
     
      <Link to="create-pin" className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
         <IoMdAdd/>
        </Link>
        <div className='m-auto gap-3 hidden md:block items-center justify-center'>
        <Link to={`/login`}>
          {!user ? <button className='bg-[#3f25b1] text-white p-2 rounded-lg'>Sign in</button>: <button onClick={()=>{localStorage.clear()}} className='bg-[#e54a61] text-white p-2 rounded-lg'>Log out</button>}
         
        </Link>
      </div>
    </div>
  )
}

export default NavBar