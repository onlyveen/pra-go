import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import Slider from "react-slick";
import prev from "@images/works/arrow-prev.svg";
import next from "@images/works/arrow-next.svg";
import Image from "next/image";
import "slick-carousel/slick/slick.css";

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="work-section" id="my-work">
      <div className="container">
        <h2 className="subTitle">My Work</h2>
      </div>

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
