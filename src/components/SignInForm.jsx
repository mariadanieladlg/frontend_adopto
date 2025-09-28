import { useState } from "react";

const LoginForm = ({ setToggle }) => {
  const [body, setBody] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(body, e);
  };

  return (
    <div className="account-content">
      <form className="account-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={body.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={body.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginForm;
