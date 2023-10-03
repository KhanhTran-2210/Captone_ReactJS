import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanner, getMovies } from "../../../apis/movieAPI";
import { getMovieShowTime } from "../../../apis/cinemaAPI";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
  Select,
  Container,
  Button,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import style from "./bannerStyle.module.css";

import "swiper/css";
import "swiper/css/navigation";

export default function Banner({ movieId }) {
  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["banners"], queryFn: getBanner });

  const { data: movies = [] } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  const { data: movieShowTimes } = useQuery({
    queryKey: ["movieShowTime", movieId],
    queryFn: () => getMovieShowTime(movieId),
    enabled: !!movieId,
  });
  const cinemaSystems = movieShowTimes?.heThongRapChieu || [];

  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");

  const handleChangeMovie = (event) => {
    setSelectedMovie(event.target.value);
    setSelectedCinema("");
    setSelectedShowtime("");
  };

  const handleChangeCinema = (event) => {
    setSelectedCinema(event.target.value);
    setSelectedShowtime("");
  };

  const handleChangeShowtime = (event) => {
    setSelectedShowtime(event.target.value);
  };

  if (isLoading) {
    return (
      <div>
        <img
          src="./img/animation_lmvydl73_small.gif"
          alt=""
          width="100%"
          height="100%"
        />
      </div>
    );
  }
  console.log("Selected Movie:", selectedMovie);
  console.log("Cinema Systems:", cinemaSystems);
  console.log("Selected Cinema:", selectedCinema);
  console.log("Selected Showtime:", selectedShowtime);
  return (
    <div className={style.banner}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners?.map((banner) => (
          <div className={style.banner1} key={banner.maBanner}>
            <SwiperSlide>
              <div
                className={style.bgBanner}
                style={{ backgroundImage: `url(${banner.hinhAnh})` }}
              >
                <div
                  style={{
                    height: "600px",
                    lineHeight: "600px",
                  }}
                >
                  <Button>
                    <PlayCircleOutlineIcon
                      fontSize="large"
                      className={style.iconPlay}
                    />
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>

      <Container maxWidth="md" className={style.formSelect}>
        <Grid container className={style.formSelect1}>
          <Grid item xs={4}>
            <div className={style.dropDown}>
              <FormControl className={style.dropDown1} variant="standard">
                <InputLabel className={style.dropDown2}>Phim</InputLabel>
                <Select
                  value={selectedMovie}
                  onChange={handleChangeMovie}
                  label="Phim"
                >
                  {movies.map((movie) => (
                    <MenuItem key={movie.maPhim} value={movie.maPhim}>
                      {movie.tenPhim}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={style.dropDown}>
              <FormControl className={style.dropDown1} variant="standard">
                <InputLabel className={style.dropDown2}>Rạp</InputLabel>
                <Select
                  value={selectedCinema}
                  onChange={handleChangeCinema}
                  label="Rạp"
                >
                  {selectedMovie &&
                    cinemaSystems
                      .find((rap) => rap.maPhim === selectedMovie)
                      ?.cumRapChieu.map((cumRap) => (
                        <MenuItem key={cumRap.maCumRap} value={cumRap.maCumRap}>
                          {cumRap.tenCumRap}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={style.dropDown}>
              <FormControl className={style.dropDown1} variant="standard">
                <InputLabel className={style.dropDown2}>Ngày & Giờ</InputLabel>
                <Select
                  value={selectedShowtime}
                  onChange={handleChangeShowtime}
                  label="Ngày & Giờ"
                >
                  {selectedCinema &&
                    cinemaSystems
                      .find((rap) => rap.maHeThongRap === selectedMovie)
                      ?.cumRapChieu.find(
                        (cumRap) => cumRap.maCumRap === selectedCinema
                      )
                      ?.lichChieuPhim.map((lichChieu) => (
                        <MenuItem
                          key={lichChieu.maLichChieu}
                          value={lichChieu.maLichChieu}
                        >
                          {lichChieu.ngayChieuGioChieu}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={style.dropDown1}>
              <Button variant="contained" className={style.btnForm}>
                Mua vé ngay
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
