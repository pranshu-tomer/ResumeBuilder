import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {

    const {user} = useUser();
    const [resumeList,setResumeList]=useState([]);
    useEffect(()=>{
      user&&GetResumesList()
    },[user])

    const GetResumesList = async ()=>{
      // console.log(user.id)
      const userId = user.id
      const list = await GlobalApi.getResumeList({userId})
      setResumeList(list.documents)
      // console.log(list.documents[0].$id)
    }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume/>
        {resumeList.length>0?resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index}/>
        ))
        :
        null
        }
      </div>
    </div>
  )
}

export default Dashboard