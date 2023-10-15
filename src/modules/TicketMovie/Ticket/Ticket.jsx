import React, { forwardRef, useState } from "react";
import { Box, Snackbar } from "@mui/material";
import {
  BackgroundTicket,
  FormatBackground,
  MiniCardLi,
  MiniCardUl,
  TextTicket,
} from "../MovieSeatList/styledMovieList";
import { useTicketContext } from "../../../contexts/TicketContext/TicketContext";
import { ButtonMovie } from "../../../components/ButtonMovie";
import MuiAlert from "@mui/material/Alert";
import { red } from "@mui/material/colors";

export default function Ticket({ infoCinema, data }) {
  console.log(infoCinema);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const { selectedSeats, totalPrice } = useTicketContext();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (evt, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <BackgroundTicket>
      <FormatBackground bg="url(https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-top-seatmap.png) repeat-x top left transparent;" />
      <MiniCardUl>
        <MiniCardLi br="1px solid #cccc" p="0 10px 0 0">
          <Box display={"flex"} flexDirection={"column"}>
            <Box sx={{ width: "500px", height: "500px", marginTop: "16px" }}>
              <img
                src={infoCinema}
                width="100%"
                height="100%"
                alt={data?.thongTinPhim.tenPhim}
              />
            </Box>
            <TextTicket pt="8px">{data?.thongTinPhim.tenPhim}</TextTicket>
          </Box>
        </MiniCardLi>
        <MiniCardLi p="0 10px">
          <Box display={"flex"} flexDirection={"column"} position={"relative"}>
            <Ticket>Thanh toán: </Ticket>
            <TextTicket color={red}>{totalPrice} VNĐ</TextTicket>
            <TextTicket>Cụm rạp: </TextTicket>
            <TextTicket>{data?.thongTinPhim.tenCumRap}</TextTicket>
            <TextTicket>Địa chỉ: </TextTicket>
            <TextTicket>{data?.thongTinPhim.diaChi}</TextTicket>
            <TextTicket>Rạp: </TextTicket>
            <TextTicket>{data?.thongTinPhim.tenRap}</TextTicket>
            <TextTicket>Ngày giờ chiếu: </TextTicket>
            <TextTicket>{data?.thongTinPhim.gioChieu}</TextTicket>
            <TextTicket>Ghế bạn chọn:</TextTicket>
            <Box display={"flex"}>
              {selectedSeats.map((item, index) => {
                const separator =
                  index === selectedSeats.length - 1 ? " " : ", ";
                return (
                  <TextTicket key={item.stt}>
                    {item.tenGhe} {separator}{" "}
                  </TextTicket>
                );
              })}
            </Box>
            <ButtonMovie
              onClick={handleClick}
              height="40px"
              position="absolute"
              bot="10px"
              left="0"
            >
              Đặt Vé
            </ButtonMovie>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Đặt vé thành công
              </Alert>
            </Snackbar>
          </Box>
        </MiniCardLi>
      </MiniCardUl>
      <FormatBackground bg="url(https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-top-seatmap.png) repeat-x bottom left transparent;"></FormatBackground>
    </BackgroundTicket>
  );
}
