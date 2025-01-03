
import React from 'react'
import { appUrls } from '../../../../services/urls'
import { api } from '../../../../services/api'
import { toast } from 'react-toastify'

const DeleteBlog = ({ handleClose, data }) => {
    // console.log(data?.id, "pink")

    const deleteBlog = async () => {
    //  return
        await api.delete(appUrls?.DELETE_POST_URL + `/${data?.id}`)
        .then((res) => {
            toast("Post Deleted Successfully", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
            window.location.reload()
        })
        .catch((err) => {
            toast(`${err?.data}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
        })
    }
  return (
    <div className='flex flex-col bg-[#fff] w-8/12 md:w-[327px] xs:h-[150px] md:h-[200px] p-8'>
        <div className='flex flex-col text-center gap-3'>
            <p className='text-[#000] font-bold text-3xl'>Are you sure?</p>
            <p className='text-[#000] '>Once you click Delete the blog can't be retrieve again</p>
        </div>
        <div className='flex justify-between mt-10'>
            <button type="button" onClick={handleClose} className='bg-primary p-3 text-white rounded border-none'>Cancel</button>
            <button type='submit' onClick={() => deleteBlog()} className='bg-RED-_100 p-3 text-white rounded border-none'>Delete</button>
        </div>

    </div>
  )
}

export default DeleteBlog