import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../../../apis/userAPI";
import { useNavigate, Navigate } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";

const signinSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
});
export default function Signin() {
  const { currentUser, handleSigin: onSigninSuccess } = useUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signinSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleSigin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      onSigninSuccess(data);
    },
  });

  const onSubmit = (values) => {
    handleSigin(values);
  };
  // currentUser khác null => user đã đăng nhập => điều hướng về Home
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <h1>Sign-In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <input placeholder="Tài khoản" {...register("taiKhoan")} />
            {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
          </div>
          <div>
            <input
              placeholder="Mật khẩu"
              {...register("matKhau")}
              type="password"
            />
            {errors.matKhau && <p>{errors.matKhau.message}</p>}
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          Đăng nhập
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
