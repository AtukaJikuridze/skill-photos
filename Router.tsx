import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./src/pages/home/Home";
import ImagePage from "./src/pages/image/ImagePage";
import MainLayout from "./src/layouts/MainLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="image" element={<ImagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
