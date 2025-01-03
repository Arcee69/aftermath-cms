import React from 'react'
import { Route, Routes} from "react-router-dom";

import { AuthProtectRoutes, ProtectRoutes } from './protectRoutes';

import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgotPassword';

import BoardLayout from '../layouts/boardLayout';
import CreateBlog from '../pages/dashboard/createBlog';
import ViewBlog from '../pages/dashboard/viewBlog';
import UpdateBlog from '../pages/dashboard/viewBlog/components/UpdateBlog';
import PasswordReset from '../pages/auth/forgotPassword/PasswordReset';
import Gallery from '../pages/dashboard/gallery';


//<ProtectRoutes /> 


export default function Routers () {

  return (
    <div>
        <Routes>

            <Route element={<BoardLayout /> }>
              <Route path="/create-news" element={<CreateBlog />} />
              <Route path="/view-news" element={<ViewBlog />} />
              <Route path="/update-news" element={<UpdateBlog />} />
              <Route path="/gallery" element={<Gallery />} />
            </Route>

            {/* <Route element={<AuthProtectRoutes />}> */}
                <Route path='/' element={<Login />} />
                <Route path='/reset-password' element={<PasswordReset />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
            {/* </Route> */}
        </Routes>
    </div>
  )
}
