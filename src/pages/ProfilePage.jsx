import "./ProfilePage.css";

const ProfilePage = ({ user }) => {
  return (
    <div className="profile-page">
      {/* HEADER */}
      <header className="profile-header">
        <div className="profile-info">
          <h1>{user?.username || "Guest User"}</h1>
          <p className="profile-bio">
            {user?.bio || "Welcome to your profile"}
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <div className="profile-layout">
        {/* LEFT COLUMN */}
        <section className="profile-details">
          <h2>Account Details</h2>
          <ul>
            <li>
              <strong>Email:</strong> {user?.email}
            </li>
            <li>
              <strong>Joined:</strong>{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </li>
            <li>
              <strong>Favorites:</strong> {user?.favorites?.length || 0}
            </li>
          </ul>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="profile-actions">
          <h2>Quick Actions</h2>
          <button className="lux-btn">Edit Profile</button>
          <button className="lux-btn">My Pets</button>
          <button className="lux-btn danger">Logout</button>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
