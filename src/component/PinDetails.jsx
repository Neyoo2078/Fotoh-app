import React from 'react'
import { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import MansoryLayout from './MansoryLayout';
import { v4 as uuidv4 } from "uuid"
import { client, urlFor } from '../client';

import { pinDetailQuery, pinDetailsMorePinQuery } from '../assets (1)/utilitty/data';

const PinDetails = ({ SanUser }) => {

  const [Pins, setPins] = useState(null)
  const [PinsDetail, setPinsDetails] = useState(null)
  const [Comments, setComments] = useState(null)
  const [AddingComments, setAddingComments] = useState(false)
  const { pinid } = useParams();

  console.log({ Pins })

  const fetchPinDetails = () => {
    client.fetch(pinDetailQuery(pinid)).then((data) => {
      setPinsDetails(data[0])
      if (data[0]) {
        client.fetch(pinDetailsMorePinQuery(data[0])).then((res) => {
          setPins(res)
        })
      }

    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    fetchPinDetails()
  }, [pinid])
  console.log({ PinsDetail })

  const addComment = () => {
    setAddingComments(true)
    client.patch(pinid).setIfMissing({ comment: [] }).insert("after", "comment[-1]", [{
      comment: Comments,
      _key: uuidv4(),
      postedby: {
        _type: "postedby",
        _ref: SanUser?.[0]?._id
      }
    }]).commit().then(() => {
      console.log("comment saved")
      fetchPinDetails();
      setComments("")
      setAddingComments(false)
    }).catch((err) => { console.log(err) })
  }
  if (!PinsDetail) {
    return <div className=' flex xl:flex-row m-auto  flex-col rounded-[32px]'>
      <Spinner message="loading pin details " />
    </div>
  }
  return (
    <div className=' flex  m-auto  flex-col bg-white rounded-[32px]'>
      <div className='flex flex-col justify-center items-center md:items-start '>
        <div  className='flex  flex-col sm:flex-row justify-between items-center md:items-start'>
          <div className='flex flex-col justify-center items-center md:items-start'>
            <img
              src={PinsDetail?.image && urlFor(PinsDetail?.image).url()}
              alt="usaer-post"
              className='rounded-t-3xl rounded-b-lg w-[500px] h-[400px]' />
            <div className=' w-full p-5 xl:min-w-620'>
              <div className='flex justify-between items-center w-[480px]'>
                <div className='flex gap-2 items-center'>
                  <a href={`${PinsDetail?.image.asset.url}?dl=`}
                    download
                    onClick={(e) => { e.stopPropagation() }}
                    className="bg-white w-9 h-9 rounded-full flex flex-col  items-center  justify-center text-black text-xl opacity-50 hover:opacity-100 hover:shadow-md outline-none">
                    <MdDownloadForOffline />
                  </a>
                </div>
                <a href={PinsDetail?.destination}
                  target="_blank"
                  rel='noreferer'>{PinsDetail?.destination}</a>
              </div>
              <div>
                <h1 className='text-4xl font-bold break-words mt-3'>{PinsDetail?.title}</h1>
                <p className='mt-2 font-[0px]'>{PinsDetail?.title}</p>
              </div>
            </div>
          </div>
          {/* COMMENTS */}
          <div>
            <h2 className='text-2xl mt-5'> Comments</h2>
            <div className='max-w-370 overflow-y-auto'>
              {PinsDetail?.comment?.map((comment, i) => {
                return <div className='mt-5 flex gap-2 items-center bg-white rounded-lg' key={i}>
                  <img
                    src={comment?.postedby?.profilepicture}
                    alt="profile-image"
                    className='w-6 h-6 rounded-full cursor-pointer'
                  />
                  <div className='flex flex-col'>
                    <p className='font-bold'>{comment?.postedby.username}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              })}
            </div>
            <div className='flex flex-wrap mt-6 gap-3 justify-center items-center'>
              <Link to={`UserProfile/${SanUser?.[0]._id}`}> <img src={SanUser?.[0].profilepicture}
                alt="profile-image"
                className='w-6 h-6 rounded-full cursor-pointer' />
              </Link>
              <input className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
                placeholder='enter your comment here'
                value={Comments}
                onChange={(e) => { setComments(e.target.value) }}
                type="text" />

              <button
                className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none' type='button '
                onClick={addComment}>
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
      {Pins ? <div className="flex flex-col justify-center w-full mt-7"> <h2 className="m-auto mb-6">Similar Fotohs</h2>
      <MansoryLayout Pins={Pins}/>
      </div> : <Spinner message="Loading more Fotohs" />}
    </div>
  )
}

export default PinDetails;