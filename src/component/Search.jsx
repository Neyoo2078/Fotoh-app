import React,{useEffect,useState} from 'react'
import { client } from '../client';
import { searchQuery } from '../assets (1)/utilitty/data';
import { MansoryLayout } from '.';
import Spinner from './Spinner';

const Search = ({Searcher, setSearcher}) => {

  const [Pins,setPins]=useState([])
  useEffect(()=>{
    if(Searcher?.length <= 0){
      setSearcher(null)
      return;
    }
    client.fetch(searchQuery(Searcher)).then((res)=>{
      setPins(res)
    })
  },[Searcher])
  if(Pins.length <= 0){
    return <div><Spinner message={"loading search fotoh"} /></div>
  }
  return (
    <div>
     <MansoryLayout Pins={Pins}/>
    </div>
  )
}

export default Search
