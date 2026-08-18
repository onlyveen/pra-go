// src/pages/_app.js
import Head from "next/head";
import { Anton } from "next/font/google";
import "../styles/styles.scss"; // Import your global styles here
import { SITE_URL } from "@lib/seo";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-anton: ${anton.style.fontFamily};
        }
      `}</style>
      <Head>
        {/*
          Site-wide fallback metadata. next/head dedupes <title> and
          meta[name=...] tags by keeping the last one rendered in the tree —
          since <Component /> renders after this Head, a page that sets its
          own title/description overrides these. property-based tags (og:*,
          twitter:*) aren't deduped by Next unless they share a `key`, so
          every tag below carries one; a page overrides a given tag only by
          reusing the same key.
        */}
        <title>Praveen Gorakala - Frontend Architect & Principal Designer</title>
        <meta
          name="description"
          content="Praveen Gorakala is a Frontend Architect & Principal Designer focused on crafting impactful experiences in branding, UI/UX design, and web development."
        />
        <link rel="icon" href="/favicon.png" />

        {/* Open Graph / Facebook */}
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:url" property="og:url" content={`${SITE_URL}/`} />
        <meta
          key="og:title"
          property="og:title"
          content="Praveen Gorakala - Frontend Architect & Principal Designer"
        />
        <meta
          key="og:description"
          property="og:description"
          content="Praveen Gorakala is a Frontend Architect & Principal Designer focused on crafting impactful experiences in branding, UI/UX design, and web development."
        />
        <meta key="og:image" property="og:image" content={`${SITE_URL}/seo-image.png`} />

        {/* Twitter */}
        <meta key="twitter:card" property="twitter:card" content="summary_large_image" />
        <meta key="twitter:url" property="twitter:url" content={`${SITE_URL}/`} />
        <meta
          key="twitter:title"
          property="twitter:title"
          content="Praveen Gorakala - Frontend Architect & Principal Designer"
        />
        <meta
          key="twitter:description"
          property="twitter:description"
          content="Praveen Gorakala is a Frontend Architect & Principal Designer focused on crafting impactful experiences in branding, UI/UX design, and web development."
        />
        <meta key="twitter:image" property="twitter:image" content={`${SITE_URL}/seo-image.png`} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
