// import React, { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";
// import { useFormik } from "formik";
// import { updateMovie, getMovieDetails } from "../../../../../apis/movieAPI";
// import { useParams } from "react-router-dom";

// export default function UpdateMovie() {
//   const [movieData, setMovieData] = useState([]);
//   const [forceUpdate] = useState({});
//   const [form] = Form.useForm();
//   const { movieId } = useParams();

//   useEffect(() => {
//     forceUpdate({});
//     getUserDetail();
//   }, []);

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       tenPhim: movieData.tenPhim || "",
//       biDanh: movieData.biDanh || "",
//       moTa: movieData.moTa || "",
//       hinhAnh: movieData.hinhAnh || "",
//       trailer: movieData.trailer || "",
//       sapChieu: movieData.sapChieu || "",
//       dangChieu: movieData.dangChieu || "",
//       hot: movieData.hot || "",
//       ngayKhoiChieu: movieData.ngayKhoiChieu || "",
//       danhGia: movieData.danhGia || "",
//     },

//     onSubmit: async (values) => {
//       try {
//         const response = await updateMovie(values);
//         notification.success({
//           message: "Cập nhật phim thành công!",
//         });
//       } catch (error) {
//         notification.error({
//           message: "Cập nhật phim thất bại!",
//           description: error.response.data.content,
//         });
//       }
//     },
//   });
//   const getMovieDetails = async () => {
//     try {
//       const data = await getMovieDetails(movieId);
//       if (data.content) {
//         setMovieData(data.content);
//         form.setFieldsValue({
//           tenPhim: data.content.tenPhim,
//           biDanh: data.content.biDanh,
//           moTa: data.content.moTa,
//           hinhAnh: data.content.hinhAnh,
//           trailer: data.content.trailer,
//           sapChieu: data.content.sapChieu,
//           dangChieu: data.content.dangChieu,
//           hot: data.content.hot,
//           ngayKhoiChieu: data.content.ngayKhoiChieu,
//           danhGia: data.content.danhGia,
//         });
//       }
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   };
//   return <div>UpdateMovie</div>;
// }

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMovieDetails, updateMovie } from "../../../../../apis/movieAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed } from "yup";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Box, Container, Grid, TextField, Button, Switch } from "@mui/material";
import style from "../../AddMovie/addMovie.module.css";

const updateMovieSchema = object({
  tenPhim: string().required("Tên phim không được để trống"),
  biDanh: string().required("Bí danh không được để trống"),
  moTa: string().required("Mô tả không được để trống"),
  hinhAnh: mixed().test("required", "Hình ảnh không được để trống", (value) => {
    return value !== undefined;
  }),
  trailer: string().required("Trailer không được để trống"),
  ngayKhoiChieu: string().required("Ngày tháng năm không được để trống"),
  danhGia: string().required("Đánh giá không được để trống"),
});

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function UpdateMovie() {
  const { movieId } = useParams();

  console.log("movieId:", movieId);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: "",
    },
    resolver: yupResolver(updateMovieSchema),
  });

  const navigate = useNavigate();

  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    //Chạy vào useEffect callback khi giá trị của hinhAnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  }, [hinhAnh]);

  const { data: movie } = useQuery(["movie", movieId], () =>
    getMovieDetails(movieId)
  );

  useEffect(() => {
    console.log(movie);
    // Đặt giá trị cho các trường từ dữ liệu phim đã có
    if (movie) {
      setValue("tenPhim", movie.tenPhim);
      setValue("biDanh", movie.biDanh);
      setValue("moTa", movie.moTa);
      setValue("trailer", movie.trailer);
      setValue("ngayKhoiChieu", movie.ngayKhoiChieu);
      setValue("sapChieu", movie.sapChieu);
      setValue("dangChieu", movie.dangChieu);
      setValue("hot", movie.hot);
      setValue("danhGia", movie.danhGia);
    }
  }, [movie]);

  const { mutate: onUpdate } = useMutation(
    (values) => {
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      if (values.hinhAnh[0]) {
        formData.append("hinhAnh", values.hinhAnh[0]);
      }
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("sapChieu", values.sapChieu);
      formData.append("dangChieu", values.dangChieu);
      formData.append("hot", values.hot);
      formData.append("danhGia", values.danhGia);
      formData.append("maPhim", "movieId");

      return updateMovie(movieId, formData); // Sử dụng hàm cập nhật phim
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["movie", movieId]);
        queryClient.invalidateQueries("movie-list");
      },
    }
  );

  return (
    <div className={style.container}>
      <Container style={{ margin: "20px 0" }}>
        <h1 style={{ textAlign: "center" }}>Update Movie</h1>
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
              onSubmit={handleSubmit(onUpdate)}
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
                    setValueAs: (date) => {
                      return dayjs(date).format("YYYY-MM-DD");
                    },
                  })}
                />
              </div>
              <div>
                <div>
                  <p>
                    Đang chiếu <Switch {...label} {...register("dangChieu")} />
                  </p>
                </div>
                <div>
                  <p>
                    Sắp chiếu <Switch {...label} {...register("sapChieu")} />
                  </p>
                </div>
                <div>
                  <p>
                    Hot <Switch {...label} {...register("hot")} />
                  </p>
                </div>
              </div>
              <div>
                <TextField
                  label="Rating"
                  type="number"
                  min="0"
                  max="10"
                  {...register("danhGia")}
                  helperText={errors.danhGia?.message}
                />
              </div>
              <div className={style.btn}>
                <Button
                  type="submit"
                  style={{ padding: "10px 30px" }}
                  variant="contained"
                  color="success"
                >
                  Cập nhật phim
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
