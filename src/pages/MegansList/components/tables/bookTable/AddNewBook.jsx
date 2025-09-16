// src/components/tables/bookTable/AddNewBook.jsx
import { useState } from "react";
import supabase from "../../../../../client";
import "../styles.css";

function AddNewBook({ userId, onClose, onAdded }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    owned: "false",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Required field check
    if (!form.title || !form.author || form.owned === "") {
      alert("Title, Author, and Owned are required.");
      return;
    }

    try {
      setSubmitting(true);
      const { data, error } = await supabase
        .from("Books")
        .insert([
          {
            title: form.title,
            author: form.author,
            description: form.description || null,
            owned: form.owned === "true",
            user: userId,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      onAdded(data);
      onClose();
    } catch (err) {
      alert("Error adding book: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content add-wine-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">Add New Book</h2>
        <form onSubmit={handleSubmit} className="wine-form">
          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={form.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author *"
            value={form.author}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <select name="owned" value={form.owned} onChange={handleChange}>
            <option value="">Select Owned *</option>
            <option value="true">Owned</option>
            <option value="false">Not Owned</option>
          </select>

          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewBook;
