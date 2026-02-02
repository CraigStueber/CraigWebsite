import React, { useState } from "react";
import supabase from "../../client.js";
import "./Contact.styles.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: form.name,
        email: form.email,
        message: form.message,
        source: "portfolio",
        user_agent: navigator.userAgent,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }
  }

  return (
    <div className="contact-page">
      <h1>Contact Craig</h1>
      <p>
        This form sends a message directly to Craig. He reads these personally.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send Message"}
        </button>

        {status === "success" && (
          <p className="success">Message sent. Thank you.</p>
        )}
        {status === "error" && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
      </form>
      <div className="contact-alt">
        <h2>Other Ways to Reach Me</h2>

        <p>
          You can also reach me via email at{" "}
          <a href="mailto:craigstueber@gmail.com">craigstueber@gmail.com</a>
        </p>

        <p>
          LinkedIn{" "}
          <a
            href="https://www.linkedin.com/in/craigstueber"
            target="_blank"
            rel="noopener noreferrer"
          >
            Craig Stueber
          </a>
        </p>
        <p className="contact-alt-aside">
          Second star to the right, and straight on till morning.
        </p>
      </div>
    </div>
  );
}
