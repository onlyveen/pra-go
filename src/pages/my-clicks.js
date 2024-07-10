import React, { useState, useEffect, useRef, useCallback } from "react";

import { useInView } from "react-intersection-observer";
import Layout from "@components/Layout";
import { fetchPhotosFromCollection } from "@/lib/pexel";
import Modal from "@/lib/Modal";
import Head from "next/head";
const collectionId = "70kt1eu";

const PraGoView = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const loadMorePhotos = useCallback(async () => {
    setLoading(true);
    const newPhotos = await fetchPhotosFromCollection(collectionId, page);
    console.log("Loaded Photos:", newPhotos);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  useEffect(() => {
    loadMorePhotos();
  }, [loadMorePhotos]);

  return (
    <Layout>
      <Head>
        <title>PraGoView - Praveen Gorakala's Photography</title>

        <meta
          name="description"
          content="Explore the photography collection of Praveen Gorakala on PraGoView."
        />

        <meta
          name="keywords"
          content="Praveen Gorakala, Photography, PraGoView, Pexels Collection"
        />

        <meta name="author" content="Praveen Gorakala" />
      </Head>
      <div className="gallery">
        <div className="container desc">
          <h1>#PraGoView</h1>
          <p>
            I passionately capture stunning visuals of nature, people, and
            moments. Explore my collection of beautiful photographs and get
            inspired by my unique perspective and artistic touch.
          </p>
        </div>
        <div className="container grid">
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.src.large}
              alt={photo.alt}
              loading="lazy"
              className="gallery-item"
              onClick={() => handlePhotoClick(photo)}
            />
          ))}
        </div>
        <div ref={ref} className="loading inline">
          {loading && "Loading..."}
        </div>
        {selectedPhoto && <Modal photo={selectedPhoto} onClose={closeModal} />}
      </div>
    </Layout>
  );
};

export default PraGoView;
