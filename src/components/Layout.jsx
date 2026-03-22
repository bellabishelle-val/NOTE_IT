import React from "react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      {/* You can also add Navbar here later */}
      
      {children}

      <Footer />
    </>
  );
};

export default Layout;