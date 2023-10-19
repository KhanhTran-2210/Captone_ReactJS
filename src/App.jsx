import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/home";
import Details from "./modules/Details";
import NotFound from "./components/NotFound";
import MainLayout from "./layouts/MainLayout";
import Signin from "./modules/Auth/pages/Signin";
import Signup from "./modules/Auth/pages/Signup";
import UserProvider from "./contexts/UserContext/UserContext";
import ProtectedRout from "./routers/ProtectedRout";
import AdminMovie from "./modules/AdminMovie";
import TicketMovie from "./modules/TicketMovie/TicketMovie";
import MovieList from "./modules/AdminMovie/Movies/MovieList/MovieList";
import UserList from "./modules/AdminMovie/Users/UserList/UserList";
import AddMovie from "./modules/AdminMovie/Movies/AddMovie/AddMovie";
import AddUser from "./modules/AdminMovie/Users/AddUser/AddUser";
import LoginAdmin from "./modules/Auth/pages/LoginAdmin/LoginAdmin";
import AdminProtectedRoute from "./routers/AdminProtectedRoute/AdminProtectedRoute";
import AdminUserProvider from "./contexts/AdminContext/AdminContext";
import UpdateUser from "./modules/AdminMovie/Users/UpdateUser/UpdateUser";

function App() {
  return (
    <UserProvider>
      <AdminUserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/movies/:movieId" element={<Details />} />
              {/* <Route
              path="tickets/:showtimeId"
              element={
                <ProtectedRout>
                  <div>Tiket page</div>
                </ProtectedRout>
              }
            /> */}
              <Route element={<ProtectedRout />}>
                <Route
                  path="tickets/:showtimeId"
                  element={<div>Tiket page</div>}
                />
              </Route>
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
            </Route>

            {/* Admin */}

            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminMovie />}>
                <Route path="movie-list" element={<MovieList />} />
                <Route path="users-list" element={<UserList />} />
                <Route path="movie-add" element={<AddMovie />} />
                <Route path="user-add" element={<AddUser />} />
                <Route path="user-update/:userId" element={<UpdateUser />} />
              </Route>
            </Route>
            <Route path="log-in-admin" element={<LoginAdmin />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminUserProvider>
    </UserProvider>
  );
}

export default App;
