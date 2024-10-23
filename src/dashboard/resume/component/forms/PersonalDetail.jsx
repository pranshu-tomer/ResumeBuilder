import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';

function PersonalDetail({enabledNext}) {

    const {resumeId} = useParams();
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)

    const [formData,setFormData] = useState();
    const [loading,setLoading] = useState(false);

    const handleInputChange=(e)=>{
        enabledNext(false)
        const {name,value}=e.target;

        setFormData({
            ...formData,
            [name]:value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave=  async (e)=>{
        e.preventDefault();
        setLoading(true)
        const data={
            data:formData
        }

        console.log(formData)
        await GlobalApi.updateResume({resumeId,data})
        .then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
        },(error)=>{
            console.log(error)
            setLoading(false);
        })    
    }

    const classInput = 'border px-2 py-1 rounded-lg'
  return (

    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>

        <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm'>First Name</label>
                    <input type="text" name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}
                    className={classInput}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm'>Last Name</label>
                    <input type="text" name="lastName" required onChange={handleInputChange} defaultValue={resumeInfo?.lastName} className={classInput}/>
                </div>
                <div className='col-span-2 flex flex-col gap-1'>
                    <label className='text-sm'>Job Title</label>
                    <input type="text" name="jobTitle" required defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange} className={classInput}/>
                </div>
                <div className='col-span-2 flex flex-col gap-1'>
                    <label className='text-sm'>Address</label>
                    <input type="text" className={classInput} name="address" required defaultValue={resumeInfo?.address} onChange={handleInputChange}  />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm'>Phone</label>
                    <input type="text" name="phone" required defaultValue={resumeInfo?.phone} onChange={handleInputChange} className={classInput}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm'>Email</label>
                    <input type="email" className={classInput} name="email" required defaultValue={resumeInfo?.email} onChange={handleInputChange}/>
                </div>
            </div>
            <div className='mt-3 flex justify-end'>
                <button className='border p-2 bg-[#9f5bff] text-white rounded-lg' type="submit" disabled={loading}> {loading?<LoaderCircle className='animate-spin' />:'Save'}</button>
            </div>
        </form>
    </div>
  )
}

export default PersonalDetail