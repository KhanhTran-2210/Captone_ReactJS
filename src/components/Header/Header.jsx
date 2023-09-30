import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import style from "../../style.module.css";

export default function Header() {
  const { currentUser, handleSignout } = useUserContext();
  return (
    <div>
      <AppBar position="static" color="white">
        <Toolbar>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h6">
                <img src="" alt="Logo" height="40" />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button color="inherit">Trang Chủ</Button>
              <Button color="inherit">Sản Phẩm</Button>
              <Button color="inherit">Dịch Vụ</Button>
              <Button color="inherit">Liên Hệ</Button>
            </Grid>
            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span className={style.header_signin}>
                  {currentUser ? (
                    <div>
                      <span>
                        <a href="">
                          <AccountBoxIcon />
                          {currentUser.hoTen}
                        </a>{" "}
                        |
                        <a href="/" onClick={handleSignout}>
                          <LogoutIcon />
                          Đăng xuất
                        </a>
                      </span>
                    </div>
                  ) : (
                    <>
                      {" "}
                      <a href="/sign-in">
                        <AccountCircleOutlinedIcon sx={{ marginRight: 1 }} />
                        Đăng nhập
                      </a>
                      |
                      <a href="/sign-up">
                        <AccountCircleOutlinedIcon sx={{ marginRight: 1 }} />
                        Đăng kí
                      </a>
                    </>
                  )}
                </span>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
