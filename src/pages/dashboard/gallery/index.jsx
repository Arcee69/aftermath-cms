import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai"
import { Skeleton } from '@mui/material';

import ModalPop from '../../../components/modal/modalPop';
import AddImage from './components/AddImage';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';


import DeleteImage from './components/DeleteImage';


const Gallery = () => {
  const [open, setOpen] = useState(false)
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [imageId, setImageId] = useState()



    const getImages = async () => {
      setLoading(true)
      await api.get(appUrls?.GALLERY_URL)
      .then((res) => {
            console.log(res, "res")
            setLoading(false)
            setGallery(res?.data?.data?.gallery)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "err")
      })
    }
  
    useEffect(() => {
      getImages()
    }, [])

  return (
    <div className='flex flex-col mx-[33px] '>
      <div className=' flex justify-end mt-5'>
        <button type='button' onClick={() => setOpen(true)} className='flex items-center justify-center border-none rounded-xl gap-3 w-[164px] h-[40px] bg-[#6FCF97]' >
          <FaPlus className='text-[#fff]'/>
          <p className='text-[#fff] font-poppins font-medium text-sm'>Add Image</p>
        </button>
      </div>
      <div className='bg-[#fff] flex flex-col pt-[23px] pl-[33px] pr-[33px] pb-[76px] mt-[28px] rounded'>
        <div className='flex gap-3 items-center mb-[11px]'>
          <div className='w-full bg-[#F8F8FA] flex items-center gap-[10px] p-2  rounded-lg'>
            <CiSearch className='w-[24px] h-[24px] text-[#9A9AA6]'/>
            <input 
                name='search'
                placeholder='Search'
                className='outline-none w-full font-hanken p-3 bg-transparent text-[#8B8B8B] text-[11px]'
            />
          </div>
          <button 
            className='text-[#fff] font-inter text-xs w-[102px] h-[40px] bg-[#263238] rounded-lg' 
          >
            Search
          </button>
        </div>
        <hr />

        {
            loading 
            ?
            <Skeleton variant="rectangular" width={1185} height={1000} style={{ backgroundColor: 'rgba(0,0,0, 0.06)' }}/>
            :
            <div className={`${gallery?.length > 0 ?  "grid grid-cols-3 gap-[32px]"  : "flex items-center justify-center"} mt-[29px]`} >
              {
                gallery?.length > 0 ? gallery?.map((item, index) => (
                      <div key={index} className='bg-[#fff] shadow relative'>
                        <img src={item?.path} alt='item-images'  className='rounded-tr-lg rounded-tl-lg'/>
                        <div className='rounded-br-lg rounded-bl-xl flex flex-col p-2'>
                          <p className='font-poppins text-[#455A64] text-sm font-light'><span className='font-medium'>Title:</span> {item?.title || "Outdoor Area"} </p>
          
                        </div>
                        <button className="w-[26px] h-[26px] absolute top-1 right-1 bg-[#fff] flex  rounded-full justify-center items-center p-2" onClick={() => {setOpenDeleteModal(true); setImageId(item)}}>
                          <AiOutlineClose className="text-[#5F5F5F] w-[14px] h-[14px]"/>
                        </button>
                      </div>
                  ))
                  :
                  <p className='text-2xl text-[#000] text-center font-semibold'>No Images Available</p>
              }
            </div>
        }
      </div>

          <ModalPop isOpen={open}>
              <AddImage  handleClose={() => setOpen(false)}/>
          </ModalPop>

          <ModalPop isOpen={openDeleteModal}>
            <DeleteImage handleClose={() => setOpenDeleteModal(false)} imageId={imageId} />
          </ModalPop>
    </div>
  )
}

export default Gallery