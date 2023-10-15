import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getMovieShowTime } from "../../../apis/cinemaAPI";

export default function Showtimes({ movieId }) {
  const [cinemas, setCinemas] = useState([]);
  const { data, isLoading } = useQuery({
    queryKey: ["movieShowTime", movieId],
    queryFn: () => getMovieShowTime(movieId),
    enabled: !!movieId,
  });
  console.log(data);
  const cinemaSystems = data?.heThongRapChieu || [];
  console.log("cinemaSystems:", cinemaSystems);
  const handleGetCinemaSystem = (cinemaSystemsId) => {
    const found = cinemaSystems.find(
      (item) => item.maHeThongRap === cinemaSystemsId
    );
    setCinemas(found.cumRapChieu);
  };

  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setCinemas(cinemaSystems[0].cumRapChieu);
    }
  }, [cinemaSystems]);

  return (
    <div>
      {/* Render hệ thống rạp    */}
      {cinemaSystems.map((cinemaSystems) => {
        return (
          <div key={cinemaSystems.maHeThongRap}>
            <img
              src={cinemaSystems.logo}
              alt=""
              width={50}
              height={50}
              onClick={() => handleGetCinemaSystem(cinemaSystems.maHeThongRap)}
            />
          </div>
        );
      })}
      {/* Render danh sách rạp  */}
      {cinemas.map((cinema) => {
        return (
          <div>
            <h3>{cinema.tenCumRap}</h3>
            {cinema.rap}
            {/* Render lịch chiếu  */}
            {cinema.lichChieuPhim.map((showtime) => {
              const date = new Date(showtime.ngayChieuGioChieu);
              const time = dayjs(showtime.ngayChieuGioChieu).format(
                "DD-MM-YYYY ~ HH:mm"
              );
              // onClick={() => navigate(`/tickets/${showtime.maLichChieu}`)}
              return <button>{time}</button>;
            })}
          </div>
        );
      })}
    </div>
  );
}
