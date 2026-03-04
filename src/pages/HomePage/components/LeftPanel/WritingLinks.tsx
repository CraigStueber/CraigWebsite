import React from "react";
import "./WritingLinks.styles.css";

const articles = [
  {
    title: "Why Most AI Failures Aren't Model Failures",
    url: "https://medium.com/@craigstueber/why-most-ai-failures-arent-model-failures-they-re-integration-failures-fdec486f67ba",
  },
  {
    title: "How to Actually Implement AI Agents in the Real World",
    url: "https://medium.com/@craigstueber/how-to-actually-implement-ai-agents-in-the-real-world-1292d6ecc79d",
  },
];

export default function WritingLinks() {
  return (
    <div className="writing-links">
      <span className="writing-heading">Writing</span>
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
