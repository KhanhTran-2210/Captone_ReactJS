import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/home";
import Details from "./modules/Details";
import NotFound from "./components/NotFound";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies/:movieId" element={<Details />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
