// src/components/tables/wineTable/AddNewWine.jsx
import { useState } from "react";
import supabase from "../../../../../client";
import "../styles.css";

function AddNewWine({ userId, onClose, onAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    rating: "",
    winery: "",
    type: "",
    year: "",
    region: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Required field check
    if (!form.name || !form.type || !form.year) {
      alert("Name, Type, and Year are required.");
      return;
    }

    try {
      setSubmitting(true);
      const { data, error } = await supabase
        .from("Wine")
        .insert([
          {
            name: form.name,
            description: form.description || null,
            rating: form.rating ? parseInt(form.rating, 10) : null,
            winery: form.winery || "",
            type: form.type,
            year: form.year ? parseInt(form.year, 10) : null,
            region: form.region || null,
            user: userId,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      onAdded(data);
      onClose();
    } catch (err) {
      alert("Error adding wine: " + err.message);
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
        <h2 className="modal-title">Add New Wine</h2>
        <form onSubmit={handleSubmit} className="wine-form">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="winery"
            placeholder="Winery"
            value={form.winery}
            onChange={handleChange}
          />
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={form.region}
            onChange={handleChange}
          />
          <input
            type="number"
            name="year"
            placeholder="Year *"
            value={form.year}
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Type *"
            value={form.type}
            onChange={handleChange}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1–10)"
            value={form.rating}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

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

export default AddNewWine;
