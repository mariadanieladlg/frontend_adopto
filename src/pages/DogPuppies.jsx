import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import "./DogPuppies.css";

const API = "http://localhost:4000/pets";

const DogPuppies = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}?species=dog`)
      .then((res) => res.json())
      .then((data) => {
        setDogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dogs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dog-puppies-page">
      <h2 className="dog-puppies-title">Dogs & Puppies</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pet-grid">
          {dogs.map((dog) => (
            <PetCard key={dog.id} pet={dog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DogPuppies;
