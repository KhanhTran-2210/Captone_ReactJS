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

function App() {
  return (
    <UserProvider>
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
              <Route path="tickets/:showtimeId" element={<TicketMovie />} />
            </Route>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>

          {/* Admin */}
          {/* <Route element={<AdminProtectedRoute />}> */}
          <Route path="/admin">
            <Route path="movies" element={<AdminMovie />} />
            {/* <Route path="users" element={<AdminUser />} /> */}
            {/* <Route path="tickets" element={<AdminTicket />} /> */}
          </Route>
          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
