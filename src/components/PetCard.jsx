import "./PetCard.css";

const PetCard = ({ pet }) => {
  const years = Math.floor(pet.age_months / 12);
  const months = pet.age_months % 12;
  const ageDisplay =
    years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : `${months} mo`;

  return (
    <div className="pet-card">
      <img
        src={pet.images?.[0] || "/placeholder-pet.jpg"}
        alt={pet.name}
        className="pet-card-image"
      />
      <div className="pet-card-info">
        <h3 className="pet-card-name">{pet.name}</h3>
        <p className="pet-card-meta">
          {ageDisplay} • {pet.sex}
        </p>
      </div>
    </div>
  );
};

export default PetCard;
