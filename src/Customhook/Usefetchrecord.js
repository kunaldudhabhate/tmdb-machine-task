import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Usefetchrecord = (apikey) => {
    const [data , setdata] = useState([])
   const getapidata = async ()=>{
    try{
        const res = await axios.get(apikey)
        setdata(res.data.results)
    }
    catch (error){
        console.log(error);        
    } 
   } 
   useEffect(()=>{
    getapidata()
   },[apikey])
    
  return data
}

export default Usefetchrecord
