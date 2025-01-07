import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import uploadLogo from "../../../assets/Icons/uploadLogo.svg"

import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import { CustomToolbar } from './CustomToolbar';
import { CgSpinner } from 'react-icons/cg';


const CreateProperty = () => {
    const [loading, setLoading] = useState(false)

    const formValidationSchema = Yup.object().shape({
        name: Yup.string().required("Property Name is Required"),
        mainImage: Yup.mixed().required('Main Property Image is required'),
        leftImage: Yup.mixed(),
        rightImage: Yup.mixed(),
        extraImage: Yup.mixed(),
        address: Yup.mixed().required("Address is Required")
    });

    const submitForm = async (values, actions) => {
        setLoading(true)
        const formData = new FormData()
        formData.append("name", values?.name);
        formData.append("address", values?.address);
        formData.append("main_image", values?.mainImage);
        formData.append("left_image", values?.leftImage);
        formData.append("right_image", values?.rightImage);
        formData.append("extra_image", values?.extraImage);

        await api.post(appUrls?.PROPERTY_URL, formData)
        .then((res)=> {
            toast("Property created Successfully", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setLoading(false)
            actions.resetForm()
        })
        .catch((err) => {
            console.log(err, "soso")
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setLoading(false)
        })

    }

  return (
    <div className='md:p-8 flex flex-col gap-4'>
        <p className='text-black text-xl font-semibold'>Create News</p>

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
                            name: "",
                            address: "",
                            mainImage: "",
                        }}
                        validationSchema={formValidationSchema}
                        enableReinitialize={true}
                        onSubmit={(values, actions) => {
                            // window.scrollTo(0, 0)
                            console.log(values, "often")
                            submitForm(values, actions)
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
                                    <label htmlFor='name' className="text-base text-left font-semibold text-[#000000]">Name</label>
                                    <input
                                        name="name"
                                        placeholder="Property name"
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

                                <div className="flex flex-col xs:mt-4 lg:mt-0 lg:w-12/12">
                                    <label htmlFor='Main Image' className="text-base text-left font-semibold text-[#000000]">Main Image</label>
                                    {values?.mainImage
                                    ? 
                                        <div className="pt-0 " >
                                            <img alt="upload" width={"300px"} height={"100px"} src={URL.createObjectURL(values?.mainImage)} />
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
                                        name="mainImage"
                                        value={values?.mainImage}
                                        className="opacity-0"
                                        onChange={(e) => {setFieldValue("mainImage", e.target.files[0])}}
                                        id="upload"
                                        accept={"image/*"}
                                        multiple={false}
                                    />
                                    </label>
                                    }
                                    {errors.mainImage && touched.mainImage ? 
                                        <div className='text-RED-_100'>{errors.mainImage}</div> 
                                        : null
                                    }
                                </div> 

                                <div className="flex flex-col xs:mt-4 lg:mt-0 lg:w-12/12">
                                    <label htmlFor='Left Image' className="text-base text-left font-semibold text-[#000000]">Left Image</label>
                                    {values?.leftImage
                                    ? 
                                        <div className="pt-0 " >
                                            <img alt="upload" width={"300px"} height={"100px"} src={URL.createObjectURL(values?.leftImage)} />
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
                                        name="leftImage"
                                        value={values?.leftImage}
                                        className="opacity-0"
                                        onChange={(e) => {setFieldValue("leftImage", e.target.files[0])}}
                                        id="upload"
                                        accept={"image/*"}
                                        multiple={false}
                                    />
                                    </label>
                                    }
                                    {errors.leftImage && touched.leftImage ? 
                                        <div className='text-RED-_100'>{errors.leftImage}</div> 
                                        : null
                                    }
                                </div> 

                                <div className="flex flex-col xs:mt-4 lg:mt-0 lg:w-12/12">
                                    <label htmlFor='Right Image' className="text-base text-left font-semibold text-[#000000]">Right Image</label>
                                    {values?.rightImage
                                    ? 
                                        <div className="pt-0 " >
                                            <img alt="upload" width={"300px"} height={"100px"} src={URL.createObjectURL(values?.rightImage)} />
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
                                        name="rightImage"
                                        value={values?.rightImage}
                                        className="opacity-0"
                                        onChange={(e) => {setFieldValue("rightImage", e.target.files[0])}}
                                        id="upload"
                                        accept={"image/*"}
                                        multiple={false}
                                    />
                                    </label>
                                    }
                                    {errors.rightImage && touched.rightImage ? 
                                        <div className='text-RED-_100'>{errors.rightImage}</div> 
                                        : null
                                    }
                                </div> 

                                <div className="flex flex-col xs:mt-4 lg:mt-0 lg:w-12/12">
                                    <label htmlFor='Extra Image' className="text-base text-left font-semibold text-[#000000]">Extra Image</label>
                                    {values?.extraImage
                                    ? 
                                        <div className="pt-0 " >
                                            <img alt="upload" width={"300px"} height={"100px"} src={URL.createObjectURL(values?.extraImage)} />
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
                                        name="extraImage"
                                        value={values?.extraImage}
                                        className="opacity-0"
                                        onChange={(e) => {setFieldValue("extraImage", e.target.files[0])}}
                                        id="upload"
                                        accept={"image/*"}
                                        multiple={false}
                                    />
                                    </label>
                                    }
                                    {errors.extraImage && touched.extraImage ? 
                                        <div className='text-RED-_100'>{errors.extraImage}</div> 
                                        : null
                                    }
                                </div> 
                                
                              
                    
                        

                            
                            </div>

                            <div className='flex xs:mt-4 md:mt-5 lg:mt-5 gap-4 justify-center'>
                                <button 
                                    type="submit" 
                                    className="w-6/12 bg-primary flex items-center justify-center border-none p-3 text-black text-sm rounded-tl-2xl rounded-tr-md rounded-b-md font-semibold"
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

const modules = {
    toolbar: {
      container: "#toolbar",
    }
  };
  
  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

export default CreateProperty