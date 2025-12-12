import "./Blog.styles.css";
import blogData from "./blog.json";

function Blog() {
  return (
    <section id="blog" className="blog-section" aria-labelledby="blog-heading">
      <div className="blog-heading-container">
        <h2 id="blog-heading" className="blog-heading">
          Blog
        </h2>
        <p className="blog-intro">
          I publish articles on Medium twice a month (most months 😉) covering
          AI ethics, frontend strategy, and software engineering best practices.
        </p>
      </div>

      <div className="blog-grid">
        {blogData.map((post, index) => (
          <div key={index} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-description">{post.description}</p>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-btn"
            >
              Read Article
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blog;
