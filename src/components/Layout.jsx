import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useAuth } from '../contexts/AuthContext';
import "../css/Layout.css";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Sidebar />}
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;