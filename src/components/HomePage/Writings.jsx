import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { formatDate } from "@lib/date";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Writings = ({ writings = [] }) => {
  const router = useRouter();
  const writingsRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const goToTopic = (e, topic) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/blog?topic=${encodeURIComponent(topic)}`);
  };

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

  // GSAP animations for Writings section
  useEffect(() => {
    if (writings.length > 0) {
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
  }, [writings]);

  if (writings.length === 0) return null;

  return (
    <div className="writings-section" id="my-writings" ref={writingsRef}>
      <div className="container">
        <h2 className="subTitle" ref={titleRef}>My Writings</h2>

        {writings.map((blog, index) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={blog.slug}
            className="blog-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="blog-thumb">
              {blog.thumbnail && <img src={blog.thumbnail} alt={blog.title} />}
            </div>
            <div className="blog-details">
              <h2>{blog.title}</h2>
              <div className="blog-meta">
                {blog.date && formatDate(blog.date)}
                {blog.date && " · "}
                {blog.readingTime} min read
              </div>
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
                    <small key={idx} className="tag" onClick={(e) => goToTopic(e, topic)}>
                      {topic}
                    </small>
                  ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Writings;
