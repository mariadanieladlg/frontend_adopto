// src/pages/Paw.jsx
import "./Paw.css";
import { useEffect, useState } from "react";
import PawCard from "../components/PawCard";
import PawForm from "../components/PawForm";

const API = "http://localhost:5005/paw";

export default function Paw() {
  // filtros
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [species, setSpecies] = useState(""); // "" | "dog" | "cat"
  const [status, setStatus] = useState(""); // "" | "lost" | "found"

  // datos UI
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  function buildUrl() {
    const url = new URL(API);
    if (q) url.searchParams.set("q", q);
    if (city) url.searchParams.set("city", city);
    if (species) url.searchParams.set("species", species);
    if (status) url.searchParams.set("status", status);
    return url.toString();
  }

  async function load() {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(buildUrl());
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json(); // { items, total, ... }
      setPosts(data.items || []);
      setTotal(data.total ?? (data.items ? data.items.length : 0));
    } catch {
      setErr("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, city, species, status]);

  // 👇 se llama cuando el formulario crea un post
  function handleCreated() {
    // refresca la lista (manteniendo filtros)
    load();
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="paw-page">
      <header className="paw-header">
        <h1>The Paw Patrol</h1>
        <p>
          Report lost or found pets, search by city (e.g., “Amsterdam”), and
          help reunite families.
        </p>
      </header>

      {/* Filters */}
      <section className="paw-filters">
        <input
          className="paw-input"
          placeholder="Search text (title/description/city)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          className="paw-input"
          placeholder="City (e.g., Amsterdam)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select
          className="paw-input"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        >
          <option value="">All species</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <select
          className="paw-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All status</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </section>

      {/* Layout: list + form */}
      <div className="paw-layout">
        <section className="paw-list">
          <div className="paw-list-head">
            <h2>Community posts</h2>
            {!loading && (
              <span className="paw-count">
                {total} result{total === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {err && <p className="paw-error">{err}</p>}
          {loading && <p className="paw-loading">Loading…</p>}
          {!loading && posts.length === 0 && (
            <p className="paw-empty">No posts yet. Be the first to report!</p>
          )}

          <div className="paw-list-stack">
            {posts.map((p) => (
              <PawCard key={p._id} post={p} />
            ))}
          </div>
        </section>

        <aside className="paw-form-wrapper">
          <PawForm onCreated={handleCreated} />
        </aside>
      </div>
    </div>
  );
}
