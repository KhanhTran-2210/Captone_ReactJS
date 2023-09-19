import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { signup } from "../../../../apis/userAPI";

const signupSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  hoTen: string().required("Họ Tên không được để trống"),
  soDt: string().required("Số điện thoại kh được để trống"),
});
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },
    resolver: yupResolver(signupSchema),
  });
  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });
  const navigate = useNavigate();
  const onSubmit = (values) => {
    // Gọi API đăng kí
    handleSignup(values);
  };
  const onError = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div>
          <input placeholder="Email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input placeholder="Họ Tên" {...register("hoTen")} />
          {errors.hoTen && <p>{errors.hoTen.message}</p>}
        </div>
        <div>
          <input placeholder="Số điện thoại" {...register("soDt")} />
          {errors.soDt && <p>{errors.soDt.message}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          Đăng kí
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
