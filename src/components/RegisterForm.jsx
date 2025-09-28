import { useState } from "react";

const RegisterForm = ({ setToggle }) => {
  const [body, setBody] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(body, e);
    setToggle("signin"); // volta para aba Sign In depois de registrar
  };

  return (
    <div className="account-content">
      <form className="account-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Full Name</label>
        <input
          type="text"
          name="username"
          value={body.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
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

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterForm;
