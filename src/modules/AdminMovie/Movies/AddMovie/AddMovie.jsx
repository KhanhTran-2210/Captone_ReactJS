import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../../../../apis/movieAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed } from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, TextField, Button } from "@mui/material";
import style from "./addMovie.module.css";
import MovieList from "../MovieList/MovieList";

const addMovieSchema = object({
  tenPhim: string().required("Tên phim không được để trống"),
  biDanh: string().required("Bí danh không được để trống"),
  moTa: string().required("Mô tả không được để trống"),
  hinhAnh: mixed().test("required", "Hình ảnh không được để trống", (value) => {
    return value !== undefined;
  }),
  trailer: string().required("Trailer không được để trống"),
  ngayKhoiChieu: string().required("Ngày tháng năm không được để trống"),
});

export default function AddMovie() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
    resolver: yupResolver(addMovieSchema),
  });
  const navigate = useNavigate();
  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setImgPreview] = useState("");
  useEffect(() => {
    //Chạy vào usEffect callback khi giá trị của hinhAnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  }, [hinhAnh]);
  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      if (values.hinhAnh[0]) {
        formData.append("hinhAnh", values.hinhAnh[0]);
      }
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP07");

      return addMovie(formData);
    },

    onSuccess: () => {
      alert("Thêm phim thành công");
      navigate(MovieList);
    },
  });
  return (
    <div className={style.container}>
      <Container style={{ margin: "20px 0" }}>
        <h1 style={{ textAlign: "center" }}>Add Movie</h1>
        <Grid container>
          <Grid item xs={6}>
            {imgPreview ? (
              <div style={{ margin: "150px" }}>
                <img src={imgPreview} width="100%" height="100%" />
              </div>
            ) : (
              <div className={style.bgImg}></div>
            )}
          </Grid>
          <Grid item xs={6}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={style.formSubmit}
            >
              <div>
                <input
                  placeholder="Hình Ảnh"
                  type="file"
                  {...register("hinhAnh")}
                />
                {errors && <p>{errors.hinhAnh?.message}</p>}
              </div>

              <div>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Tên phim"
                  variant="outlined"
                  {...register("tenPhim")}
                  helperText={errors.tenPhim?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Bí danh"
                  variant="outlined"
                  {...register("biDanh")}
                  helperText={errors.biDanh?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Trailer"
                  variant="outlined"
                  {...register("trailer")}
                  helperText={errors.trailer?.message}
                />
              </div>

              <div className={style.textArea}>
                <textarea
                  name="Mô tả"
                  cols="72"
                  rows="10"
                  placeholder="Mô tả"
                  {...register("moTa")}
                ></textarea>
                {errors.moTa && <p>{errors.moTa.message}</p>}
              </div>
              <div>
                <input
                  placeholder="Ngày Khởi Chiếu"
                  type="date"
                  {...register("ngayKhoiChieu", {
                    setValueAs: (value) => {
                      return dayjs(value).format("DD/MM/YYYY");
                    },
                  })}
                />
              </div>

              <div className={style.btn}>
                <Button
                  type="submit"
                  style={{ padding: "10px 30px" }}
                  variant="contained"
                  color="success"
                >
                  Thêm phim
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { addMovie } from "../../../../apis/movieAPI";

// export default function AddMovie() {
//   const { register, handleSubmit, watch } = useForm({
//     defaultValues: {
//       tenPhim: "",
//       biDanh: "",
//       moTa: "",
//       hinhAnh: "",
//       trailer: "",
//       ngayKhoiChieu: "",
//     },
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
//   const { mutate: onSubmit } = useMutation({
//     mutationFn: (values) => {
//       console.log(values);
//       const formData = new FormData();
//       formData.append("tenPhim", values.tenPhim);
//       formData.append("biDanh", values.biDanh);
//       formData.append("moTa", values.moTa);
//       formData.append("hinhAnh", values.hinhAnh[0]);
//       formData.append("trailer", values.trailer);
//       formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
//       formData.append("maNhom", "GP07");

//       return addMovie(formData);
//     },
//     // onSuccess() => {
//     //   //Đóng modal hoặc chuyển trang
//     //   // Sử dụng queryClient.invalidateQueries để gọi API get danh sách phim
//     // }
//   });
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <input placeholder="Tên Phim" {...register("tenPhim")} />
//       </div>
//       <div>
//         <input placeholder="Bí Danh" {...register("biDanh")} />
//       </div>
//       <div>
//         <input placeholder="Mô Tả" {...register("moTa")} />
//       </div>
//       <div>
//         <input placeholder="Hình Ảnh" type="file" {...register("hinhAnh")} />
//         {imgPreview && (
//           <div>
//             <img src={imgPreview} width={200} height={200} />
//           </div>
//         )}
//       </div>
//       <div>
//         <input placeholder="Trailer" {...register("trailer")} />
//       </div>
//       <div>
//         <input
//           placeholder="Ngày Khởi Chiếu"
//           type="date"
//           {...register("ngayKhoiChieu", {
//             setValueAs: (value) => {
//               return dayjs(value).format("DD/MM/YYYY");
//             },
//           })}
//         />
//       </div>

//       <button>Thêm phim</button>
//     </form>
//   );
// }
