import React from "react";
import Layout from "@components/Layout";
import Header from "@/components/HomePage/Header";
import About from "@/components/HomePage/About";
import Work from "@/components/HomePage/Work";
import Writings from "@/components/HomePage/Writings";

const HomePage = () => {
  return (
    <Layout page="home">
      <Header />
      <About />
      <Work />
      <Writings />
    </Layout>
  );
};

export default HomePage;
