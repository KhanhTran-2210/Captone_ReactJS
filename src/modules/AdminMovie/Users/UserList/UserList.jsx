import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Space, Table, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { apiGetUserList, apiDeleteUser } from "../../../../apis/userAPI";

export default function UserList() {
  const [searchValue, setSearchValue] = useState("");
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      filteredValue: [searchValue],
      onFilter: (value, record) =>
        String(record.taiKhoan).toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      key: "soDT",
      dataIndex: "soDT",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="text-2xl text-blue-500"
            style={{ backgroundColor: "#49CC90" }}
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </button>
          <button
            className="text-2xl text-red-500"
            style={{ backgroundColor: "#F93E3E" }}
            onClick={() => deleteUser(record.taiKhoan)}
          >
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];

  const getUserData = async () => {
    try {
      const data = await apiGetUserList();
      setUserList(data.content);
      console.log(data.content);
    } catch (error) {
      throw error.data.content;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteUser = async (taiKhoan) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa tài khoản này không? ?",
      content: "Hành động này không thể hoàn tác",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await apiDeleteUser(taiKhoan);
          getUserData();
          notification.success({
            message: "Xóa tài khoản thành công",
          });
        } catch (error) {
          notification.error({
            message: "Xóa tài khoản thất bại",
          });
        }
      },
    });
  };

  const handleEdit = (record) => {
    const userId = record.taiKhoan;
    navigate(`/admin/users/edit/${userId}`);
  };

  return (
    <main
      style={{ height: "100vh", overflowY: "scroll" }}
      className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"
    >
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3 mt-16">
            <div className="flex justify-between">
              <button
                className="mb-5 text-black font-bold py-2 px-4 rounded bg-white"
                style={{
                  border: "none",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/admin/users/add-user")}
              >
                Add new
              </button>
              <div className="search-wrapper rounded-lg flex align-items-center  w-3/12 mb-5">
                <form
                  action
                  className="relative ml-auto w-max bg-white rounded-3xl "
                >
                  <span
                    style={{
                      color: "black",
                      paddingRight: "10px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Tìm Kiếm:
                  </span>
                  <input
                    type="search"
                    className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full 
            border bg-transparent pl-12 outline-none focus:w-full 
            focus:cursor-text focus:border-black focus:pl-16 focus:pr-4 inputSearch"
                    style={{ width: "300px", height: "32px" }}
                    onSearch={(value) => {
                      setSearchValue(value);
                    }}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </form>
              </div>
            </div>
            <div
              className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 
                  border-transparent border-solid shadow-xl rounded-2xl bg-clip-border"
            >
              <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <span
                  className=" text-slate-500 opacity-50 text-[18px]"
                  style={{ fontSize: "30px" }}
                >
                  User List
                </span>
              </div>

              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <Table columns={columns} dataSource={userList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
