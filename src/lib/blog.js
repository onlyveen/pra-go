import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

function stripMarkdown(text) {
  return text
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/!\[.*?\]\[.*?\]/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function deriveTitle(content, fallback) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? stripMarkdown(match[1]) : fallback;
}

function deriveAbstract(content) {
  const withoutHeadings = content.replace(/^#{1,6}\s.*$/gm, "");
  const paragraph = withoutHeadings
    .split(/\n\s*\n/)
    .map((p) => stripMarkdown(p))
    .find((p) => p.length > 20);
  return paragraph || "";
}

// Falls back to a friendlier title when frontmatter is missing, e.g. a
// Google Docs / Word markdown export dropped straight into content/blog.
function fallbackTitle(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const WORDS_PER_MINUTE = 200;

function calculateReadingTime(content) {
  const words = stripMarkdown(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function readPost(fileName, { includeContent = true } = {}) {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = fs.statSync(fullPath);

  const post = {
    slug,
    title: data.title || deriveTitle(content, fallbackTitle(slug)),
    date: data.date || stats.mtime.toISOString(),
    abstract: data.abstract || deriveAbstract(content),
    topics: data.topics || [],
    thumbnail: data.thumbnail || null,
    readingTime: calculateReadingTime(content),
  };

  if (includeContent) post.content = content;

  return post;
}

export function getAllSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

// List views (homepage, /blog) never need the full markdown body, so it's
// excluded here to keep page payloads small even when a post embeds
// base64 images inline.
export function getAllPosts() {
  return getAllSlugs()
    .map((slug) => readPost(`${slug}.md`, { includeContent: false }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug) {
  return readPost(`${slug}.md`);
}
