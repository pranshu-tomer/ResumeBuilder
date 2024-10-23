import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from './../RichTextEditor'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react'

function Experience() {

    const [experinceList,setExperinceList] = useState([]);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const {resumeId} = useParams();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        resumeInfo?.experience.length>0&&setExperinceList(resumeInfo?.experience)
    },[])

    const handleChange = (index,event)=>{
        const newEntries=experinceList.slice();
        console.log(event)
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setExperinceList(newEntries);
    }

    const AddNewExperience=()=>{
        setExperinceList([...experinceList,{
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummery:'',
        }])
    }

    const RemoveExperience=()=>{
        setExperinceList(experinceList=>experinceList.slice(0,-1))
    }

    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experinceList.slice();
        newEntries[index][name]=e.target.value;
        setExperinceList(newEntries);
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experinceList
        });
    },[experinceList]);

    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                experience:experinceList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.updateResume({resumeId,data})
        .then(res=>{
            console.log(res);
            setLoading(false);
        },(error)=>{
            console.log(error)
            setLoading(false);
        })
    }

    const classInput = 'border px-2 py-1 rounded-lg'
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
            {experinceList.map((item,index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <input className={classInput} type="text" name="title" onChange={(event)=>handleChange(index,event)} defaultValue={item?.title}/>
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <input className={classInput} type='text' name="companyName" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.companyName} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>City</label>
                            <input className={classInput} type='text' name="city" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.city}/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>State</label>
                            <input className={classInput} type='text' name="state" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.state}
                             />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label>Start Date</label>
                            <input className={classInput} type="date" name="startDate" 
                            onChange={(e)=>handleChange(index,event)}
                            defaultValue={item?.startDate} />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label>End Date</label>
                            <input className={classInput} type="date" name="endDate" 
                            onChange={(e)=>handleChange(index,event)}
                            defaultValue={item?.endDate} />
                        </div>
                        <div className='col-span-2'>
                           <RichTextEditor
                           index={index}
                           defaultValue={item?.workSummery}
                           onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}  />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <button className='border border-[#9f5bff] px-2 py-1 text-[#9f5bff] rounded-lg' onClick={AddNewExperience}> + Add More Experience</button>
                <button className='border border-[#9f5bff] px-2 py-1 text-[#9f5bff] rounded-lg' onClick={RemoveExperience}> - Remove</button>
            </div>
            <button className='border p-2 bg-[#9f5bff] text-white rounded-lg' disabled={loading} onClick={()=>onSave()}>{loading?<LoaderCircle className='animate-spin' />:'Save'}</button>
        </div>
        </div>
    </div>
  )
}

export default Experience