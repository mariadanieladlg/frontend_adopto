import { useState } from "react";
import { useAuthContext } from "../context/Auth.context";

const LoginForm = () => {
  const { login } = useAuthContext();
  const [body, setBody] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="account-content">
      <form className="account-form" onSubmit={(e) => login(body, e)}>
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
