import { PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import PopUp from './PopUp'

function AddResume() {
    const [showModal,setShowModal] = useState(false)
    return (
        <div >
            <div className='p-14 py-24 border items-center flex justify-center bg-[#afafaf] rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed border-black' onClick={() => setShowModal(true)}>
                <PlusSquare  />
            </div>
            {showModal && <PopUp onClose={() => setShowModal(false)}/>}
        </div>
  )
}

export default AddResume