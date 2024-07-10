import React, { useState, useEffect, useRef, useCallback } from "react";

import Layout from "@components/Layout";
import { fetchPhotosFromCollection } from "@/lib/pexel";
import Modal from "@/lib/Modal";
import Head from "next/head";
const collectionId = "70kt1eu";

const PraGoView = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const pageEndRef = useRef(null);
  const photosCache = useRef({}); // Cache object to store fetched photos

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const loadMorePhotos = useCallback(async () => {
    if (!hasMore) return; // Stop fetching if no more pages

    setLoading(true);
    console.log("new page load request", page);
    console.log("loading", loading);

    const cachedPhotos = photosCache.current[page];
    if (cachedPhotos) {
      // Use cached photos if available
      setPhotos((prevPhotos) => [...prevPhotos, ...cachedPhotos]);
      setLoading(false);
      return;
    }

    const newPhotos = await fetchPhotosFromCollection(collectionId, page);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    photosCache.current[page] = newPhotos; // Cache fetched photos
    setHasMore(newPhotos.length > 0); // Update hasMore based on new data
    setLoading(false);
  }, [page, hasMore]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const contentHeight = document.documentElement.scrollHeight;

    // Check if we're close to the bottom of the page
    if (scrollY + windowHeight >= contentHeight - 100 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadMorePhotos();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loadMorePhotos]);

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
            <span
              key={photo.id}
              className={`gallery-item ${loading ? "" : "reveal"} `}
            >
              <img
                // ref={imgRef}
                src={photo.src.large}
                alt={photo.alt}
                loading="lazy"
                // onClick={onClick}
                onClick={() => handlePhotoClick(photo)}
              />
            </span>
          ))}
        </div>
        <div ref={pageEndRef}></div>
        <div className="container loading-container">
          {loading ? (
            <div className="loading inline">Loading</div>
          ) : (
            <div className="loading inline no-animate">Thats All</div>
          )}
        </div>

        {selectedPhoto && <Modal photo={selectedPhoto} onClose={closeModal} />}
      </div>
    </Layout>
  );
};

export default PraGoView;
