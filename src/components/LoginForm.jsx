import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth.context";

const LoginForm = () => {
  const { login } = useAuthContext();
  const [body, setBody] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // render to home

  const handleChange = (e) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="account-content">
      <form
        className="account-form"
        onSubmit={async (e) => {
          const ok = await login(body, e);
          if (ok) navigate("/");
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          className="input-field"
          type="email"
          name="email"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          className="input-field"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <button className="btn-submit" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
