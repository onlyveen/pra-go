import React, { useEffect, useState, useRef } from "react";
import Airtable from "airtable";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Writings = () => {
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const writingsRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Intersection Observer for body background color change
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add("dark-section-view");
          } else {
            // Only remove if no other dark sections are in view
            const otherSections = document.querySelectorAll('.about, .work-section');
            const anyOtherVisible = Array.from(otherSections).some(section => {
              const rect = section.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              return rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3;
            });
            if (!anyOtherVisible) {
              document.body.classList.remove("dark-section-view");
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (writingsRef.current) {
      observer.observe(writingsRef.current);
    }

    return () => {
      if (writingsRef.current) {
        observer.unobserve(writingsRef.current);
      }
    };
  }, []);

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

  // GSAP animations for Writings section
  useEffect(() => {
    if (!loading && writings.length > 0) {
      const ctx = gsap.context(() => {
        // Animate section title
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: writingsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        // Animate blog cards with stagger
        cardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              x: index % 2 === 0 ? -100 : 100,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        });
      }, writingsRef);

      return () => ctx.revert();
    }
  }, [loading, writings]);

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
    <div className="writings-section" id="my-writings" ref={writingsRef}>
      <div className="container">
        <h2 className="subTitle" ref={titleRef}>My Writings</h2>

        {writings.map((blog, index) => (
          <a
            href={blog.blogLink}
            key={index}
            target="_blank"
            className="blog-card"
            ref={(el) => (cardsRef.current[index] = el)}
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
