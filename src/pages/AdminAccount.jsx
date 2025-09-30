import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import "./Account.css";

const AdminAccount = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="account-page">
      <h2 className="account-title">Admin Account</h2>

      {/* TABS */}
      <div className="account-tabs">
        <button
          className={activeTab === "login" ? "active" : ""}
          onClick={() => setActiveTab("login")}
        >
          Sign In
        </button>
        <button
          className={activeTab === "signup" ? "active" : ""}
          onClick={() => setActiveTab("signup")}
        >
          Register
        </button>
      </div>

      {/* DYNAMIC CONTENT */}
      <div className="account-content">
        {activeTab === "login" ? (
          <LoginForm />
        ) : (
          <SignupForm setToggle={setActiveTab} />
        )}
      </div>
    </div>
  );
};

export default AdminAccount;
