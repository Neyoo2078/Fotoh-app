import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { urlFor,client } from '../client'
import {MdDownloadForOffline } from 'react-icons/md';
import {AiTwotoneDelete} from "react-icons/ai"
import {BsFillArrowUpRightCircleFill} from "react-icons/bs"
import { fetchUser } from '../assets (1)/utilitty/fetchUser';
import {v4 as uuidv4} from "uuid"



const Pin = ({key,items,SanUser}) => {
    const {postedby,image,userid,destination, save,_id,category,title,about,imageasset} = items;
    const [Hoverr, setHoverr] = useState(false)
    const [Saver, setSaver] = useState(false)
    const navigate = useNavigate();
 const User = fetchUser();

 const newimage = image?image:imageasset;
 console.log({_id})

 const itemSaved= !!(save?.filter((save)=> save.postedby?._id === SanUser?.[0]?._id ))?.length;

const savePin = (id)=>{
  if(!SanUser || SanUser.length === 0){
    console.log("kindly login into your accout")
    return;
  }
  console.log(SanUser)
  if(!itemSaved){
    client.patch(id).setIfMissing({save: []}).insert("after","save[-1]",[{
        _key:uuidv4(),
        userid: SanUser?.[0]?._id,
        postedby:{ 
            _type: "postedby ",
         _ref:SanUser?.[0]?._id}     
    }]).commit();

    client.patch(SanUser?.[0]?._id).setIfMissing({pinsave: []}).insert("after","pinsave[-1]",[{
      _id,
      _key:uuidv4(),
    title:title,
    about:about,
    destination :destination,
    category: category,
    image:{_type:"image",asset:{_type:"reference",
  _ref:imageasset}
  },
  userid:postedby._id,
  postedby:{
  _type:"postedby",
  _ref: postedby._id
  }
}]).commit().then(()=>{
  window.location.reload();

})
}}

const deletePin =(id)=>{
  if(!SanUser || SanUser.length === 0){
    console.log("kindly signin into your accout")
    return;
  }
    client.delete(id).then(()=>{
      window.location.reload()
    })
}
  return(
    <div className='m-2'>
        <div
       onMouseEnter={()=>{setHoverr(true)}}
        onMouseLeave={()=>{setHoverr(false)}}
        onClick={()=>{navigate(`pin-details/${_id}`)}}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden">

<img src={urlFor(newimage).width(250).url()} className='rounded-lg w-full ' alt='user-post'/>
{Hoverr && <div 
className='rounded-lg w-full h-full absolute top-0 flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
style={{height: "100%"}}>
    
    <div className='flex items-center justify-between'>
        <div className='flex gap-2 justify-between'>
            <a href={`${items.image.asset.url}?dl=`}
            download
            onClick={(e)=>{e.stopPropagation()}}
            className="bg-white w-9 h-9 rounded-full flex flex-col  items-center  justify-center text-black text-xl opacity-50 hover:opacity-100 hover:shadow-md outline-none">
                <MdDownloadForOffline />
            </a>
            
        </div>
        {itemSaved ? <button type='button' className='bg-[#FF0000] opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
        > {save?.length} saved</button>:
         <button className='bg-[#FF0000] opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
         onClick={(e)=>{ e.stopPropagation();
         savePin(_id)}}>save</button>}
    </div>
    <div className='flex justify-between items-center g-2 w-full'>
      {destination &&<a
      href={destination}
      target="_blank"
      rel='noreferrer'
      className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
        <BsFillArrowUpRightCircleFill/>{destination.slice(8,15)}
      </a> }  
      <button className='bg-white p-2 opacity-70 hover:opacity-100 text-black font-bold  text-base rounded-3xl hover:shadow-md outline-none'
         onClick={(e)=>{ e.stopPropagation();
         deletePin(_id)}}><AiTwotoneDelete/></button>
    </div>
    </div>}
        </div>
   <Link to={`/userProfile/${SanUser?.[0]?._id}`} className="flex gap-2 mt-2 items-center text-[9px]">fotoh by:{postedby?.username}</Link>
    </div>
  )
}

export default Pin
