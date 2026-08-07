import React, { useEffect } from "react";
import Layout from "@components/Layout";
import Header from "@/components/HomePage/Header";
import About from "@/components/HomePage/About";
import Journey from "@/components/HomePage/Journey";
import Work from "@/components/HomePage/Work";
import Writings from "@/components/HomePage/Writings";
import Clicks from "@/components/HomePage/Clicks";
import { getAllPosts } from "@lib/blog";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export async function getStaticProps() {
  const writings = getAllPosts();
  return { props: { writings } };
}

const HomePage = ({ writings }) => {
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ".about",
      endTrigger: ".writings-section",
      start: "top 70%",
      end: "top top",
      onEnter: () => document.body.classList.add("dark-section-view"),
      onLeave: () => document.body.classList.remove("dark-section-view"),
      onEnterBack: () => document.body.classList.add("dark-section-view"),
      onLeaveBack: () => document.body.classList.remove("dark-section-view"),
    });
    return () => st.kill();
  }, []);

  return (
    <Layout page="home">
      <Header />
      <About />
      <Journey />
      <Work />
      <Writings writings={writings} />
      <Clicks />
    </Layout>
  );
};

export default HomePage;
