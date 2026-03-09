import { useState } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

const DisplayPictures = () => {
  const [downloadStatus, setDownloadStatus] = useState({});

  const pictures = [
    {
      id: 1,
      src: '/images/displaypictures/praveen-professional.jpg',
      title: 'Professional Portrait',
      filename: 'praveen-professional.jpg'
    },
    {
      id: 2,
      src: '/images/displaypictures/praveen-casual-white.jpg',
      title: 'Casual Portrait',
      filename: 'praveen-casual-white.jpg'
    },
    {
      id: 3,
      src: '/images/displaypictures/praveen-casual-cap.jpg',
      title: 'Casual Portrait - Cap',
      filename: 'praveen-casual-cap.jpg'
    },
    {
      id: 4,
      src: '/images/displaypictures/praveen-studio-orange.jpg',
      title: 'Studio Shot',
      filename: 'praveen-studio-orange.jpg'
    }
  ];

  const handleDownload = async (picture) => {
    try {
      setDownloadStatus({ ...downloadStatus, [picture.id]: 'downloading' });

      const response = await fetch(picture.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = picture.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadStatus({ ...downloadStatus, [picture.id]: 'success' });
      setTimeout(() => {
        setDownloadStatus({ ...downloadStatus, [picture.id]: null });
      }, 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus({ ...downloadStatus, [picture.id]: 'error' });
    }
  };

  return (
    <>
      <Head>
        <title>Display Pictures - Praveen Gorakala</title>
        <meta name="description" content="Downloadable display pictures and photos" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout page="displaypictures">
        <div className="display-pictures-page">
          <div className="container">
            <h1 className="page-title ">Display Pictures</h1>

            <div className="pictures-grid">
              {pictures.map((picture) => (
                <div key={picture.id} className="picture-card">
                  <div className="picture-image-wrapper">
                    <img
                      src={picture.src}
                      alt={picture.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="picture-info">
                    <h3>{picture.title}</h3>
                    <button
                      className={`download-btn ${downloadStatus[picture.id] || ''}`}
                      onClick={() => handleDownload(picture)}
                      disabled={downloadStatus[picture.id] === 'downloading'}
                    >
                      {downloadStatus[picture.id] === 'downloading' && (
                        <span>Downloading...</span>
                      )}
                      {downloadStatus[picture.id] === 'success' && (
                        <span>✓ Downloaded</span>
                      )}
                      {!downloadStatus[picture.id] && (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 11L4 7H6V2H10V7H12L8 11Z" fill="currentColor"/>
                            <path d="M2 13H14V15H2V13Z" fill="currentColor"/>
                          </svg>
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DisplayPictures;
