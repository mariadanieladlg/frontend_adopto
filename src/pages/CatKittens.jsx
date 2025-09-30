import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import "./PetListPage.css";

const API = "http://localhost:5005/pets";

const CatKittens = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCats() {
      try {
        const res = await fetch(`${API}?species=cat`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCats(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching cats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCats();
  }, []);

  return (
    <div className="cat-kittens-page">
      <h2 className="cat-kittens-title">Cats & Kittens</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cats.length === 0 ? (
        <p>No cats found.</p>
      ) : (
        <div className="pet-grid">
          {cats.map((cat) => (
            <PetCard key={cat._id || cat.id} pet={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatKittens;
