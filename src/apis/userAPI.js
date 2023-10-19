import fetcher from "./fetcher";
import axiosClient from "./axiosClient";

export const signin = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// apiGetUserInfo
export const apiGetUserList = async () => {
  const { data } = await axiosClient.get(
    "/QuanLyNguoiDung/LayDanhSachNguoiDung",
    {
      params: {
        maNhom: "GP03",
      },
    }
  );
  return data;
};

// apiDeleteUser
export const apiDeleteUser = async (taiKhoan) => {
  const { data } = await axiosClient.delete(
    `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
  );
  return data;
};

// apiAddUser
export const apiAddUser = async (userData) => {
  const { data } = await axiosClient.post(
    "/QuanLyNguoiDung/ThemNguoiDung",
    userData
  );
  return data;
};

// apiUpdateUser
export const apiUpdateUser = async (userData) => {
  const { data } = await axiosClient.post(
    "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    userData
  );
  return data;
};

// apiGetUserDetail
export const apiGetUserDetail = async (taiKhoan) => {
  const { data } = await axiosClient.post(
    `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
  );
  return data;
};

// apiUserLogin
export const apiUserLogin = async (values) => {
  const { data } = await axiosClient.post("/QuanLyNguoiDung/DangNhap", values);
  return data;
};
