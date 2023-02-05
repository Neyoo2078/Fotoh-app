import React from 'react'
import { Route,Routes,useNavigate } from 'react-router-dom'
import Login from './component/Login'
import Home from './container/Home'


const App = () => {
  return (
    <div className='font-bold'>
     <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path="/*" element={<Home/>}/>
        
     </Routes>
    </div>
  )
}

export default App
