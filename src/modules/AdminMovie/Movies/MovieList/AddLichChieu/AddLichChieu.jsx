import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInformtionSystemCinema,
  getSystemCinema,
  postShowing,
} from "../../../../../apis/cinemaAPI";
import {
  Box,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import { DatePicker } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed } from "yup";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import style from "../../AddMovie/addMovie.module.css";
import { getMovieDetails } from "../../../../../apis/movieAPI";

const { RangePicker } = DatePicker;
const addCinemaSchema = object({
  ngayChieuGioChieu: mixed()
    .test("isValidDate", "Ngày giờ không hợp lệ", (value) => {
      // Thực hiện kiểm tra xem giá trị có phải là ngày hợp lệ không
      return value ? !isNaN(Date.parse(value)) : false;
    })
    .required("Ngày giờ không được để trống"),
  giaVe: string().required("Giá không được để trống"),
  maHeThongRap: string().required("Hệ thống rạp không được để trống"),
  maCumRap: string().required("Cụm rạp không được để trống"),
});

export default function AddLichChieu() {
  const [selectedCine, setSelectedCine] = useState("");
  const [seclectSysCine, setSelectSysCine] = useState("");

  const { movieId } = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maHeThongRap: "",
      maPhim: "",
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    resolver: yupResolver(addCinemaSchema),
  });

  const { data: systemCine = [] } = useQuery({
    queryKey: ["systemCinema"],
    queryFn: getSystemCinema,
  });

  const { data: infoSysCine = [] } = useQuery({
    queryKey: ["informationSysCine", selectedCine],
    queryFn: () => getInformtionSystemCinema(selectedCine),
    enabled: !!selectedCine,
  });

  const { data: movie } = useQuery(["movie", movieId], () =>
    getMovieDetails(movieId)
  );
  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => postShowing({ ...values, maPhim: movieId }),
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    if (selectedCine) {
      // Gọi truy vấn để lấy danh sách rạp từ hệ thống rạp được chọn
      queryClient.invalidateQueries(["informationSysCine", selectedCine]);
    }
  }, [selectedCine]);

  const handleChangeSystemCinema = (evt) => {
    setSelectedCine(evt.target.value);
  };

  const handleChangeCumRap = (evt) => {
    console.log(evt.target.value);
    setSelectSysCine(evt.target.value);
  };
  console.log(seclectSysCine);

  const onChange = (value) => {
    console.log("Selected Time: ", value);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <h1 style={{ textAlign: "center" }}>Add Showtime</h1>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            {movie ? (
              <div style={{ height: "100vh" }}>
                <h3>
                  {movie.tenPhim}-{movie.maPhim}
                </h3>
                <img
                  src={movie.hinhAnh}
                  alt={movie.maPhim}
                  width="70%"
                  height="70%"
                />
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
          <Grid item xs={6}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={style.formSubmit}
            >
              <Box sx={{ maxWidth: 360 }}>
                <FormControl fullWidth>
                  <InputLabel id="heThongRapLabel">Hệ thống rạp</InputLabel>
                  <Controller
                    name="maHeThongRap"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Hệ thống rạp không được để trống" }}
                    render={({ field }) => (
                      <Select
                        labelId="heThongRapLabel"
                        // id="maHeThongRap"
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event);
                          handleChangeSystemCinema(event);
                          setSelectSysCine("");
                        }}
                        label="Hệ thống rạp"
                      >
                        {systemCine.map((rap) => (
                          <MenuItem
                            key={rap.maHeThongRap}
                            value={rap.maHeThongRap}
                          >
                            {rap.maHeThongRap}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <span>{errors?.maHeThongRap?.message}</span>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Cụm rạp</InputLabel>
                  <Controller
                    name="maRap"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Cụm rạp không được để trống" }}
                    render={({ field }) => (
                      <Select
                        // labelId="cumRapLabel"
                        // id="maCumRap"
                        label="Cụm rạp"
                        value={seclectSysCine}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChangeCumRap(e);
                        }}
                        // {...field}
                      >
                        {infoSysCine.map((rap) => (
                          <MenuItem key={rap.maCumRap} value={rap.maCumRap}>
                            {rap.tenCumRap}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <span>{errors?.maCumRap?.message}</span>
                </FormControl>
              </Box>
              <div>
                {" "}
                <DatePicker showTime onChange={onChange} onOk={onOk} />
              </div>

              <div>
                <TextField
                  label="Giá vé"
                  type="number"
                  min="75000"
                  max="95000"
                />
              </div>
              <div className={style.btn}>
                <Button
                  variant="contained"
                  color="success"
                  style={{ padding: "10px 30px" }}
                >
                  Tạo lịch chiếu
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
