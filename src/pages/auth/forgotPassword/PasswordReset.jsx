import React from 'react'
import { motion } from 'framer-motion';
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";

import Back from "../../../assets/icons/back-arrow.svg";

import { api } from "../../../services/api";
import { appUrls } from "../../../services/urls";

const PasswordReset = () => {
    const navigate = useNavigate()

  const formValidationSchema = Yup.object().shape({
    email: Yup.string().email("Enter Valid Email").required("Required"),

  }) 


  const submitForm = async (values) => {
    // Perform forgot password logic

    const data = {
      email: values?.email
    };

    await api.post(appUrls?.FORGETPASSWORD_URL, data) 
    .then((response) => {
      console.log(response, "data")
      toast(response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
      })
      navigate("/forgot-password")
    })
    .catch((error) => {
      console.log(error, "obi")
      toast(error?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
      })
    })
  };

  return (
    <>
      <div className="flex flex-row justify-center p-4 ">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          className=""
        >
          <div className="bg-NEUTRAL-_600 w-6 h-6 mt-0.5 rounded-3xl flex justify-center">
            <img
              src={Back}
              alt="back"
              className="cursor-pointer p-1.5"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="xs:w-[330px] xs:h-[450px] md:w-[423px] md:h-auto border border-solid mt-5 rounded-xl shadow-md bg-BACKGROUND_WHITE p-8 ">
            <div className="text-[#6F8EB3] font-normal text-center text-base xs:mx-auto lg:mx-0 leading-6">
              Reset Password
            </div>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={formValidationSchema}
              onSubmit={(values) => {
                    submitForm(values)
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                isSubmitting,
                touched,
                errors,
                dirty,
                isValid,
              }) => (
                <Form onSubmit={handleSubmit} className="mt-3 flex flex-col lg:w-[407px]">

                    
                    <div className="flex flex-col lg:w-[435px] ">
                        <label htmlFor='email' className="text-base text-left font-semibold text-[#000000]">Email</label>
                        <input
                            name="email"
                            placeholder="youremail@domain.com"
                            type="text" 
                            value={values.email}
                            onChange={handleChange}
                            className="rounded outline-none bg-[#F2F5FA] shadow h-[21px] border-solid  p-3 border"
                        />
                        {errors.email && touched.email ? (
                        <div className='text-RED-_100'>{errors.email}</div>
                        ) : null}
                    </div>

                  <div className="mt-10 lg:w-[435px]">
                    <button 
                        className= "bg-primary border-primary text-[#fff]  lg:w-[435px]  rounded-lg p-1 cursor-pointer text-center w-full h-[45px] text-lg font-medium"
                        type="submit"
                    >
                        Reset Password
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default PasswordReset