import Header from '../../../components/custom/Header'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import ResumePreview from '../../../dashboard/resume/component/ResumePreview'
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import { Home } from 'lucide-react'

function ViewResume() {

    const [resumeInfo,setResumeInfo] = useState();
    const {resumeId} = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        GetResumeInfo();
    },[])

    const GetResumeInfo=()=>{
        GlobalApi.getResume({resumeId})
        .then(resp=>{
            console.log(resp);
            setResumeInfo(resp);
        })
    }

    const HandleDownload=()=>{
        window.print();
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
    <div id="no-print">
        <Header/>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <h2 className='text-center text-2xl font-medium'>
                Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url with your friends and family </p>
            <div className='flex justify-between px-44 my-10'>
                <button className='border p-3 bg-[#9f5bff] text-white rounded-full' onClick={() => navigate('/dashboard')}><Home/></button>
                <button className='border p-2 bg-[#9f5bff] text-white rounded-lg' onClick={HandleDownload}>Download</button>
                <RWebShare
                    data={{
                        text: "Hello Everyone, This is my resume please open url to see it",
                        url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                        title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
                    }}
                    onClick={() => console.log("shared successfully!")}
                > 
                    <button className='border p-2 bg-[#9f5bff] text-white rounded-lg'>Share</button>
                </RWebShare>
            </div>
        </div>
            
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
                <ResumePreview/>
        </div>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume