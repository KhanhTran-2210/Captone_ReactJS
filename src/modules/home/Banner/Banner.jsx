import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "../../../apis/movieAPI";

export default function Banner() {
  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["banners"], queryFn: getBanner });

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <div>
      {banners.map((banner) => {
        return (
          <img
            key={banner.maBanner}
            src={banner.hinhAnh}
            width="100%"
            height="100%"
          />
        );
      })}
    </div>
  );
}
