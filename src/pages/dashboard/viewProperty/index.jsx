import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import LongMenu from '../../../components/actionMenuIcon';
import ModalPop from '../../../components/modal/modalPop';
import DeleteProperty from './components/DeleteProperty';
import UpdateProperty from './components/UpdateProperty';
import PaginationControlled from '../../../components/Pagination';
import { appUrls } from '../../../services/urls';
import { api } from '../../../services/api';
import axios from 'axios';


const ViewProperty = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(false)
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [openUpdateProperty, setOpenUpdateProperty] = useState(false);
    const [updateProperty, setUpdateProperty] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [data, setData] = useState([]);

    const navigate = useNavigate()
    

    const fetchProperties = async () => {
        setLoading(true)
        try {
          const res = await api.get(appUrls?.PROPERTY_URL);
          console.log(res, "addict")
    
          setProperties(res?.data?.data || []);
   
        } catch (err) {
          console.error(err);
        } finally {
            setLoading(false)
        }
      };
    
      useEffect(() => {
        fetchProperties();
      }, []);
    
      const handlePrevPage = () => {
        
      };
    
      const handleNextPage = () => {
      
      };

  return (
    <div className='md:p-8 flex flex-col gap-4'>
        <p className='text-black text-xl font-semibold'>Properties</p>
        {
            loading 
            ?
            <p  className='text-2xl text-[#000] text-center font-semibold'>Loading...</p>
            :
            <div className={`${properties?.length > 0 ? "grid grid-cols-3 gap-8" :  "flex items-center justify-center"}`}>
                {
                    properties?.length > 0 ? properties?.map((property, index) => (
                        <div key={index} className="rounded-tl-xl bg-white p-3 rounded-tr-xl xs:w-full md:max-w-[280px]">
                            <img loading='lazy' src={property?.main_image} alt="" className='rounded-tl-xl rounded-tr-xl xs:w-full  h-[290px] object-cover' />
                            <div className='flex flex-col'>
                                <p className='font-bold text-lg'>{property?.name}</p>
                                <div className='flex items-end justify-end'>
                                    <LongMenu
                                        // action={(action) => handleMenuClick(action, blog)} 
                                    >
                                        <div className='flex flex-col gap-3 p-3'>
                                            <p 
                                            className='cursor-pointer hover:bg-[#F8F8F8] p-1' 
                                            onClick={() => {setOpenDeleteModal(true), setData(property)}}
                                            >
                                                Delete
                                            </p>
                                            <Link 
                                                to="/update-property"
                                                state={property}
                                                className='cursor-pointer hover:bg-[#F8F8F8] p-1'
                                                // onClick={() => {navigate("/update-blog"), setUpdateProperty(blog)}}
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </LongMenu>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <p className='text-2xl text-[#000] text-center font-semibold'>No Properties Available</p>
                }

            </div>
        }

        <div className="flex justify-center items-center gap-4 mt-10">
            <button
                onClick={handlePrevPage}
                disabled={!prevPageUrl}
                className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                !prevPageUrl && "opacity-50 cursor-not-allowed"
                }`}
            >
                Previous
            </button>
            <p className="text-[#222222] font-bold">Page {currentPage}</p>
            <button
                onClick={handleNextPage}
                disabled={!nextPageUrl}
                className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                !nextPageUrl && "opacity-50 cursor-not-allowed"
                }`}
            >
                Next
            </button>
        </div>
       

        <ModalPop isOpen={openDeleteModal}>
            <DeleteProperty 
                handleClose={() => setOpenDeleteModal(false)} 
                data={data}
            />
        </ModalPop>
        <ModalPop isOpen={openUpdateProperty}>
            <UpdateProperty 
                handleClose={() => setOpenUpdateProperty(false)} 
                data={data}
            />
        </ModalPop>
    </div>
  )
}

export default ViewProperty