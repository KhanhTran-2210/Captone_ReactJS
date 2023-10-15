import fetcher from "./fetcher";

export async function getMovieShowTime(movieId) {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: movieId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
export async function getSystemCinema(systemId) {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinHeThongRap", {
      params: {
        maHeThongRap: systemId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
export async function getInformtionSystemCinema(systemId) {
  try {
    const response = await fetcher.get(
      "/QuanLyRap/LayThongTinCumRapTheoHeThong",
      {
        params: {
          maHeThongRap: systemId,
        },
      }
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
export async function getLichChieu(systemId) {
  try {
    const response = await fetcher.get(
      "/QuanLyRap/LayThongTinLichChieuHeThongRap",
      {
        params: {
          maHeThongRap: systemId,
          maNhom: "GP01",
        },
      }
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
