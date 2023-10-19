// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { object, string, mixed } from "yup";
// import { useMutation } from "@tanstack/react-query";
// import { updateMovie } from "../../../../../apis/movieAPI";
// import { useParams } from "react-router-dom";

// const updateMovieSchema = object({
//   tenPhim: string().required("Tên phim không được để trống"),
//   biDanh: string().required("Bí danh không được để trống"),
//   moTa: string().required("Mô tả không được để trống"),
//   hinhAnh: mixed().test("required", "Hình ảnh không được để trống", (value) => {
//     return value !== undefined;
//   }),
//   trailer: string().required("Trailer không được để trống"),
//   ngayKhoiChieu: string().required("Ngày tháng năm không được để trống"),
// });

// export default function UpdateMovie() {
//   const { maPhim } = useParams();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       tenPhim: "",
//       biDanh: "",
//       moTa: "",
//       hinhAnh: "",
//       trailer: "",
//       ngayKhoiChieu: "",
//       sapChieu: "",
//       dangChieu: "",
//       hot: "",
//       danhGia: "",
//     },
//     resolver: yupResolver(updateMovieSchema),
//   });
//   const hinhAnh = watch("hinhAnh");
//   const [imgPreview, setImgPreview] = useState("");
//   useEffect(() => {
//     //Chạy vào usEffect callback khi giá trị của hinhAnh bị thay đổi
//     const file = hinhAnh?.[0];
//     if (!file) return;
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = (evt) => {
//       setImgPreview(evt.target.result);
//     };
//   }, [hinhAnh]);

//   useMutation({
//     mutationFn: (values) => {
//       const formData = new FormData();
//       formData.append("tenPhim", values.tenPhim);
//       formData.append("biDanh", values.biDanh);
//       formData.append("moTa", values.moTa);
//       if (values.hinhAnh[0]) {
//         formData.append("hinhAnh", values.hinhAnh[0]);
//       }
//       formData.append("trailer", values.trailer);
//       formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
//       formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
//       formData.append("sapChieu", values.sapChieu);
//       formData.append("dangChieu", values.dangChieu);
//       formData.append("hot", values.hot);
//       formData.append("danhGia", values.danhGia);
//       formData.append("maNhom", "GP07");
//       formData.append("maPhim", maPhim);
//       return updateMovie(formData);
//     },
//   });

//   return <div>UpdateMovie</div>;
// }
