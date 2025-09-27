import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import "./PetListPage.css";

const API = "http://localhost:5005/pets";

const DogPuppies = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDogs() {
      try {
        const res = await fetch(`${API}?species=dog`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setDogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching dogs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDogs();
  }, []);

  return (
    <div className="dog-puppies-page">
      <h2 className="dog-puppies-title">Dogs & Puppies</h2>

      {loading ? (
        <p>Loading...</p>
      ) : dogs.length === 0 ? (
        <p>No dogs found.</p>
      ) : (
        <div className="pet-grid">
          {dogs.map((dog) => (
            <PetCard key={dog._id || dog.id} pet={dog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DogPuppies;
