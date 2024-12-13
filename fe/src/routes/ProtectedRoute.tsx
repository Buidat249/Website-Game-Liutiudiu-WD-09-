import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode; // Định nghĩa kiểu cho children
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userId = localStorage.getItem("user_id");
  console.log('id',userId)

  // Kiểm tra nếu không có user_id thì chuyển hướng đến trang đăng nhập
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, cho phép truy cập
  return <>{children}</>;
};

export default ProtectedRoute;
