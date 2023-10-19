import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteMovie, getMovies } from "../../../../apis/movieAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import style from "./movieStyle.module.css";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function MovieList() {
  //Dialog
  const [open, setOpen] = useState(false);
  const [deletingMovieId, setDeletingMovieId] = useState(null);
  const handleClickOpen = (movieId) => {
    setOpen(true);
    setDeletingMovieId(movieId);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //Search
  const [searchTerm, setSearchTerm] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: () => getMovies({ search: searchTerm }),
    // enabled: false,
  });

  const queryClient = useQueryClient();
  const { mutate: onDeleteMovie } = useMutation(
    (movieId) => deleteMovie(movieId),
    {
      onSuccess: () => {
        alert("Xóa phim thành công");
        queryClient.invalidateQueries("movie-list");
      },
      onError: () => {
        alert("Xóa phim thất bại");
      },
    }
  );
  const handleDeleteMovie = (movieId) => {
    onDeleteMovie(movieId);
  };
  const handleSearchChange = (event) => {
    event.preventDefault();
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
            {data.map((item) => {
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
                      <Link to={`/admin/edit-movie/${item.maPhim}`}>
                        <Button>
                          <BorderColorIcon />
                        </Button>
                      </Link>
                      <Button onClick={() => handleClickOpen(item.maPhim)}>
                        <DeleteIcon />
                      </Button>
                      <Link to={`/admin/add-showtime/${item.maPhim}`}>
                        <Button>
                          <WorkIcon />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bạn có muốn xóa phim này không ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Phim không thể hoàn tác khi xóa
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleClose();
              handleDeleteMovie(deletingMovieId);
            }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
