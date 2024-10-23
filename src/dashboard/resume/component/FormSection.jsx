import React, { useState, useContext } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, Home, LayoutGrid, LoaderCircle } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import GlobalApi from '../../../../service/GlobalApi';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SketchPicker } from 'react-color';

function FormSection() {

  const [activeFormIndex,setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext] = useState(true);
  const { resumeId } = useParams();
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)
  const [showColorPicker,setShowColorPicker] = useState(false)
  const [color,setColor] = useState('#fca503')

  const handleChange = () => {
    setResumeInfo({
        ...resumeInfo,
        themeColor : color
    })
  }

  const handleSave = async () => {
    setLoading(true)
    const data = {
      data : {
        themeColor : color
      }
    }
    await GlobalApi.updateResume({resumeId,data})
    .then(resp=>{
      console.log(resp)
      setLoading(false);
    },(error)=>{
      console.log(error)
      setLoading(false);
    })

    setShowColorPicker(false)
  }

  return (
    <div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-5'>
            <Link to={"/dashboard"}>
              <button className='border p-3 bg-[#9f5bff] text-white rounded-full'><Home/></button>
            </Link>
            {showColorPicker ? 
              <button className='border p-3 bg-[#9f5bff] text-white rounded-lg' onClick={() => handleSave()}>{loading?<LoaderCircle className='animate-spin' />:'Set Theme'}</button>
            : 
              <button className='border p-3 bg-[#9f5bff] text-white rounded-lg flex gap-1' onClick={() => setShowColorPicker(true)}><LayoutGrid/> Theme Color</button>
            }
            {showColorPicker ? <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} onChange={() => handleChange()} className='absolute left-[150px] top-[150px]'/> : null}
          </div>
          <div className='flex gap-2'>
            {activeFormIndex>1
            &&
            <button className='border p-2 bg-[#9f5bff] text-white rounded-lg' onClick={()=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></button>}

            <button disabled={!enableNext} className="flex gap-2 border p-2 bg-[#9f5bff] text-white rounded-lg" onClick={()=>setActiveFormIndex(activeFormIndex+1)}>Next <ArrowRight/></button>
          </div>
        </div>

        {/* Personal Detail  */}
        {activeFormIndex==1?  
        <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==2?
        <Summery  enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==3?
        <Experience />  
        :activeFormIndex==4?
        <Education/>
        :activeFormIndex==5?
        <Skills/>
        :activeFormIndex==6?
        <Navigate to={'/my-resume/'+resumeId+"/view"}/>
        :null
        }
    </div>
  )
}

export default FormSection