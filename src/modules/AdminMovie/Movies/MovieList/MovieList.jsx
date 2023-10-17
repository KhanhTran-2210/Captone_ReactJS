import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getMovies } from "../../../../apis/movieAPI";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow,
  IconButton,
  InputBase,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import style from "./movieStyle.module.css";

export default function MovieList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  const filteredData = data.filter((item) => {
    return item.tenPhim.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={style.container}>
      <h1 style={{ textAlign: "center" }}>Movie List</h1>
      <div className={style.search}>
        <Paper sx={{ p: "2px 4px", width: 250 }}>
          <InputBase
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      <TableContainer component={Paper} className={style.tableContainer}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Showtime</TableCell>
              <TableCell align="center">More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.item.map((item) => {
              return (
                <TableRow key={item.maPhim}>
                  <TableCell>
                    <img src={item.hinhAnh} alt="" width="50px" height="70px" />
                  </TableCell>
                  <TableCell>
                    <p>{item.maPhim}</p>
                  </TableCell>
                  <TableCell>
                    <h4>{item.tenPhim}</h4>
                  </TableCell>
                  <TableCell>
                    <p>{item.moTa}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.ngayKhoiChieu}</p>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex" }}>
                      <Button>
                        <BorderColorIcon />
                      </Button>
                      <Button>
                        <DeleteIcon />
                      </Button>
                      <Button>
                        <WorkIcon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}