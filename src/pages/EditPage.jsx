import { useState } from "react";
import { useAuthContext } from "../context/Auth.context";
import { updateUser } from "../lib/userService";
import "./EditPage.css";

const EditProfile = () => {
  const { user, setUser } = useAuthContext();
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(form);
      setUser(response.data.payload); // atualiza no contexto
      alert("Profile updated successfully ");
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <label>
        Username:
        <input name="username" value={form.username} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input name="email" value={form.email} onChange={handleChange} />
      </label>
      <button type="submit" className="lux-btn">
        Save
      </button>
    </form>
  );
};

export default EditProfile;
