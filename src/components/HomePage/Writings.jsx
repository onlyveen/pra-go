import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import Image from "next/image";

const Writings = () => {
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const personalAccessToken =
      "patIjXB3MBHdk1jaO.a5548ae54bc6e860eaaae0fe12028a763c71a28338402ecfa8826967c3376ea3";
    const baseId = "appr5I664V8E3bx2w"; // Replace with your actual Base ID

    const base = new Airtable({ apiKey: personalAccessToken }).base(baseId);

    base("PraGoWritings")
      .select({
        view: "Grid view", // Adjust view name if necessary
      })
      .all()
      .then((records) => {
        setWritings(records.map((record) => record.fields));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="writings-section" id="my-writings">
        <div className="loading">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="writings-section" id="my-writings">
        <div>Error: {error.message}</div>
      </div>
    );

  return (
    <div className="writings-section" id="my-writings">
      <div className="container">
        <h2 className="subTitle">My Writings</h2>

        {writings.map((blog, index) => (
          <a
            href={blog.blogLink}
            key={index}
            target="_blank"
            className="blog-card"
          >
            <div className="blog-thumb">
              {blog.thumbnail && blog.thumbnail[0] && (
                <img src={blog.thumbnail[0].url} alt={blog.name} />
              )}
            </div>
            <div className="blog-details">
              <h2>{blog.name}</h2>
              <p>
                {blog.abstract.slice(0, 200)}
                {blog.abstract.length >= 200 && (
                  <span>
                    ... <span className="high">Read More</span>
                  </span>
                )}{" "}
              </p>
              <div className="pills">
                Topics :
                {blog.topics &&
                  blog.topics.map((topic, idx) => (
                    <small key={idx} className="tag">
                      {topic}
                    </small>
                  ))}
              </div>
            </div>
          </a>
        ))}
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

export default Writings;
