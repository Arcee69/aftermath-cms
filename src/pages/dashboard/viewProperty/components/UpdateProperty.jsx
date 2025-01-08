import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import { CgSpinner } from "react-icons/cg"
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

import uploadLogo from "../../../../assets/Icons/uploadLogo.svg"

import { api } from '../../../../services/api';
import { appUrls } from '../../../../services/urls';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateProperty = () => {
    const [loading, setLoading] = useState(false)
 

    const { state } = useLocation()
    console.log(state, "opor")
    const token = localStorage.getItem("token")

    const formValidationSchema = Yup.object().shape({
        name: Yup.string(),
        address: Yup.string(),
        type: Yup.string(),
        imageDoc: Yup.mixed(),
    });

    const submitForm = async (values, actions) => {
        setLoading(true)
        console.log(values, "ododo")
        const data = {
            "property_id":  `${state?.id}`,
            "name": values?.name,
            "address": values?.address
        }

        await api.post(appUrls?.UPDATE_PROPERTY_URL, data)
        .then((res) => {
            // console.log(res, "try")
            toast("Property Updated Successfully", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setLoading(false)
            actions.resetForm()
        })
        .catch((err) => {
            // console.log(err, "soso")
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setLoading(false)
        })
    }

    const updateImage = async (values, actions) => {
        const formData = new FormData()

        formData.append("property_id", state?.id);
        formData.append("image", values?.imageDoc);
        formData.append("type", values?.type);
       

        await  axios.post(`https://aik.smhptech.com/api/property/update/image`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => {
            console.log(res, "pop");
            setLoading(false)
            toast(`${res?.data?.message}`, { 
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            });
            actions.resetForm()
        }) 
        .catch((err) => {
            console.log(err, "pop");
            setLoading(false)
            toast(`${err?.data?.message}`, { 
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            });
        })
    }

  return (
    <div className='md:p-8 flex flex-col gap-4'>
       
        <p className='text-black text-xl font-semibold'>Update Property</p>

        <div className="flex items-center ">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.5 }}
                className=""
            >
                <div className='flex flex-col gap-6 lg:w-[507px] border border-solid p-8'> {/* h-[670px] */}
                    
                    <div className="h-auto">
                        <Formik
                        initialValues={{
                            name: state?.name || "",
                            address: state?.address || "",
                            type: "",
                            imageDoc: "",
                        }}
                        validationSchema={formValidationSchema}
                        // enableReinitialize={true}
                        onSubmit={(values, actions) => {
                            // window.scrollTo(0, 0)
                            console.log(values, "often")
                            submitForm(values, actions)
                            if(values?.imageDoc) {
                                updateImage(values, actions)
                            }
                        }}
                        >
                        {({
                            handleSubmit,
                            handleChange,
                            dirty,
                            isValid,
                            setFieldValue,
                            errors,
                            touched,
                            // setFieldTouched,
                            values,
                        }) => (
                        <Form onSubmit={handleSubmit} className="flex flex-col">
                            <div className='flex flex-col gap-6 lg:items-center'>

                                <div className="flex flex-col">
                                    <label htmlFor='name' className="text-base text-left font-semibold text-[#000000]">Property Name</label>
                                    <input
                                        name="name"
                                        placeholder="Property Name"
                                        type="text" 
                                        value={values.name}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[21px] border-solid  p-3 border"
                                    />
                                    {errors.name && touched.name ? (
                                    <div className='text-RED-_100'>{errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor='address' className="text-base text-left font-semibold text-[#000000]">Address</label>
                                    <input
                                        name="address"
                                        placeholder="Address"
                                        type="text" 
                                        value={values.address}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[21px] border-solid  p-3 border"
                                    />
                                    {errors.address && touched.address ? (
                                    <div className='text-RED-_100'>{errors.address}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col '>
                                    <p className='text-base text-left font-semibold text-[#000000]'>Type</p>
                                
                                    <select 
                                        name='type'
                                        value={values.type}
                                        onChange={handleChange} 
                                        className='apperance-none rounded outline-none shadow lg:w-[527px] h-[42px] border-solid  p-3 border'
                                    >
                                        <option value="">Select</option>
                                        <option value="main_image">Main Image</option>
                                        <option value="left_image">Left Image</option>
                                        <option value="right_image">Right Image</option>
                                        <option value="extra_image">Extra Image</option>
                                    </select>
                                    
                                </div>

                                <div className="flex flex-col xs:mt-4 lg:mt-0 lg:w-12/12">
                                    {values?.imageDoc
                                    ? 
                                        <div className="pt-0 " >
                                            <img alt="upload" width={"300px"} height={"100px"} src={URL.createObjectURL(values?.imageDoc)} />
                                        </div>
                                    
                                    :
                                    <label className="flex flex-col xs:w-full  h-56 py-4 px-0  border-2 bg-BLUE-_300 border-BLUE-_200 border-dashed">
                                    <div className="flex flex-col my-auto items-center">
                                        <img src={uploadLogo} alt="upload" />
                                        <div className="text-center font-medium text-sm text-black">
                                            Click to upload <span className='block text-black'>PNG or JPG (max 5mb)</span>
                                        </div>   
                                    </div>
                                    <input
                                        type="file"
                                        name="imageDoc"
                                        value={values?.imageDoc}
                                        className="opacity-0"
                                        onChange={(e) => {setFieldValue("imageDoc", e.target.files[0])}}
                                        id="upload"
                                        accept={"image/*"}
                                        multiple={false}
                                    />
                                    </label>
                                    }
                                        {errors.imageDoc && touched.imageDoc ? 
                                        <div className='text-RED-_100'>{errors.imageDoc}</div> 
                                        : null
                                        }
                                </div> 
                                
                               
                    
                        

                            
                            </div>

                            <div className='flex xs:mt-4 md:mt-5 lg:mt-5 gap-4 justify-center'>
                                <button 
                                    type="submit" 
                                    className="w-6/12 bg-primary border-none p-3 text-black flex items-center justify-center text-sm rounded-tl-2xl rounded-tr-md rounded-b-md font-semibold"
                                    style={{ width: "130px" }}
                                >
                                    <p className='text-[#fff] '>{loading ? <CgSpinner className=" animate-spin text-lg " /> : 'Submit'}</p>
                                </button>
                            </div>
                            

                        </Form>
                    )}
                        </Formik>
                    </div>

                </div>
                
            </motion.div>
            </div>

    </div>
  )
}

export default UpdateProperty