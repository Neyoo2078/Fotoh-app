import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import{ MansoryLayout,Spinner} from '../component';
import { searchQuery } from '../assets (1)/utilitty/data';
import { feedQuery } from '../assets (1)/utilitty/data';

const Feed = ({SanUser}) => {
  const [loading, setloading] = useState( false);
  const [Pin, setPin] = useState(null);
  

  const {categoriesid} = useParams();
  useEffect(( )=>{ setloading(true)
    console.log({SanUser})

    if(categoriesid){const query = searchQuery(categoriesid)
    client.fetch(query).then((res)=>{setPin(res)
    setloading(false)})
    }else{
      client.fetch(feedQuery).then((res)=>{setPin(res)
        setloading(false)})
    }
         
  },[categoriesid])

  console.log(Pin)
  console.log({SanUser})
  if(loading)return <div className='m-auto'><Spinner message={"we are adding new fotohs to your feed"}/></div>
  if(!Pin || Pin.length <= 0)return <div className='flex justify-center'> No Fotoh Available For this Category</div>
  return (

    <div>{Pin && <MansoryLayout Pins={Pin} SanUser={SanUser}/>}</div>
  )
}

export default Feed