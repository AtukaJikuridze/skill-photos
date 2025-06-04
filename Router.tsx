import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./src/pages/home/Home";
import ImagePage from "./src/pages/image/ImagePage";
import MainLayout from "./src/layouts/MainLayout";
import NotFound from "./src/pages/NotFound";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="image/:id" element={<ImagePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
