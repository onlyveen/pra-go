import { useEffect, useRef, useState } from "react";

const BlogImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <span className={`blog-image-wrap${loaded ? " is-loaded" : " is-loading"}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
};

export default BlogImage;
