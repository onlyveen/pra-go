import { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/Layout";
import BlogProgressBar from "@/components/BlogProgressBar";
import { getAllSlugs, getPostBySlug } from "@lib/blog";
import { formatDate } from "@lib/date";

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
  const articleRef = useRef(null);

  return (
    <Layout page="blog">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={post.abstract} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={post.abstract} />
        {post.thumbnail && <meta property="og:image" content={post.thumbnail} />}
      </Head>

      <BlogProgressBar targetRef={articleRef} />

      <article className="blog-post" ref={articleRef}>
        <div className="container">
          <Link href="/blog" className="blog-post-back">
            &larr; Back to Blog List
          </Link>

          {post.thumbnail && (
            <div className="blog-post-thumb">
              <img src={post.thumbnail} alt={post.title} />
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
