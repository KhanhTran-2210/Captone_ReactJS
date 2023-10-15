import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../../apis/movieAPI";
<<<<<<< HEAD
import { getMovieShowTimes } from "../../../apis/cinemaAPI";
=======

>>>>>>> ccda5408b38000a4ef0b91d242b81ecc253b7b67
import getVideoId from "./videoUltils";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import {
  Box,
  Grid,
  Button,
  Container,
  Dialog,
  DialogContent,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import style from "./showingStyle.module.css";

const chunkArray = (array, size) =>
  array.length
    ? Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
        array.slice(index * size, (index + 1) * size)
      )
    : [];

export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
<<<<<<< HEAD
  const { data: cinemas } = useQuery({
    queryKey: ["cinema"],
    queryFn: getMovieShowTimes,
  });
=======

>>>>>>> ccda5408b38000a4ef0b91d242b81ecc253b7b67
  const navigate = useNavigate();
  const [urlTrailers, setUrlTrailers] = useState({});

  const slides = chunkArray(data, 6).map((chunk, index) => (
    <Swiper key={index}>
      <Container maxWidth="md" style={{ margin: "50px auto" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            x
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {chunk.map((movie) => (
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                key={movie.maPhim}
                className={style.hoverShowing}
              >
                <div>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid
                      item
                      className={style.showingImg}
                      style={{
                        backgroundImage: `url(${movie.hinhAnh} )`,
                      }}
                    >
                      <div className={style.showingOverlay}>
                        <div
                          style={{
                            height: "314px",
                            lineHeight: "314px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              const videoId = getVideoId(movie.trailer);
                              const newUrlTrailers = {
                                ...urlTrailers,
                                [movie.maPhim]: `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&widgetid=11`,
                              };
                              setUrlTrailers(newUrlTrailers);
                            }}
                          >
                            <PlayCircleOutlineIcon
                              fontSize="large"
                              className={style.iconPlay}
                            />
                          </Button>
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      style={{ position: "relative", display: "block" }}
                    >
                      <div>
                        <div className={style.titleShowing}>
                          <span className={style.squareC18}>C18</span>{" "}
                          {movie.tenPhim}
                        </div>
                        <div>
                          <p className={style.descShowing}>{movie.moTa}</p>
                        </div>
                      </div>
                      <div>
                        <a
                          onClick={() => navigate(`/movies/${movie.maPhim}`)}
                          className={style.butMuaVe}
                          href=""
                        >
                          MUA VÉ
                        </a>
                      </div>
                    </Grid>
                  </Grid>
                </div>

                <Dialog
                  open={Boolean(urlTrailers[movie.maPhim])}
                  onClose={() =>
                    setUrlTrailers({
                      ...urlTrailers,
                      [movie.maPhim]: null,
                    })
                  }
                  maxWidth="lg"
                  style={{ height: "auto" }}
                >
                  {urlTrailers[movie.maPhim] && (
                    <DialogContent
                      style={{
                        width: "940px",
                        height: "529px",
                        padding: "0px",
                      }}
                    >
                      <iframe
                        id={`my-iframe-id-${movie.maPhim}`}
                        width="100%"
                        height="100%"
                        src={urlTrailers[movie.maPhim]}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer;autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; muted"
                        allowFullScreen
                      ></iframe>
                    </DialogContent>
                  )}
                </Dialog>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Swiper>
  ));

  return (
    <div id="showing">
      <SwiperSlide
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        {slides}
      </SwiperSlide>
    </div>
  );
}
