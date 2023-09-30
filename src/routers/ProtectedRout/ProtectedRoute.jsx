import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();
  const location = useLocation();

  if (!currentUser) {
    //user chưa đăng nhập => redirect về trang login
    const url = `/sign-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  return children || <Outlet />;
}
/*
TH1: 
 <Route
      path="tickets/:showtimeId"
      element={
            <ProtectedRout>
              <Component/>
             </ProtectedRout>
             }
        />


TH2: 
<Route elemet = {<ProtectedRoute/>}>
    <Route path=".." element={<Component/>}
    Định nghĩ các Route khác muốn được protect
<Route/>
*/
