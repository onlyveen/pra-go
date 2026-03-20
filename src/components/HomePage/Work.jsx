import React, { useEffect, useState, useRef } from "react";
import Airtable from "airtable";
import Slider from "react-slick";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import prev from "@images/works/arrow-prev.svg";
import next from "@images/works/arrow-next.svg";
import Image from "next/image";
import "slick-carousel/slick/slick.css";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const workRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);


  useEffect(() => {
    const personalAccessToken =
      "patIjXB3MBHdk1jaO.a5548ae54bc6e860eaaae0fe12028a763c71a28338402ecfa8826967c3376ea3";
    const baseId = "appr5I664V8E3bx2w"; // Replace with your actual Base ID

    const base = new Airtable({ apiKey: personalAccessToken }).base(baseId);

    base("PraGoWorks")
      .select({
        view: "Grid view", // Adjust view name if necessary
      })
      .all()
      .then((records) => {
        setProjects(records.map((record) => record.fields));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // GSAP animations for Work section
  useEffect(() => {
    if (!loading && projects.length > 0) {
      const ctx = gsap.context(() => {
        // Animate section title
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: workRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        // Animate slider
        gsap.from(sliderRef.current, {
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      }, workRef);

      return () => ctx.revert();
    }
  }, [loading, projects]);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading)
    return (
      <div className="work-section" id="my-work">
        <div className="loading inline"></div>
      </div>
    );
  if (error)
    return (
      <div className="work-section" id="my-work">
        <div>Error: {error.message}</div>
      </div>
    );

  return (
    <div className="work-section" id="my-work" ref={workRef}>
      <div className="container">
        <h2 className="subTitle" ref={titleRef}>
          My Work
        </h2>
      </div>
      <div className="slider-container">
        <div ref={sliderRef}>
          <Slider {...settings}>
            {projects.map((project, index) => (
              <a
                href={project.caseLink}
                key={index}
                target="_blank"
                className="project-card"
              >
                <div className="innerCard">
                  <div className="image-container">
                    {project.thumbnail && project.thumbnail[0] && (
                      <img src={project.thumbnail[0].url} alt={project.name} />
                    )}
                  </div>
                  <h3>{project.name}</h3>
                  <div className="pills">
                    {project.scope &&
                      project.scope.map((tag, idx) => (
                        <small key={idx} className="tag">
                          {tag}
                        </small>
                      ))}
                  </div>
                </div>
              </a>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <Image loading="lazy" src={next} alt="Slick Next" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <Image loading="lazy" src={prev} alt="Slick Prev" />
    </div>
  );
};

export default Work;
