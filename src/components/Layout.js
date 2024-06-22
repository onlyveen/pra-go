import React from "react";
import Nav from "./Nav"; // Make sure to create this component
import Footer from "./Footer"; // Make sure to create this component

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
