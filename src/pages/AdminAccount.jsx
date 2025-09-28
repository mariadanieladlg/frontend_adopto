import { useState } from "react";
import SignInForm from "../components/SignInForm";
import RegisterForm from "../components/RegisterForm";
import "./Account.css";

const AdminAccount = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="account-page">
      <h2 className="account-title">Hi, Welcome to the admin area</h2>

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

      {/* DYNAMIC CONTENT */}
      <div className="account-content">
        {activeTab === "signin" ? (
          <SignInForm />
        ) : (
          <RegisterForm setToggle={setActiveTab} />
        )}
      </div>
    </div>
  );
};

export default AdminAccount;
