import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';

function Summery({enabledNext}) {

    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [summery,setSummery] = useState();
    const [loading,setLoading] = useState(false);
    const {resumeId} = useParams();


    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])


    const onSave = async (e)=>{

        e.preventDefault();
        setLoading(true)
        const data={
            data:{
                summery:summery
            }
        }

        GlobalApi.updateResume({resumeId,data})
        .then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
        },(error)=>{
            console.log(error)
            setLoading(false);
        })
    }

    return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summery for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <textarea className="mt-5 w-full border p-2 rounded-lg" required value={summery} defaultValue={summery?summery:resumeInfo?.summery} onChange={(e)=>setSummery(e.target.value)}></textarea>
            <div className='mt-2 flex justify-end'>
                <button className='border p-2 bg-[#9f5bff] text-white rounded-lg' type="submit" disabled={loading}> {loading?<LoaderCircle className='animate-spin' />:'Save'}</button>
            </div>
        </form>
        </div>  

    </div>
  )
}

export default Summery