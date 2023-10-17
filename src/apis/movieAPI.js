import fetcher from "./fetcher";

export async function getBanner() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getMovies({ search }) {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP07",
        tenPhim: search,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: movieId,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function addMovie(movie) {
  try {
    const response = await fetcher.post(
      "/QuanLyPhim/ThemPhimUploadHinh",
      movie
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
export async function moviePerPage(page, itemsPerpage) {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: "GP07",
        soTrang: page,
        soPhanTuTrenTrang: itemsPerpage,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
