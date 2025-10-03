import { Link } from "react-router-dom";
import "./PetCard.css";

const PetCard = ({ pet }) => {
  const ageMonths = pet?.age_months ?? pet?.ageMonths ?? 0;
  const years = Math.floor(ageMonths / 12);
  const months = ageMonths % 12;
  const ageDisplay =
    years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : `${months} mo`;

  const rawImage = pet?.image ?? pet?.images;
  let cover = "/placeholder-pet.jpg";

  if (Array.isArray(rawImage)) {
    cover = rawImage[0] || cover;
  } else if (typeof rawImage === "string" && rawImage.trim()) {
    cover = rawImage.trim();
  }

  return (
    <div className="pet-card">
      <img
        src={cover}
        alt={pet?.name || "Pet"}
        className="pet-card-image"
        onError={(e) => {
          e.currentTarget.src = "/placeholder-pet.jpg";
        }}
      />
      <div className="pet-card-info">
        <h3 className="pet-card-name">
          <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
        </h3>
        <p className="pet-card-meta">
          {ageDisplay} • {pet.sex}
        </p>
      </div>
    </div>
  );
};

export default PetCard;
