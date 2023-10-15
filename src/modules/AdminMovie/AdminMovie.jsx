import React, { useState } from "react";

import {
  Grid,
  List,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, Outlet } from "react-router-dom";
import style from "./adminStyle.module.css";

export default function AdminMovie() {
  const [openUser, setOpenUser] = useState(true);

  const handleClickUser = () => {
    setOpenUser(!openUser);
  };
  const [openMovie, setOpenMovie] = useState(true);

  const handleClickMovie = () => {
    setOpenMovie(!openMovie);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <List
            sx={{
              width: "100%",
              maxWidth: 260,
              bgcolor: "#003366",
              height: "100vh",
              color: "#fff",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <h1 style={{ textAlign: "center" }}>ADMIN</h1>
            <hr />
            <ListItemButton onClick={handleClickUser}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
              {openUser ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to="users-list">
                    <ListItemText primary="Danh sách user" />
                  </Link>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to="user-add">
                    <ListItemText primary="Thêm user" />
                  </Link>
                </ListItemButton>
              </List>
            </Collapse>
            <hr />
            <ListItemButton onClick={handleClickMovie}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Movie" />
              {openMovie ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMovie} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to="movie-list">
                    <ListItemText primary="Danh sách movie" />
                  </Link>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to="movie-add">
                    <ListItemText primary="Thêm movie" />
                  </Link>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid item xs={8}>
          {/* <div className={style.adminWelcome}>
            <img
              src="./img/animation_lnovjcw6_small.gif"
              alt=""
              width="300px"
            />
            <h1>Welcome Admin</h1>
          </div> */}
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
}
