import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchPhotosFromCollection } from "@/lib/pexel";

const collectionId = "70kt1eu";

const Clicks = () => {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

  const handlePhotoClick = (photo) => {
    sessionStorage.setItem("openPhoto", JSON.stringify(photo));
    router.push("/my-clicks");
  };

  useEffect(() => {
    fetchPhotosFromCollection(collectionId, 1, 8).then(setPhotos);
  }, []);

  const single = photos.slice(0, 4);
  const grid = photos.slice(4, 8);

  if (photos.length === 0) return null;

  return (
    <section className="clicks-section" id="my-clicks">
      <div className="container container-sm">
        <h2 className="subTitle">My Clicks</h2>
        <div className="clicks-row">
          {single.map((photo) => (
            <div className="clicks-col" key={photo.id} onClick={() => handlePhotoClick(photo)}>
              <img src={photo.src.large} alt={photo.alt} />
            </div>
          ))}
          <div className="clicks-col clicks-grid-col">
            <div className="clicks-grid">
              {grid.map((photo) => (
                <img key={photo.id} src={photo.src.medium} alt={photo.alt} />
              ))}
            </div>
            <Link href="/my-clicks" className="clicks-viewmore">
              View More
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Clicks;
