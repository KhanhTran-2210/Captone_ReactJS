import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../../apis/movieAPI";
import getVideoId from "./videoUltils";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Box, Grid, Button, Container, Modal, Dialog } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import style from "../../../style.module.css";

export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [showOverlay, setShowOverlay] = useState(false);

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
                  console.log(videoId);
                  // if (!videoId) {
                  //   return <div key={movie.maPhim}>Invalid URL</div>;
                  // }
                  return (
                    <Grid item xs={2} sm={4} md={4} key={movie.maPhim}>
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
                                    setOpen(true);
                                    setShowOverlay(true);
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
                          <Grid item>
                            <div className={style.titleShowing}>
                              <span className={style.squareC18}>C18</span>{" "}
                              {movie.tenPhim}
                            </div>
                            <div>
                              <p className={style.descShowing}>{movie.moTa}</p>
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
                      <div>
                        {open && (
                          <Dialog open={open} onClose={() => setOpen(false)}>
                            <iframe
                              id="my-iframe-id"
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&widgetid=11`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer;autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; muted"
                              allowFullScreen
                            ></iframe>
                          </Dialog>
                        )}
                      </div>
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
