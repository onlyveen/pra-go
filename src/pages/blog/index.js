import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { getAllPosts } from "@lib/blog";
import { formatDate } from "@lib/date";

export async function getStaticProps() {
  const writings = getAllPosts();
  return { props: { writings } };
}

const BlogIndex = ({ writings }) => {
  const router = useRouter();
  const activeTopic = typeof router.query.topic === "string" ? router.query.topic : null;

  const visiblePosts = activeTopic
    ? writings.filter((blog) => blog.topics?.includes(activeTopic))
    : writings;

  const goToTopic = (e, topic) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/blog?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <Layout page="blog">
      <Head>
        <title>Writings - Praveen Gorakala</title>
        <meta
          name="description"
          content="Articles and writings by Praveen Gorakala on frontend architecture, design systems, and AI-powered development workflows."
        />
      </Head>

      <div className="blog-list">
        <div className="container">
          <h1>My Blog</h1>

          {activeTopic && (
            <p className="blog-filter">
              Showing posts tagged <strong>{activeTopic}</strong> ·{" "}
              <Link href="/blog">Clear filter</Link>
            </p>
          )}

          {visiblePosts.length === 0 && <p>No posts yet — check back soon.</p>}

          {visiblePosts.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="blog-card">
              <div className="blog-thumb">
                {blog.thumbnail && <img src={blog.thumbnail} alt={blog.title} />}
              </div>
              <div className="blog-details">
                <h2>{blog.title}</h2>
                <div className="blog-meta">
                  {blog.date && formatDate(blog.date)}
                  {blog.date && " · "}
                  {blog.readingTime} min read
                </div>
                <p>
                  {blog.abstract.slice(0, 200)}
                  {blog.abstract.length >= 200 && (
                    <span>
                      ... <span className="high">Read More</span>
                    </span>
                  )}{" "}
                </p>
                <div className="pills">
                  Topics :
                  {blog.topics &&
                    blog.topics.map((topic, idx) => (
                      <small key={idx} className="tag" onClick={(e) => goToTopic(e, topic)}>
                        {topic}
                      </small>
                    ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;
