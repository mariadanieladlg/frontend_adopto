import { useState } from "react";
import "./Account.css";

const Account = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="account-page">
      <h1 className="account-title">My Account</h1>

      {/* TABS*/}
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
          <form className="account-form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign In</button>
          </form>
        ) : (
          <form className="account-form">
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Account;
