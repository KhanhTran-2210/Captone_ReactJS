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
                  <ListItemText primary="Danh sách user" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Thêm user" />
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
                  <ListItemText primary="Danh sách movie" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Thêm movie" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid item xs={8}>
          <div className={style.adminWelcome}>
            <img
              src="./img/animation_lnovjcw6_small.gif"
              alt=""
              width="300px"
            />
            <h1>Welcome Admin</h1>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
