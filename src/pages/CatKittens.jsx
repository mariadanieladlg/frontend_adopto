import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import "./CatKittens.css";

const API = "http://localhost:5005/pets";

const CatKittens = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}?species=cat`)
      .then((res) => res.json())
      .then((data) => {
        setCats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cats:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="cat-kittens-page">
      <h2 className="cat-kittens-title">Cats & Kittens</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pet-grid">
          {cats.map((cat) => (
            <PetCard key={cat.id} pet={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatKittens;
