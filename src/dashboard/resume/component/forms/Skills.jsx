import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'

function Skills() {

    const [skillsList,setSkillsList] = useState([{
        name:'',
        rating:0
    }])

    const {resumeId} = useParams();
    const [loading,setLoading] = useState(false);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
   
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
    },[])
   
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
            rating:0 
        }])
    }

    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave= async ()=>{

        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }

        await GlobalApi.updateResume({resumeId,data})
        .then(resp=>{
            console.log(resp);
            setLoading(false);
        },(error)=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])


  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Skills</h2>
    <p>Add Your top professional key skills</p>

    <div>
        {skillsList.map((item,index)=>(
            <div className='flex justify-between mb-2 border rounded-lg p-3 '>
                <div>
                    <label className='text-xs'>Name</label>
                    <input className="w-full border p-2 rounded-lg"
                    defaultValue={item.name}
                    onChange={(e)=>handleChange(index,'name',e.target.value)} />
                </div>
                <Rating style={{ maxWidth: 120 }} value={item.rating} 
                onChange={(v)=>handleChange(index,'rating',v)}/>

            </div>
        ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <button className='border border-[#9f5bff] px-2 py-1 text-[#9f5bff] rounded-lg' onClick={AddNewSkills}> + Add More Skill</button>
            <button className='border border-[#9f5bff] px-2 py-1 text-[#9f5bff] rounded-lg' onClick={RemoveSkills}> - Remove</button>

            </div>
            <button className='border p-2 bg-[#9f5bff] text-white rounded-lg' disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </button>
        </div>
    </div>
  )
}

export default Skills