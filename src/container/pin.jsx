import React from 'react'
import { NavBar, Feed, Search, CreatePin, PinDetails } from '../component'
import { Route,Routes } from 'react-router-dom'
import { useState } from 'react'
import Myfotoh from '../component/Myfotoh'
import UserDetails from '../component/UserDetails'
import {UserProfile} from '../component'



const Pin = ({user,SanUser}) => {

  const [Searcher, setSearcher] = useState(null);

  return (
    <div className=' bg-gray-50  pt-5 h-screen'>
      <div className='px-2 md:px-5'>
        <NavBar Searcher={Searcher} setSearcher={setSearcher} user={user} SanUser={SanUser}/>
      </div>
      <div className='h-full md:px-5'>
        <Routes>
          <Route path='/*' element={<Feed SanUser={SanUser}/>}/>
          <Route path='/categories/:categoriesid' element={<Feed/>}/>
          <Route path='/pin-details/:pinid' element={<PinDetails user={user} SanUser={SanUser}/>}/>
          <Route path='/create-pin' element={<CreatePin user={user} SanUser={SanUser}/>}/>
          <Route path='/search' element={<Search Searcher={Searcher} setSearcher={setSearcher}/>}/>
         
          <Route path='/user-detail/:userid' element={<UserDetails SanUser={SanUser && SanUser}/>}/>
          <Route path='/edit-profile' element={<UserProfile SanUser={SanUser && SanUser}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Pin