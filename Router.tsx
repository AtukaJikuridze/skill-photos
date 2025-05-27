import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./src/pages/home/Home";
import ImagePage from "./src/pages/image/ImagePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="images/:id" element={<ImagePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
