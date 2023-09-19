import React from "react";
import { useParams } from "react-router-dom";
import MovieProfile from "./MovieProfile/MovieProfile";
import Showtimes from "./Showtimes/Showtimes";

export default function Details() {
  const { movieId } = useParams();

  return (
    <div>
      <MovieProfile movieId={movieId} />
      <Showtimes movieId={movieId} />
    </div>
  );
}
