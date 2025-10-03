import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth.context";

const SignupForm = ({ setToggle }) => {
  const { signup } = useAuthContext();
  const [body, setBody] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="account-content">
      <form
        className="account-form"
        onSubmit={async (e) => {
          const ok = await signup(body, setToggle, e);
          if (ok) navigate("/profile");
        }}
      >
        <label htmlFor="username">Full Name</label>
        <input type="text" name="username" onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange} />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignupForm;
