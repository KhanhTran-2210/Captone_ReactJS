import React, { useState } from "react";
import { ButtonSeatMovie } from "../styledMovieList";

export default function MovieSeatItem({
  seat,
  handleSelect,
  isSelected,
  isLoading,
}) {
  // const [isSelected, setIsSelected] = useState(false);
  // const [selectedSeat, handleSelect] = useTicketContext();

  let bg = "";
  if (seat.daDat) {
    bg = "#404040";
  } else if (isSelected) {
    bg = "rgb(235, 47, 150)";
  } else if (seat.loaiGhe === "Vip") {
    bg = "#f5222d";
  } else {
    bg = "#722ed1";
  }
  return (
    <ButtonSeatMovie
      key={seat.maGhe}
      bg={bg}
      evt={seat.daDat ? "none" : ""}
      disabled={seat.daDat || isLoading}
      onClick={() => {
        // setIsSelected(!isSelected)
        handleSelect({ ...seat, isSelected: !isSelected });
      }}
      onTouchEnd={() => {
        handleSelect({ ...seat, isSelected: !isSelected });
      }}
    >
      {seat.tenGhe}
    </ButtonSeatMovie>
  );
}
