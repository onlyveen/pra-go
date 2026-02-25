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
    const pathName = router.pathname;

    const bodyClassName = pathName.replace(/\//g, "-").substring(1) || "home";

    // Remove previous page class if exists
    document.body.classList.forEach((className) => {
      if (className !== 'spiderman-theme' && className !== 'veenart-theme') {
        document.body.classList.remove(className);
      }
    });

    // Add new page class
    document.body.classList.add(bodyClassName);

    return () => {
      document.body.classList.remove(bodyClassName);
    };
  }, [router.pathname]);

  useEffect(() => {
    // Remove loading div after 2 seconds on any page
    const timer = setTimeout(() => {
      const loadingEl = document.querySelector(".loading");
      if (loadingEl) {
        loadingEl.remove();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelCircle.variable}`}>
      <CursorBackground />
      <div className="loading"></div>
      <Nav scroll={page === "home"} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
