import { useRef, useState } from "react"
import GlobalApi from "../../../service/GlobalApi";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

function Options({onClose,resumeId}){
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

    const modalRef = useRef()
    const closeModal = (e) => {
        if(modalRef.current === e.target){
            onClose()
        }
    }

    const handleDelete = async () => {
        setLoading(true)

        await GlobalApi.deleteResume({resumeId})
        .then(() => {
            setLoading(false);
            navigate(`/dashboard`)
            window.location.reload();
        },(error)=>{
            console.log(error)
            setLoading(false);
        })
        onClose()
    }

    return (
        <>
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex  items-center justify-center">
            <div className="w-[400px] bg-white rounded-xl px-5 py-5 flex flex-col">
                <h1 className="font-bold text-lg">Modify Your Resume</h1>
                <div className="flex justify-between mt-3">
                    <button className="border px-3 py-2 bg-[#9f5bff] text-white rounded-lg" onClick={() => handleDelete()}>{loading?<LoaderCircle className='animate-spin' />:'Delete'}</button>
                    <button className="border px-3 py-2 bg-[#9f5bff] text-white rounded-lg" onClick={() => navigate(`/my-resume/${resumeId}/view`)}>View</button>
                    <button className="border px-3 py-2 bg-[#9f5bff] text-white rounded-lg" onClick={() => navigate(`/dashboard/resume/${resumeId}/edit`)}>Edit</button>
                    <button className="border px-3 py-2  bg-white rounded-lg" onClick={() => onClose()}>Cancel</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Options