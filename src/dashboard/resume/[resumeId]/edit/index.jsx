import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../component/FormSection';
import ResumePreview from '../../component/ResumePreview';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import GlobalApi from '../../../../../service/GlobalApi';

function EditResume() {

    const {resumeId} = useParams();
    const [resumeInfo,setResumeInfo] = useState();

    useEffect(()=>{
      GetResumeInfo()
    },[])
    // [] = only when page will be loaded


    const GetResumeInfo = async () => {
        await GlobalApi.getResume({resumeId})
        .then(resp=>{
          setResumeInfo(resp);
        })
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section  */}
          <FormSection/>
        {/* Preview Section  */}
         <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume