import React from 'react'
import Loader from "react-js-loader"
import {BounceLoader} from "react-spinners"

const Spinner = ({ message }) => {
    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
        
            <BounceLoader
            size={100}
            color="#00BFFF"
            className='my-[20px]'/>
            <p className='text-lg text-center px-2'>{message}</p>
        </div>
    )
}

export default Spinner