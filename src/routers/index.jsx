import React from 'react'
import { Route, Routes} from "react-router-dom";

import { AuthProtectRoutes, ProtectRoutes } from './protectRoutes';

import Login from '../pages/auth/login';
// import ForgotPassword from '../pages/auth/forgotPassword';

import BoardLayout from '../layouts/boardLayout';
import CreateProperty from '../pages/dashboard/createProperty';
import ViewProperty from '../pages/dashboard/viewProperty';
import UpdateProperty from '../pages/dashboard/viewProperty/components/UpdateProperty';
import PasswordReset from '../pages/auth/forgotPassword/PasswordReset';
import Contacts from '../pages/contacts';


//<ProtectRoutes /> 


export default function Routers () {

  return (
    <div>
        <Routes>

            <Route element={<BoardLayout /> }>
              <Route path="/create-property" element={<CreateProperty />} />
              <Route path="/view-properties" element={<ViewProperty />} />
              <Route path="/update-property" element={<UpdateProperty />} />
              <Route path="/contacts" element={<Contacts />} />
            </Route>

            {/* <Route element={<AuthProtectRoutes />}> */}
                <Route path='/' element={<Login />} />
                <Route path='/reset-password' element={<PasswordReset />} />
                {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
            {/* </Route> */}
        </Routes>
    </div>
  )
}
