import { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/Layout";
import BlogProgressBar from "@/components/BlogProgressBar";
import BlogImage from "@/components/BlogImage";
import { getAllSlugs, getPostBySlug } from "@lib/blog";
import { formatDate } from "@lib/date";
import { absoluteUrl } from "@lib/seo";

export async function getStaticPaths() {
  const slugs = getAllSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return { props: { post } };
}

const BlogPost = ({ post }) => {
  const pageTitle = `${post.title} - Praveen Gorakala`;
  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);
  const publishedTime = post.date ? new Date(post.date).toISOString() : null;
  const articleRef = useRef(null);

  return (
    <Layout page="blog">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={post.abstract} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook — keys match _app.js so these override the site defaults */}
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:url" property="og:url" content={canonicalUrl} />
        <meta key="og:title" property="og:title" content={pageTitle} />
        <meta key="og:description" property="og:description" content={post.abstract} />
        {publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        {post.thumbnail && (
          <meta key="og:image" property="og:image" content={absoluteUrl(post.thumbnail)} />
        )}

        {/* Twitter */}
        <meta key="twitter:card" property="twitter:card" content="summary_large_image" />
        <meta key="twitter:url" property="twitter:url" content={canonicalUrl} />
        <meta key="twitter:title" property="twitter:title" content={pageTitle} />
        <meta
          key="twitter:description"
          property="twitter:description"
          content={post.abstract}
        />
        {post.thumbnail && (
          <meta
            key="twitter:image"
            property="twitter:image"
            content={absoluteUrl(post.thumbnail)}
          />
        )}
      </Head>

      <BlogProgressBar targetRef={articleRef} />

      <article className="blog-post" ref={articleRef}>
        <div className="container">
          <Link href="/blog" className="blog-post-back">
            &larr; Back to Blog List
          </Link>

          {post.thumbnail && (
            <div className="blog-post-thumb">
              <BlogImage src={post.thumbnail} alt={post.title} />
            </div>
          )}

          <h1>{post.title}</h1>

          <p className="blog-post-meta">
            {post.date && formatDate(post.date)}
            {post.date && " · "}
            {post.readingTime} min read
          </p>

          {post.topics.length > 0 && (
            <div className="pills">
              {post.topics.map((topic, idx) => (
                <Link key={idx} href={`/blog?topic=${encodeURIComponent(topic)}`}>
                  <small className="tag">{topic}</small>
                </Link>
              ))}
            </div>
          )}

          <div className="blog-post-content">
            <ReactMarkdown
              components={{
                a: ({ href, children, ...props }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => <BlogImage src={src} alt={alt} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
