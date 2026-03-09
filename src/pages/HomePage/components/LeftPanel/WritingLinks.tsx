import React from "react";
import "./WritingLinks.styles.css";

const articles = [
  {
    title: "Why Most AI Failures Aren't Model Failures",
    url: "https://medium.com/@craigstueber/why-most-ai-failures-arent-model-failures-they-re-integration-failures-fdec486f67ba",
  },
  {
    title: "Security Reviews Don’t Catch AI Failures. Here’s Why.",
    url: "https://medium.com/@craigstueber/security-reviews-dont-catch-ai-failures-here-s-why-2dfb2fb39aa4",
  },
];

export default function WritingLinks() {
  return (
    <div className="writing-links">
      <span className="writing-heading">Writings</span>
      <div className="writing-list">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="writing-article-link"
          >
            {article.title}
          </a>
        ))}
        <a
          href="https://medium.com/@craigstueber"
          target="_blank"
          rel="noopener noreferrer"
          className="writing-more-link"
        >
          More on Medium →
        </a>
      </div>
    </div>
  );
}
