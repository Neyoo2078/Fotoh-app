import React from 'react'
import Mansory from "react-masonry-css"
import {Pin} from "../component"


const  MansoryLayout = ({Pins,SanUser}) => {

  const breakpoints ={
    default: 4,
    3000: 6,
    2000:5,
    1200: 3,
    1000:2,
    500:1
  }
  return (
   <Mansory className='flex animate-slide-fwd' breakpointCols={breakpoints}>
    { Pins?.map((items)=> <Pin key={items.userid} items={items} SanUser={SanUser} className="w-max"/>)}
   </Mansory>
  )
}

export default MansoryLayout
