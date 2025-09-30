import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditPage.css";

const API = "http://localhost:5005/pets";

function normalizePet(raw) {
  if (!raw) return null;
  return {
    _id: raw._id || raw.id || "",
    name: raw.name || "",
    species: raw.species || "",
    life_stage: raw.life_stage ?? raw.lifeStage ?? "",
    sex: raw.sex || "",
    age_months: Number.isFinite(raw.age_months)
      ? raw.age_months
      : raw.ageMonths ?? "",
    breed: raw.breed || "",
    color: raw.color || "",
    size: raw.size || "",
    weight_kg: Number.isFinite(raw.weight_kg)
      ? raw.weight_kg
      : raw.weightKg ?? "",
    location_city: raw.location_city ?? raw.locationCity ?? "",
    location_country: raw.location_country ?? raw.locationCountry ?? "",
    microchipped: !!raw.microchipped,
    microchip_id: raw.microchip_id ?? raw.microchipId ?? "",
    vaccinated: Array.isArray(raw.vaccinated) ? raw.vaccinated : [],
    dewormed: !!raw.dewormed,
    spayed_neutered: raw.spayed_neutered ?? raw.spayedNeutered ?? false,
    good_with_dogs: raw.good_with_dogs ?? raw.goodWith?.dogs ?? false,
    good_with_cats: raw.good_with_cats ?? raw.goodWith?.cats ?? false,
    good_with_kids: raw.good_with_kids ?? raw.goodWith?.kids ?? false,
    energy_level: Number.isFinite(raw.energy_level) ? raw.energy_level : "",
    house_trained: raw.house_trained ?? raw.houseTrained ?? false,
    description: raw.description || "",
    images: Array.isArray(raw.images) ? raw.images : [],
    video: raw.video || "",
    status: raw.status || "available",
    adoption_fee_eur: Number.isFinite(raw.adoption_fee_eur)
      ? raw.adoption_fee_eur
      : "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    shelter_id: raw.shelter_id ?? raw.shelterId ?? "",
    posted_at: raw.posted_at || raw.postedAt || "",
  };
}

/** Build the snake_case payload your backend expects */
function buildPayload(state) {
  return {
    name: state.name,
    species: state.species,
    life_stage: state.life_stage || null,
    sex: state.sex || null,
    age_months: state.age_months === "" ? null : Number(state.age_months),
    breed: state.breed || null,
    color: state.color || null,
    size: state.size || null,
    weight_kg: state.weight_kg === "" ? null : Number(state.weight_kg),
    location_city: state.location_city || null,
    location_country: state.location_country || null,
    microchipped: !!state.microchipped,
    microchip_id: state.microchip_id || null,
    vaccinated: state.vaccinated || [],
    dewormed: !!state.dewormed,
    spayed_neutered: !!state.spayed_neutered,
    good_with_dogs: !!state.good_with_dogs,
    good_with_cats: !!state.good_with_cats,
    good_with_kids: !!state.good_with_kids,
    energy_level: state.energy_level === "" ? null : Number(state.energy_level),
    house_trained: !!state.house_trained,
    description: state.description || "",
    images: state.images || [],
    video: state.video || "",
    status: state.status || "available",
    adoption_fee_eur:
      state.adoption_fee_eur === "" ? null : Number(state.adoption_fee_eur),
    tags: state.tags || [],
    shelter_id: state.shelter_id || null,
    posted_at: state.posted_at || null,
  };
}

