import { useState } from "react";

const BlogImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`blog-image-wrap${loaded ? " is-loaded" : " is-loading"}`}>
      <img src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} />
    </span>
  );
};

export default BlogImage;
