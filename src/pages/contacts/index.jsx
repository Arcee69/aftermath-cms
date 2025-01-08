import React, { useState, useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { TbDownload } from "react-icons/tb"

import { appUrls } from '../../services/urls';
import { api } from '../../services/api';

const Contacts = () => {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [contactPerPage] = useState(8)
  const [contact, setContact] = useState([])
  const [totalPages, setTotalPages] = useState(1); 
  const [statusFilter, setStatusFilter] = useState("All");

  const getContacts = async () => {
      setLoading(true)
      try {
        const res = await api.get(appUrls?.FETCH_CONTACT_URL)
        console.log(res, 'when')
        setContact(res?.data?.data)

      } catch (err) {
        console.log(err, "fish")
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    getContacts()
  }, [])


  const filteredContact = contact?.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.email.toLowerCase().includes(search.toLowerCase());
  
    const matchesStatus = 
      statusFilter === "All" || 
      item.status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });

  // const exportExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(invoices); 
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
  //   XLSX.writeFile(workbook, `invoices_${Date.now()}.xlsx`);
  // };


  useEffect(() => {
      setTotalPages(Math.ceil(filteredContact?.length / contactPerPage));
  }, [contactPerPage]);

  const indexOfLastProduct = currentPage * contactPerPage;
  const indexOfFirstProduct = indexOfLastProduct - contactPerPage;
  const currentProduct = filteredContact?.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
      if (currentPage < Math.ceil(currentProduct?.length / contactPerPage)) {
          setCurrentPage(currentPage + 1);
      }
  };
  
  const handlePrevPage = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
  };


  return (
    <div className='w-11/12 p-4 '>
      <div className='flex flex-col md:flex-row items-center gap-5 lg:gap-0 lg:px-5 justify-between'>
          <p className='font-euclid text-[18px] font-medium text-[#1C1C1E]'>Contact List</p>
          <div className='flex flex-col md:flex-row items-center gap-3'>
              <input 
                  className='w-full lg:w-[250px]  rounded-lg p-2 outline-[#1EC677] '
                  type='text'
                  name='search'
                  placeholder='Search Name or Email...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
{/*             
              <div 
                  className='w-full lg:w-[88px] h-[40px] border border-[#EBEDF0] cursor-pointer gap-1 rounded-lg flex items-center p-3'
                  onClick={exportExcel}
              >
                  <TbDownload className='text-base text-[#6B788E]' />
                  <p className='text-xs font-semibold font-euclid text-[#7A8699]'>Export</p>
              </div> */}
              
          </div>
      </div>

      <div className='mt-5 rounded-lg w-full bg-[#fff] overflow-x-hidden'>
        <table>
            <thead>
                <tr className='w-full border rounded-t-xl border-[#F0F1F3] '>
                    <th className='w-[123px] whitespace-nowrap h-[18px] text-sm text-left font-euclid text-[#333843] p-4 font-medium '>
                        ID
                    </th>
                    <th className='w-[137px] h-[18px] text-left text-sm font-euclid text-[#333843] p-4 font-medium '>
                        <div className='flex items-center gap-1'>
                            <p className='text-sm text-[#333843] font-euclid'>Date</p>
                            <IoIosArrowDown className="text-[#667085] text-base" />
                        </div>
                    </th>
                    <th className='w-[137px] h-[18px] text-left font-euclid text-[#333843] p-4 font-medium '>
                        <div className='flex items-center gap-1'>
                            <p className='text-sm whitespace-nowrap text-[#333843] font-euclid'>Name</p>
                            <IoIosArrowDown className="text-[#667085] text-base" />
                        </div>
                    </th>
                    <th className='w-[198px] h-[18px] text-left font-euclid text-[#333843] p-4 font-medium '>
                        <p className='text-sm text-[#333843] font-euclid'>Email</p>
                    </th>
                    <th className='w-[198px] h-[18px] text-left font-euclid text-[#333843] p-4 font-medium '>
                        <p className='text-sm text-[#333843] font-euclid'>Service</p>
                    </th>
                    
                </tr>
            </thead>
            <tbody className=''>
                { currentProduct?.length > 0 ?
                    currentProduct?.map((item) => (
                        <tr key={item.id} className='w-full mt-[18px] border border-[#F0F1F3]'>
                            <td className='w-[123px] h-[56px] text-left font-euclid text-[#333843] p-4 font-medium '>
                                <p className='font-euclid text-[#333843] font-medium text-sm'>{`#${item?.id.slice(0, 8)}`}</p>
                            </td>
                            <td className='w-[137px] h-[56px] text-left font-euclid text-[#333843] p-4 font-medium '>
                                <p className='font-euclid text-[#333843] font-medium text-sm'>{new Date(item?.created_at).toLocaleDateString()}</p>
                            </td>
                            <td className='w-[137px] h-[56px] text-left font-euclid text-[#333843] p-4 font-medium '>
                                <p className='font-euclid text-[#333843] font-medium text-sm'>{item?.name}</p>
                            </td>
                            <td className='w-[198px] h-[56px] text-left font-euclid text-[#333843] p-4 font-medium '>
                                <p className='font-euclid text-[#667085] font-medium text-xs '>{item?.email}</p>
                            </td>
                            <td className='w-[198px] h-[56px] text-left font-euclid text-[#333843] p-4 font-medium '>
                                <p className='font-euclid text-[#667085] font-medium text-xs '>{item?.service}</p>
                            </td>
                          
                            
    
                        </tr>
                    )) : (
                        <tr className='h-[400px] bg-white border-t border-grey-100'>
                            <td colSpan="8" className="relative">
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='flex flex-col gap-2 items-center'>
                                        {/* <img src={Empty} alt='empty' className='w-[150px] h-[150px]'/> */}
                                        <p className='text-[#0C1322] font-medium text-[20px] font-inter'>No Contacts Available</p>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    )
                }
            </tbody>
        </table>
      </div>
      
      <div className='w-full flex items-center justify-between p-5'>
          <div className='bg-[#FAFAFE] w-[136px] h-[40px] flex items-center justify-center'>
              <p className='font-euclid text-[#667085] text-base'>Page 1 of 1</p>
          </div>

          <div>
              <div className='flex h-[34px] justify-center  w-full gap-2 items-center'>

                  <div 
                      onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} 
                      className={`bg-[#FAFAFE] transition-all duration-500 ease-in-out  flex justify-center items-center cursor-pointer w-8 h-full  ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                  >
                      <IoIosArrowBack className='text-[#667085] hover:text-[#fff]'/>
                  </div>

                  {[...Array(totalPages)].map((_, index) => (
                          <div 
                              key={index} 
                              onClick={() => setCurrentPage(index + 1)} 
                              className={`transition-all duration-500 ease-in-out flex justify-center items-center cursor-pointer w-8 h-full bg-[#FAFAFE] ${currentPage === index + 1 ? 'bg-[#FAFAFE] text-[#000]' : 'hover:bg-[#FAFAFE]'}`}
                          >
                              {index + 1}
                          </div>
                      ))}


                  <div 
                      onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} 
                      className={`bg-[#FAFAFE] transition-all duration-500 ease-in-out flex justify-center items-center cursor-pointer w-8 h-full  bg-[#FAFAFE] ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                  >
                      <IoIosArrowForward className='text-[#667085] hover:text-[#fff]'/>
                  </div>
              </div>
          </div>

      </div>

    </div>
  )
}

export default Contacts