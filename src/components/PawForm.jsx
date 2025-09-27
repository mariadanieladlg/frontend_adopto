import "./PawForm.css";
import { useState } from "react";

const API = "http://localhost:5005/paw";

export default function PawForm({ onCreated }) {
  const [form, setForm] = useState({
    status: "lost",
    species: "dog",
    title: "",
    description: "",
    city: "",
    country: "Netherlands",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSelectFile(e) {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    setPreview(file ? URL.createObjectURL(file) : "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setOk("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append("image", imageFile); // 👈 nombre del campo que espera multer

      const res = await fetch(API, { method: "POST", body: fd });

      // Leer siempre la respuesta como texto para ver los mensajes del backend
      const text = await res.text();
      if (!res.ok) {
        try {
          const json = JSON.parse(text);
          setErr(
            json.error ||
              json.message ||
              json.details ||
              text ||
              "Create failed"
          );
        } catch {
          setErr(text || "Create failed");
        }
        return;
      }

      const created = text ? JSON.parse(text) : {};
      setOk("Post created!");
      onCreated?.(created);

      // reset
      setForm({
        status: "lost",
        species: "dog",
        title: "",
        description: "",
        city: "",
        country: "Netherlands",
        contact_name: "",
        contact_phone: "",
        contact_email: "",
      });
      setImageFile(null);
      setPreview("");
    } catch (e) {
      setErr(e?.message || "Failed to create post. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="paw-form" onSubmit={handleSubmit}>
      <h2>Create a new report</h2>

      <div className="grid2">
        <label>
          <span>Status</span>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </label>

        <label>
          <span>Species</span>
          <select
            value={form.species}
            onChange={(e) => update("species", e.target.value)}
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </label>

        <label className="full">
          <span>Title</span>
          <input
            placeholder="Short headline..."
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
          />
        </label>

        <label className="full">
          <span>Description</span>
          <textarea
            placeholder="Describe the pet, last seen location, collar, temperament..."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            required
          />
        </label>

        <label>
          <span>City</span>
          <input
            placeholder="Amsterdam"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            required
          />
        </label>

        <label>
          <span>Country</span>
          <input
            placeholder="Netherlands"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
          />
        </label>

        <label>
          <span>Contact name (optional)</span>
          <input
            value={form.contact_name}
            onChange={(e) => update("contact_name", e.target.value)}
          />
        </label>

        <label>
          <span>Contact phone (optional)</span>
          <input
            value={form.contact_phone}
            onChange={(e) => update("contact_phone", e.target.value)}
          />
        </label>

        <label>
          <span>Contact email (optional)</span>
          <input
            type="email"
            value={form.contact_email}
            onChange={(e) => update("contact_email", e.target.value)}
          />
        </label>

        <label className="full">
          <span>Image (optional)</span>
          <input type="file" accept="image/*" onChange={onSelectFile} />
          {preview && (
            <div className="preview">
              <img src={preview} alt="preview" />
            </div>
          )}
        </label>
      </div>

      {err && <p className="msg error">{err}</p>}
      {ok && <p className="msg ok">{ok}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post report"}
      </button>
    </form>
  );
}
