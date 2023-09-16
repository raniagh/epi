/*

=========================================================

    Portail étudiant SWISSWAI
    =========================================================

    * Main project file .
    * Copyright 2023 company "Zesty Swiss"

=========================================================

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
/*import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";*/
import "react-toastify/dist/ReactToastify.css";
import "Assets/scss/argon-dashboard-react.scss";
import "Assets/css/argon-dashboard-react.css";
import "./index.css";
import { Login } from "pages";
import Home from "components/layouts/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
//const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
/*  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<Login />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-center" />
  </QueryClientProvider> */
