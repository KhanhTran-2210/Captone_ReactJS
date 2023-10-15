import fetcher from "./fetcher";

export async function getMovieShowTimes(movieId) {
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

export async function getCinema() {
  try {
    const response = await fetcher.get(`/QuanLyRap/LayThongTinHeThongRap`);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getLogo(theaterId) {
  try {
    const response = await fetcher.get("QuanLyRap/LayThongTinHeThongRap", {
      params: {
        maHeThongRap: theaterId,
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

export async function getTheaterShowTimes(theaterId) {
  try {
    const response = await fetcher.get(
      "QuanLyRap/LayThongTinLichChieuHeThongRap", 
      {
        params: {
          maHeThongRap: theaterId,
          maNhom: "GP03",
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

export async function getInfoTheater(theaterId) {
  try {
    const response = await fetcher.get(
      "QuanLyRap/LayThongTinCumRapTheoHeThong",
      {
        params: {
          maHeThongRap: theaterId,
export async function getLichChieu(systemId) {
  try {
    const response = await fetcher.get(
      "/QuanLyRap/LayThongTinLichChieuHeThongRap",
      {
        params: {
          maHeThongRap: systemId,
          maNhom: "GP07",
        },
      }
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
