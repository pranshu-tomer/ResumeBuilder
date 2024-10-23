import React, { useState } from 'react'
import Options from './Options'


function ResumeCardItem({resume}) {

  const [showOption,setShowOption] = useState(false);

  return (
    
    <div className=''>
        <button onClick={() => setShowOption(true)}>
            <div className='p-14  bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4'
                style={{
                    borderColor:resume?.themeColor
                }}
            >
                <div className='flex items-center justify-center h-[180px] '>
                    <img src="/cv.png" width={80} height={80} />
                </div>
            </div>
        </button>
        {showOption ? <Options onClose={() => setShowOption(false)} resumeId={resume.$id}/> : null}
    </div>

  )
}

export default ResumeCardItem