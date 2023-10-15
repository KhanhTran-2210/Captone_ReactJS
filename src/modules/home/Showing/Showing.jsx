import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../../apis/movieAPI";
import { getMovieShowTimes } from "../../../apis/cinemaAPI";
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
  Modal,
  Dialog,
  DialogContent,
} from "@mui/material";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import style from "../../../style.module.css";

export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
  const { data: cinemas } = useQuery({
    queryKey: ["cinema"],
    queryFn: getMovieShowTimes,
  });
  const navigate = useNavigate();
  const [urlTrailers, setUrlTrailers] = useState({});

  return (
    <div>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <Container maxWidth="md">
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {data.map((movie) => {
                  const videoId = getVideoId(movie.trailer);
                  // console.log(videoId);

                  return (
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
                                    // console.log(
                                    //   `Video URL: https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&widgetid=11`
                                    // );
                                    // setUrlTrailer(
                                    //   `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&widgetid=11`
                                    // );
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
                                <p className={style.descShowing}>
                                  {movie.moTa}
                                </p>
                              </div>
                            </div>
                            <div>
                              <a
                                onClick={() =>
                                  navigate(`/movies/${movie.maPhim}`)
                                }
                                className={style.butMuaVe}
                                href=""
                              >
                                MUA VÉ
                              </a>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                      {/* <div style={{ position: "relative" }}>
                        {open && (
                          <div className={style.overlayVid}>
                            <ReactPlayer
                              controls
                              width="100%"
                              height="100%"
                              url={movie.trailer}
                              onEnded={() => {
                                setOpen(false);
                                setShowOverlay(false);
                              }}
                            />
                          </div>
                        )}
                      </div> */}

                      <Dialog
                        open={Boolean(urlTrailers[movie.maPhim])}
                        onClose={() =>
                          setUrlTrailers({
                            ...urlTrailers,
                            [movie.maPhim]: null,
                          })
                        }
                        // fullWidth={true}
                        // maxWidth="lg"
                        // sx={{ height: "80vh", overflowY: "auto" }}
                      >
                        {urlTrailers[movie.maPhim] && (
                          <DialogContent
                            style={{ height: "529px", width: "940px" }}
                          >
                            <Box sx={{ width: "100%", height: "100%" }}>
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
                            </Box>
                          </DialogContent>
                        )}
                      </Dialog>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