/** Helpers to convert comma-separated inputs <-> arrays */
const toList = (str) =>
  (str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
const fromList = (arr) => (Array.isArray(arr) ? arr.join(", ") : "");

export const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch current pet data
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API}/${id}`);
        if (!alive) return;
        setPet(normalizePet(res.data));
      } catch (e) {
        setError(e?.response?.data?.message || e.message || "Failed to load.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  // Controlled field handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((p) => ({ ...p, [name]: value }));
  };
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setPet((p) => ({ ...p, [name]: value === "" ? "" : value })); // keep empty string if cleared
  };
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setPet((p) => ({ ...p, [name]: checked }));
  };

  // Derived values for textareas/inputs (comma-separated)
  const vaccinatedCSV = useMemo(() => fromList(pet?.vaccinated), [pet]);
  const imagesCSV = useMemo(() => fromList(pet?.images), [pet]);
  const tagsCSV = useMemo(() => fromList(pet?.tags), [pet]);

  const handleVaccinatedCSV = (e) =>
    setPet((p) => ({ ...p, vaccinated: toList(e.target.value) }));
  const handleImagesCSV = (e) =>
    setPet((p) => ({ ...p, images: toList(e.target.value) }));
  const handleTagsCSV = (e) =>
    setPet((p) => ({ ...p, tags: toList(e.target.value) }));

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pet) return;
    try {
      setSaving(true);
      setError("");
      const payload = buildPayload(pet);
      // Use PUT or PATCH according to your backend; here we use PUT
      await axios.put(`${API}/${id}`, payload);
      navigate(`/pets/${id}`);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="editpage">
        <div className="edit-topbar">
          <Link to={-1}>← Back</Link>
          <Link to="/">All pets</Link>
        </div>
        <p>Loading…</p>
      </div>
    );
  }

  if (error && !pet) {
    return (
      <div className="editpage">
        <div className="edit-topbar">
          <Link to={-1}>← Back</Link>
          <Link to="/">All pets</Link>
        </div>
        <h2>Could not load pet</h2>
        <p className="err">{error}</p>
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="editpage">
      <div className="edit-topbar">
        <button className="linklike" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <Link to={`/pets/${id}`} className="linklike">
          View details
        </Link>
        <Link to="/" className="linklike">
          All pets
        </Link>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        <h1>Edit: {pet.name || "Pet"}</h1>
        {error && <div className="alert">{error}</div>}

        {/* --- Basics --- */}
        <fieldset>
          <legend>Basics</legend>
          <div className="grid">
            <label>
              <span>Name</span>
              <input
                name="name"
                value={pet.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span>Species</span>
              <input
                name="species"
                value={pet.species}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>Life stage</span>
              <input
                name="life_stage"
                value={pet.life_stage}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>Sex</span>
              <select name="sex" value={pet.sex} onChange={handleChange}>
                <option value="">—</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </label>
            <label>
              <span>Age (months)</span>
              <input
                name="age_months"
                type="number"
                min="0"
                value={pet.age_months}
                onChange={handleNumberChange}
              />
            </label>
            <label>
              <span>Breed</span>
              <input name="breed" value={pet.breed} onChange={handleChange} />
            </label>
            <label>
              <span>Color</span>
              <input name="color" value={pet.color} onChange={handleChange} />
            </label>
            <label>
              <span>Size</span>
              <input name="size" value={pet.size} onChange={handleChange} />
            </label>
            <label>
              <span>Weight (kg)</span>
              <input
                name="weight_kg"
                type="number"
                step="0.1"
                min="0"
                value={pet.weight_kg}
                onChange={handleNumberChange}
              />
            </label>
          </div>
        </fieldset>

        {/* --- Location --- */}
        <fieldset>
          <legend>Location</legend>
          <div className="grid">
            <label>
              <span>City</span>
              <input
                name="location_city"
                value={pet.location_city}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>Country</span>
              <input
                name="location_country"
                value={pet.location_country}
                onChange={handleChange}
              />
            </label>
          </div>
        </fieldset>

        {/* --- Health --- */}
        <fieldset>
          <legend>Health</legend>
          <div className="grid">
            <label className="check">
              <input
                type="checkbox"
                name="microchipped"
                checked={pet.microchipped}
                onChange={handleCheck}
              />
              <span>Microchipped</span>
            </label>
            <label>
              <span>Microchip ID</span>
              <input
                name="microchip_id"
                value={pet.microchip_id}
                onChange={handleChange}
              />
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="dewormed"
                checked={pet.dewormed}
                onChange={handleCheck}
              />
              <span>Dewormed</span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="spayed_neutered"
                checked={pet.spayed_neutered}
                onChange={handleCheck}
              />
              <span>Spayed/Neutered</span>
            </label>
            <label>
              <span>Vaccinated (comma separated)</span>
              <input value={vaccinatedCSV} onChange={handleVaccinatedCSV} />
            </label>
          </div>
        </fieldset>

        {/* --- Compatibility / Behavior --- */}
        <fieldset>
          <legend>Compatibility</legend>
          <div className="grid">
            <label className="check">
              <input
                type="checkbox"
                name="good_with_dogs"
                checked={pet.good_with_dogs}
                onChange={handleCheck}
              />
              <span>Good with dogs</span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="good_with_cats"
                checked={pet.good_with_cats}
                onChange={handleCheck}
              />
              <span>Good with cats</span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="good_with_kids"
                checked={pet.good_with_kids}
                onChange={handleCheck}
              />
              <span>Good with kids</span>
            </label>
            <label>
              <span>Energy level (0-10)</span>
              <input
                name="energy_level"
                type="number"
                min="0"
                max="10"
                value={pet.energy_level}
                onChange={handleNumberChange}
              />
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="house_trained"
                checked={pet.house_trained}
                onChange={handleCheck}
              />
              <span>House trained</span>
            </label>
          </div>
        </fieldset>

        {/* --- Media & Meta --- */}
        <fieldset>
          <legend>Media & Meta</legend>
          <div className="grid">
            <label>
              <span>Images (comma separated URLs)</span>
              <textarea
                rows={2}
                value={imagesCSV}
                onChange={handleImagesCSV}
                placeholder="https://..., https://..."
              />
            </label>
            <label>
              <span>Video URL</span>
              <input name="video" value={pet.video} onChange={handleChange} />
            </label>
            <label>
              <span>Status</span>
              <select name="status" value={pet.status} onChange={handleChange}>
                <option value="available">available</option>
                <option value="pending">pending</option>
                <option value="adopted">adopted</option>
              </select>
            </label>
            <label>
              <span>Adoption fee (€)</span>
              <input
                name="adoption_fee_eur"
                type="number"
                min="0"
                step="1"
                value={pet.adoption_fee_eur}
                onChange={handleNumberChange}
              />
            </label>
            <label>
              <span>Tags (comma separated)</span>
              <input value={tagsCSV} onChange={handleTagsCSV} />
            </label>
            <label>
              <span>Shelter ID</span>
              <input
                name="shelter_id"
                value={pet.shelter_id}
                onChange={handleChange}
              />
            </label>
          </div>
        </fieldset>

        {/* --- Description --- */}
        <label className="block">
          <span>Description</span>
          <textarea
            name="description"
            rows={5}
            value={pet.description}
            onChange={handleChange}
          />
        </label>

        {/* --- Actions --- */}
        <div className="actions">
          <button
            type="button"
            className="btn ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="btn primary" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
