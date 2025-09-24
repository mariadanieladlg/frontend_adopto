import { useState } from "react";
import "./Account.css";
import { signin, register } from "../services/auth.services";

const Account = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null); // SAVE LOGGED USER

  // HANDLE SIGNIN
  const handleSignin = async (e) => {
    await signin({ loginInfo: email, password }, setUser, e);
  };

  // HANDLE REGISTER
  const handleRegister = async (e) => {
    await register({ username, email, password }, setActiveTab, e);
  };

  return (
    <div className="account-page">
      <h1 className="account-title">My Account</h1>

      {/* TABS */}
      <div className="account-tabs">
        <button
          className={activeTab === "signin" ? "active" : ""}
          onClick={() => setActiveTab("signin")}
        >
          Sign In
        </button>
        <button
          className={activeTab === "register" ? "active" : ""}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      {/* DINAMIC CONTENT */}
      <div className="account-content">
        {activeTab === "signin" ? (
          <form className="account-form" onSubmit={handleSignin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        ) : (
          <form className="account-form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Create Account</button>
          </form>
        )}
      </div>

      {/* Debug / Info */}
      {user && (
        <div className="account-user">
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Account;
