import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg';

import { api } from '../../../../services/api'

const DeleteImage = ({ handleClose, imageId }) => {
    const [loading, setLoading] = useState(false)

    const Id  = imageId?.id

    const submitForm = async () => {
        setLoading(true)
        await api.delete(`/api/gallery/delete/${Id}`)
        .then((res) => {
            setLoading(false)
            toast(`${res?.data?.message}`, { 
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            })
            handleClose();
            window.location.reload()
        })
        .catch((err) => {
            // console.log(err, "balam")
            setLoading(false)
            toast(`${err?.data?.message}`, { 
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            })
        })
    }


  return (
    <div className='bg-[#fff] w-[300px] h-[200px] mt-[100px] flex flex-col items-center p-8 gap-8 rounded-lg'>
        <p className='text-center text-lg font-medium font-merri '>Are you sure you want to delete this image?</p>
        <div className='flex justify-between gap-8'>
            <button className='border w-[100px] h-[50px]   rounded-lg border-[#EB5757] bg-[#fff] text' onClick={handleClose}>
                <p className='font-merri font-bold text-base text-[#EB5757]'>Cancel</p>
            </button>
            <button onClick={submitForm} className='bg-[#6FCF97] w-[140px] border-none flex items-center justify-center p-2 rounded-lg'>
            <p className='text-[#fff] text-base  font-merri text-center  font-medium'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : ' Yes, Delete'}</p>
               
            </button>
        </div>
    </div>
  )
}

export default DeleteImage