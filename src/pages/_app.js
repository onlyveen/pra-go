// src/pages/_app.js
import Head from "next/head";
import "../styles/styles.scss"; // Import your global styles here

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Head>
        <title>Praveen Gorakala - Principal Designer</title>
        <meta
          name="description"
          content="Praveen Gorakala is a passionate designer focused on crafting impactful experiences in branding, UI/UX design, and web development."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://praveengorakala.com/" />
        <meta
          property="og:title"
          content="Praveen Gorakala - Principal Designer"
        />
        <meta
          property="og:description"
          content="Praveen Gorakala is a passionate designer focused on crafting impactful experiences in branding, UI/UX design, and web development."
        />
        <meta
          property="og:image"
          content="https://praveengorakala.com/seo-image.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://praveengorakala.com/" />
        <meta
          property="twitter:title"
          content="Praveen Gorakala - Principal Designer"
        />
        <meta
          property="twitter:description"
          content="Praveen Gorakala is a passionate designer focused on crafting impactful experiences in branding, UI/UX design, and web development."
        />
        <meta
          property="twitter:image"
          content="https://praveengorakala.com/seo-image.png"
        />
      </Head>
    </>
  );
}

export default MyApp;
