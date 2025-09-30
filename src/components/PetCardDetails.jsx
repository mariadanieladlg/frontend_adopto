import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./PetCardDetails.css";
import axios from "axios";

const API = "http://localhost:5005/pets";

function formatAge(ageMonths) {
  if (!Number.isFinite(ageMonths)) return null;
  const y = Math.floor(ageMonths / 12);
  const m = ageMonths % 12;
  const parts = [];
  if (y) parts.push(`${y} ${y === 1 ? "yr" : "yrs"}`);
  if (m) parts.push(`${m} mo`);
  return parts.join(" ");
}

export default function PetCardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(`${API}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (alive) setPet(data);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => (alive = false);
  }, [id]);

  const age = useMemo(
    () => formatAge(pet?.age_months ?? pet?.ageMonths),
    [pet]
  );
  const location = useMemo(
    () =>
      [
        pet?.location_city ?? pet?.locationCity,
        pet?.location_country ?? pet?.locationCountry,
      ]
        .filter(Boolean)
        .join(", "),
    [pet]
  );

  const houseTrained = pet?.houseTrained ?? pet?.house_trained;
  const spayedNeutered = pet?.spayedNeutered ?? pet?.spayed_neutered;
  const goodDogs = pet?.goodWith?.dogs ?? pet?.good_with_dogs;
  const goodCats = pet?.goodWith?.cats ?? pet?.good_with_cats;
  const goodKids = pet?.goodWith?.kids ?? pet?.good_with_kids;

  if (loading) {
    return (
      <div className="petdetails-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p>Loading pet details…</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="petdetails-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="error-title">Could not load pet</h2>
        <p className="error-msg">{err}</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="petdetails-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p>Pet not found.</p>
      </div>
    );
  }
  async function handleDelete() {
    console.log("Delete click");
    try {
      const response = await axios.delete(`http://localhost:5005/pets/${id}`);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="petdetails-page">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <Link to="/" className="link">
          All pets
        </Link>
      </div>

      <div className="details-grid">
        {/* Media / gallery */}
        <section className="card">
          <div className="hero">
            <img
              src={pet.images?.[0] || "/placeholder-pet.jpg"}
              alt={pet.name}
            />
          </div>
          {Array.isArray(pet.images) && pet.images.length > 1 && (
            <div className="thumbs">
              {pet.images.slice(1, 5).map((src, i) => (
                <img key={i} src={src} alt={`${pet.name} ${i + 2}`} />
              ))}
            </div>
          )}
          {pet.video && (
            <div className="video">
              <video src={pet.video} controls />
            </div>
          )}
        </section>

        {/* Summary */}
        <aside className="card">
          <h1 className="title">{pet.name}</h1>
          <p className="subtitle">
            {age ? `${age} • ` : ""}
            {pet.sex}
            {pet.life_stage ? ` • ${pet.life_stage}` : ""}
          </p>
          {location && <p className="muted">{location}</p>}

          <div className="badges">
            {pet.breed && <span className="badge">{pet.breed}</span>}
            {pet.species && <span className="badge">{pet.species}</span>}
            {pet.color && <span className="badge">{pet.color}</span>}
            {pet.size && <span className="badge">{pet.size}</span>}
            {Number.isFinite(pet.weight_kg) && (
              <span className="badge">{pet.weight_kg} kg</span>
            )}
            {Number.isFinite(pet.energy_level) && (
              <span className="badge">Energy {pet.energy_level}/10</span>
            )}
            <span className="badge">
              {houseTrained ? "House trained" : "Not house trained"}
            </span>
          </div>

          <div className="status">
            <span
              className={`pill ${pet.status === "available" ? "ok" : "warn"}`}
            >
              {pet.status || "available"}
            </span>
            {Number.isFinite(pet.adoption_fee_eur) && (
              <span className="fee">€{pet.adoption_fee_eur}</span>
            )}
          </div>

          <div className="cta">
            <div className="contact-info">
              {pet.contact?.email && (
                <div className="row">
                  <span className="label">Email</span>
                  <span className="value">
                    <a
                      className="contact-link"
                      href={`mailto:${pet.contact.email}?subject=Adoption inquiry: ${pet.name}`}
                    >
                      {pet.contact.email}
                    </a>
                  </span>
                </div>
              )}

              {pet.contact?.phone && (
                <div className="row">
                  <span className="label">Phone</span>
                  <span className="value">
                    <a
                      className="contact-link"
                      href={`tel:${pet.contact.phone}`}
                    >
                      {pet.contact.phone}
                    </a>
                  </span>
                </div>
              )}
            </div>

            <div className="actions">
              <button className="btn danger" onClick={handleDelete}>
                Delete
              </button>
              <Link className="btn" to={`/edit/${id}`}>
                Edit
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* About */}
      <section className="card wide">
        {pet.description && (
          <>
            <h2>About</h2>
            <p className="desc">{pet.description}</p>
          </>
        )}

        <div className="cols">
          <div>
            <h3>Basics</h3>
            <div className="row">
              <span className="label">Species</span>
              <span className="value">{pet.species}</span>
            </div>
            <div className="row">
              <span className="label">Life stage</span>
              <span className="value">{pet.life_stage}</span>
            </div>
            <div className="row">
              <span className="label">Sex</span>
              <span className="value">{pet.sex}</span>
            </div>
            <div className="row">
              <span className="label">Age</span>
              <span className="value">{age || "—"}</span>
            </div>
            <div className="row">
              <span className="label">Breed</span>
              <span className="value">{pet.breed || "—"}</span>
            </div>
            <div className="row">
              <span className="label">Color</span>
              <span className="value">{pet.color || "—"}</span>
            </div>
            <div className="row">
              <span className="label">Location</span>
              <span className="value">{location || "—"}</span>
            </div>
          </div>

          <div>
            <h3>Health</h3>
            <div className="row">
              <span className="label">Microchipped</span>
              <span className="value">
                {pet.microchipped ? "Yes ✅" : "No ❌"}
              </span>
            </div>
            <div className="row">
              <span className="label">Spayed/Neutered</span>
              <span className="value">
                {spayedNeutered ? "Yes ✅" : "No ❌"}
              </span>
            </div>
            <div className="row">
              <span className="label">Dewormed</span>
              <span className="value">{pet.dewormed ? "Yes ✅" : "No ❌"}</span>
            </div>
            <div className="row">
              <span className="label">Vaccinated</span>
              <span className="value">
                {pet.vaccinated?.length ? pet.vaccinated.join(", ") : "—"}
              </span>
            </div>
          </div>

          <div>
            <h3>Compatibility</h3>
            <div className="row">
              <span className="label">Good with dogs</span>
              <span className="value">{goodDogs ? "Yes ✅" : "No ❌"}</span>
            </div>
            <div className="row">
              <span className="label">Good with cats</span>
              <span className="value">{goodCats ? "Yes ✅" : "No ❌"}</span>
            </div>
            <div className="row">
              <span className="label">Good with kids</span>
              <span className="value">{goodKids ? "Yes ✅" : "No ❌"}</span>
            </div>
            <div className="row">
              <span className="label">Energy level</span>
              <span className="value">
                {Number.isFinite(pet.energy_level)
                  ? `${pet.energy_level}/10`
                  : "—"}
              </span>
            </div>
          </div>
        </div>

        {(pet.tags?.length || pet.shelter_id || pet.posted_at) && (
          <div className="meta">
            {pet.tags?.length ? (
              <div className="taglist">
                {pet.tags.map((t, i) => (
                  <span key={i} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="meta-inline">
              {pet.shelter_id && (
                <span className="muted">Shelter ID: {pet.shelter_id}</span>
              )}
              {pet.posted_at && (
                <span className="muted">
                  Posted: {new Date(pet.posted_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
