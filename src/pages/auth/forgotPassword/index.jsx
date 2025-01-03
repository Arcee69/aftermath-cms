/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Back from "../../../assets/icons/back-arrow.svg";

import Button from "../../../components/Button";
import Password from "../../../components/InputFields/PasswordField";
import { useUser } from "../../../providers/userDetailsProvider";
import { isObjectEmpty } from "../../../utils";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { handleChangePassword } = useUser();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/create-blog";



  const createPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email").max(255).required("Required"),
    newPassword: Yup.string().min(7, "Password must be at least 7 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const submitForm = (values, actions) => {
    const data = {
        email: values?.email,
        password: values?.newPassword,
        password_confirmation: values?.confirmPassword
    }
    handleChangePassword(data, actions)

    
  }

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
              Create New Password
            </div>
            <Formik
              initialValues={{
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={createPasswordSchema}
              onSubmit={(values, actions) => {
                    submitForm(values, actions)
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

                    <div className="mt-4">
                        <label htmlFor='new password' className="text-base text-left font-semibold text-[#000000]">New Password</label>
                        <Password
                            placeholder="New Password"
                            handleChange={handleChange}
                            value={values.newPassword}
                            name="newPassword"
                            style={{ backgroundColor: "#F2F5FA" }}
                            />
                            {errors.newPassword && touched.newPassword ? (
                            <div className='text-RED-_100'>
                                {errors.newPassword}
                            </div>
                            ) : null}
                    </div>

                  <div className="mt-4">
                    <label htmlFor='confirm password' className="text-base text-left font-semibold text-[#000000]">Confirm Password</label>
                    <Password
                      placeholder="Re-enter New Password"
                      handleChange={handleChange}
                      value={values.confirmPassword}
                      name="confirmPassword"
                      style={{ backgroundColor: "#F2F5FA" }}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className='text-RED-_100'>
                        {errors.confirmPassword}
                      </div>
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
  );
}
