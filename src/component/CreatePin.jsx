import { useStepContext } from '@mui/material'
import React,{useState} from 'react'
import { client } from '../client'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDehaze, MdDelete } from 'react-icons/md'
import { category } from '../assets (1)/utilitty/category'


const CreatePin = ({SanUser}) => {
console.log({SanUser})
  const navigate = useNavigate()

  const [Title, setTitle] = useState("")
  const [About, setAbout] = useState("")
  const [Destination, setDestination] = useState("")
  const [Loading, setLoading] = useState(false)
  const [Fields, setFields] = useState(false)
  const [Categories, setCategories] = useState(null)
  const [ImageAsset, setImageAsset] = useState(null)
  const [WrongImageType, setWrongImageType] = useState(null)

  const SavePin=()=>{
    if(!SanUser || SanUser.length === 0){
      console.log("kindly login into your accout")
      return;
    }
    if(Title && About && Destination && Categories && ImageAsset?._id){
      const doc = {
        _type:"pin",
      title:Title,
      about:About,
      destination :Destination,
      category: Categories,
      image:{_type:"image",asset:{_type:"reference",
    _ref:ImageAsset._id}
    },
    userid:SanUser[0]._id,
    postedby:{
    _type:"postedby",
    _ref: SanUser[0]._id
    },
    imageasset:ImageAsset._id,
  }


client.create(doc).then(()=>{
 navigate("/")
})}else{
  setFields(true)
  setTimeout(() => {
    setFields(false)
  }, 2000);
}}
  const imageUplaod =(e)=>{
     const {type, name}= e.target.files[0]
    console.log(e.target.files[0])
   
    if(type === "image/jpeg" || type === "image/svg" || type === "image/png" || type === "image/gif"|| type === "image/tiff" ){
      setWrongImageType(false)
      setLoading(true)

      client.assets.upload("image", e.target.files[0], {contentType: type, filename: name}).then((document)=>{
        setImageAsset(document);
        setLoading(false)
      }).catch((error)=>{console.log("image upload error", error)})
    }
  }

  return (
    <div className='flex flex-col justify-center items-center w-4/5 m-auto'>
      {Fields && <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>please fill in all the fields</p>}
    <div className='flex  flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
      <div className='bg-secondaryColor flex  p-3 flex-col  w-[300px] h-[240px]'>
        <div className="flex flex-col justify-center items-center border-dotted border-2   border-gray-300 p-3 w-full h-full">
          {Loading && <Spinner/>}
          {WrongImageType && <p>Wrong image Type</p>}
          {!ImageAsset ?<label><div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col justify-center items-center'>
              <p className='font-bold text-2xl'>
                <AiOutlineCloudUpload/>
              </p>
              <p>click to Upload</p>
              </div>
              </div>
              <input
            type="file"
            name="imageUpload"
            onChange={imageUplaod}
            className="w-0 h-0"
            accept='image/*'
            />
              </label>: <div className='relative w-full h-full '>
              <img
              className='h-full w-full '
               src={ImageAsset?.url}
               alt="uploaded-pics"/>
               <button
               className='absolute p-2 opacity-70 hover:opacity-100 right-3 bottom-3 z-10 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-150 ease-in-out'
               onClick={()=>{ setImageAsset(null)}}>
                <MdDelete size={25} className="text-black hover:text-[#c81e1e]"/>
               </button>
             </div>
              }
              { !ImageAsset && <p className='mt-10 text-gray-400'>
                          Use high quality PNG, JPG, SVG, GIFF less than 20MB
              </p>}
        </div> 
        
      </div>
      <div className="flex  flex-1 flex-col gap-6  mt-5 w-[70%] px-5 ">
          <input
          type="text"
          placeholder="enter your title here"
          onChange={(e)=>{setTitle(e.target.value)}}
          className=" text-2xl sm:text-[15px] font-bold b-gray-200 border-b-2 w-full "/>
         
         <input
          type="text"
          placeholder="enter about here"
          onChange={(e)=>{setAbout(e.target.value)}}
          className=" text-2xl sm:text-[15px]  b-gray-200 border-b-2 w-full "/>
            <input
          type="text"
          placeholder="enter destination url"
          onChange={(e)=>{setDestination(e.target.value)}}
          className=" text-2xl sm:text-[15px] font-bold b-gray-200 border-b-2 w-full "/>
           <div className='flex flex-col gap-2  text-xl sm:text-[15px]  text-gray-400'>
            <p className='text-black'>Select Fotoh Category:</p>
           <select className='border-2 sm:text-[15px]' onChange={(e)=>{ setCategories(e.target.value)}} >
            <option value="others">Others</option>
            { category.map((items,i)=>{
              return <option value={items.name}>{items.name}</option>
            })}
           </select>
           </div>
           <div>
            <button type='button' onClick={SavePin} className='border-2 p-2 w-[200px] text-[15px] rounded-md hover:p-[10px] transition-all duration-100 ease-in-out'>Create Fotoh</button>
           </div>
         
         
        </div>

      
    </div>
    
    </div>
  )
}

export default CreatePin
