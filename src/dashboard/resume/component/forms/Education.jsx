import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'

function Education() {

  const [loading,setLoading] = useState(false);
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const {resumeId} = useParams();
  const [educationalList,setEducationalList]=useState([
    {
      universityName:'',
      degree:'',
      major:'',
      startDate:'',
      endDate:'',
      description:''
    }
  ])

  useEffect(()=>{
    resumeInfo&&setEducationalList(resumeInfo?.education)
  },[])

  const handleChange=(event,index)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

  const AddNewEducation=()=>{
    setEducationalList([...educationalList,
      {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
  }
  const RemoveEducation=()=>{
    setEducationalList(educationalList=>educationalList.slice(0,-1))
  }

  const onSave= async ()=>{
    setLoading(true)
    const data={
      data:{
        education:educationalList.map(({ id, ...rest }) => rest)
      }
    }

    await GlobalApi.updateResume({resumeId,data}).then(resp=>{
      console.log(resp);
      setLoading(false)
    },(error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[educationalList])

  const classInput = 'border px-2 py-1 rounded-lg'
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add Your educational details</p>

    <div>
      {educationalList.map((item,index)=>(
        <div>
          <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2 flex gap-2 items-center'>
              <label>University Name</label>
              <input className={classInput} type='text' name="universityName" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.universityName}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label>Degree</label>
              <input className={classInput} type='text' name="degree" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.degree} />
            </div>
            <div className='flex flex-col gap-1'>
              <label>Major</label>
              <input className={classInput} type='text' name="major" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.major} />
            </div>
            <div className='flex items-center gap-2'>
              <label>Start Date</label>
              <input className={classInput} type="date" name="startDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.startDate} />
            </div>
            <div className='flex items-center gap-2'>
              <label>End Date</label>
              <input className={classInput} type="date" name="endDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.endDate} />
            </div>
            <div className='col-span-2 flex flex-col gap-1'>
              <label>Description</label>
              <textarea className='border p-2 rounded-lg' name="description" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.description} />
            </div>

          </div>
        </div>
      ))}
    </div>

    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <button className='border border-[#9f5bff] px-2 py-1 text-[#9f5bff] rounded-lg' onClick={AddNewEducation}> + Add More Education</button>
            <button className='border border-[#9f5bff] px-2 py-1 text-[#9f5bff] rounded-lg' onClick={RemoveEducation}> - Remove</button>

            </div>
            <button className='border p-2 bg-[#9f5bff] text-white rounded-lg' disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </button>
        </div>
    </div>
  )
}

export default Education