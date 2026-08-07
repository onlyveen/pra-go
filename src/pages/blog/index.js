import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllPosts } from "@lib/blog";

export async function getStaticProps() {
  const writings = getAllPosts();
  return { props: { writings } };
}

const BlogIndex = ({ writings }) => {
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

          {writings.length === 0 && <p>No posts yet — check back soon.</p>}

          {writings.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="blog-card">
              <div className="blog-thumb">
                {blog.thumbnail && <img src={blog.thumbnail} alt={blog.title} />}
              </div>
              <div className="blog-details">
                <h2>{blog.title}</h2>
                <div className="blog-meta">{blog.readingTime} min read</div>
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
                      <small key={idx} className="tag">
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
