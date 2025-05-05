import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, NotFound } from "../pages/index";
export default function MianLayout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
