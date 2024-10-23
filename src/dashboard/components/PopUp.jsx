import { useRef, useState } from "react"
import { useUser } from '@clerk/clerk-react'
import GlobalApi from "../../../service/GlobalApi";
import {LoaderCircle} from 'lucide-react'
import { useNavigate } from "react-router-dom";

function PopUp({onClose}){

    const [title,setTitle] = useState("")
    const [loading,setLoading] = useState(false)
    const {user} = useUser()
    const navigate = useNavigate()

    const modalRef = useRef()
    const closeModal = (e) => {
        if(modalRef.current === e.target){
            onClose()
        }
    }

    const onCreate = async () => {
        setLoading(true)

        await GlobalApi.createResume({
            jobTitle: title,
            userId: user.id
        })
        .then(res => {
            const resumeId = res.$id
            setLoading(false);
            navigate(`/dashboard/resume/${resumeId}/edit`)
        },(error)=>{
            console.log(error)
            setLoading(false);
        })
        onClose()
    }

    return (
        <>
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex  items-center justify-center">
            <div className="w-[500px] bg-white rounded-xl px-5 py-5 flex flex-col">
                <h1 className="font-bold text-lg">Create New Resume</h1>
                <p className="text-sm">Add a title for your new resume</p>
                <input className="w-full border px-5 py-2 rounded-lg mt-1" type="text" placeholder="Ex.Full Stack resume" onChange={(e) => setTitle(e.target.value)}/>
                <div className="flex mt-2 gap-2 justify-end">
                    <button className="border px-3 py-2  bg-white rounded-lg" onClick={() => onClose()}>Cancel</button>
                    <button className="border px-3 py-2 bg-[#9f5bff] text-white rounded-lg" disabled={!title} onClick={() => onCreate()}>{loading?<LoaderCircle className='animate-spin' />:'Create'}</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default PopUp