import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Nav from "./Nav"; // Make sure to create this component
import Footer from "./Footer"; // Make sure to create this component
import CursorBackground from "./CursorBackground";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelCircle } from "geist/font/pixel";

const Layout = ({ children, page }) => {
  const router = useRouter();

  useEffect(() => {
    // Get the current path name
    const pathName = router.pathname;

    // Create a class name based on the path name
    const bodyClassName = pathName.replace(/\//g, "-").substring(1) || "home";

    // Set the class name on the body element
    document.body.className = bodyClassName;

    // Cleanup function to remove the class when the component unmounts or path changes
    return () => {
      document.body.className = "";
    };
  }, [router.pathname]);

  return (
    <div className={`page ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelCircle.variable}`}>
      <CursorBackground />
      <Nav scroll={page === "home"} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
