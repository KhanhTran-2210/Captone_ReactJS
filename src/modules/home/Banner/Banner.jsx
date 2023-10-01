import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "../../../apis/movieAPI";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
  Select,
  Container,
  Box,
  Button,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import style from "../../../style.module.css";

import "swiper/css";
import "swiper/css/navigation";

export default function Banner() {
  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["banners"], queryFn: getBanner });

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
  return (
    <div>
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
        {banners?.map((banner) => {
          return (
            <SwiperSlide>
              <div>
                <img
                  key={banner.maBanner}
                  src={banner.hinhAnh}
                  alt=""
                  width="100%"
                  height="80%"
                />
                <Button>
                  <PlayCircleOutlineIcon />
                </Button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <div style={{ width: "100%" }}>
        <Box sx={{ width: "100%", height: 70 }}>
          <Grid container>
            <div>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="phim">Phim</InputLabel>
                  <Select>
                    <MenuItem></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <div>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="rap">Rạp</InputLabel>
                  <Select>
                    <MenuItem></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <div>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="ngayGioChieu">Ngày giờ chiếu</InputLabel>
                  <Select>
                    <MenuItem></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <Grid item xs={2}>
              <button></button>
            </Grid>
          </Grid>
        </Box>
      </div> */}
    </div>
  );
}
