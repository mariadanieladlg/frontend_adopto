import { useEffect, useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken"); // waits a token to get user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // GET USER INFO
        const userRes = await fetch("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error("Error on loading profile");
        const userData = await userRes.json();
        const normalizedUser =
          userData.payload?.user ||
          userData.payload ||
          userData.user ||
          userData;

        setUser(normalizedUser);

        // GET FAVORITES
        const favRes = await fetch("/api/users/profile/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (favRes.ok) {
          const favData = await favRes.json();
          setFavorites(favData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      {/* PROFILE */}
      <div className="profile-card">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      {/* FAVORITES */}
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((pet) => (
            <div key={pet.id} className="favorite-card">
              <img src={pet.image} alt={pet.name} />
              <p>{pet.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites yet 🐾</p>
      )}
    </div>
  );
};

export default ProfilePage;
