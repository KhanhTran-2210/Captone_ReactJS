import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAdminUserContext } from "../../contexts/AdminContext/AdminContext";

export default function AdminProtectedRoute({ children }) {
  const { adminUser, handleAdminSignout } = useAdminUserContext();
  const location = useLocation();

  if (!adminUser || adminUser.maLoaiNguoiDung !== "QuanTri") {
    const url = `/404?redirectTo=${location.pathname}`;
    handleAdminSignout();
    return <Navigate to={url} replace />;
  }
  if (!adminUser) {
    //user chưa đăng nhập => redirect về trang login
    const url = `/log-in-admin?redirectTo=${location.pathname}`;

    return <Navigate to={url} replace />;
  }

  return children || <Outlet />;
}
