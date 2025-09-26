import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <- use o hook do contexto
import "./Account.css";

const Account = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // volta pra origem ou Home

  const { signIn, signUp, user } = useAuth();

  // HANDLE SIGNIN
  const handleSignin = async (e) => {
    e.preventDefault();
    const { ok, error } = await signIn({ loginInfo: email, password });
    if (ok) {
      setPassword("");
      navigate(from, { replace: true }); // Home ou rota originalmente requisitada
    } else {
      console.error("Signin failed:", error);
      // aqui você pode setar um estado de erro para mostrar na UI
    }
  };

  // HANDLE REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    const { ok, error } = await signUp({ username, email, password });
    if (ok) {
      // após registrar, volte para a aba de Sign In
      setActiveTab("signin");
      // opcional: limpar campos
      setPassword("");
    } else {
      console.error("Register failed:", error);
      // idem: exibir erro na UI se quiser
    }
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
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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
              autoComplete="name"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button type="submit">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Account;
