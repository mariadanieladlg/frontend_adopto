import { useAuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, logout, deleteAccount } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      await deleteAccount(user._id);
      navigate("/account");
    }
  };

  return (
    <div className="profile-page">
      {/* HEADER */}
      <header className="profile-header">
        <h2>Welcome to your Profile</h2>
      </header>

      {/* CONTENT */}
      <div className="profile-layout">
        {/* LEFT COLUMN */}
        <section className="profile-details">
          <ul>
            <li>
              <strong>Name:</strong>{" "}
              {user?.username ? ` ${user.username}` : "No name available"}
            </li>
            <li>
              <strong>Email:</strong>{" "}
              {user?.email ? ` ${user.email}` : "No email available"}
            </li>
          </ul>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="profile-actions">
          <h2>Quick Actions</h2>
          <button className="lux-btn" onClick={() => navigate("/edit")}>
            Edit
          </button>
          <button className="lux-btn danger" onClick={handleLogout}>
            Logout
          </button>
          <button className="lux-btn danger" onClick={handleDelete}>
            Delete Account
          </button>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
