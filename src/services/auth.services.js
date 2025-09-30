import api from "./api";

// VERIFY USER
const verify = async (token, setUser) => {
  if (!token) {
    setUser(null);
    localStorage.removeItem("authToken");
    return;
  }
  try {
    const response = await api.get("/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      setUser(response.data.payload);
    } else if (response.status === 304) {
      const cachedUser = JSON.parse(localStorage.getItem("userData"));
      setUser(cachedUser || null);
    }
  } catch (error) {
    console.log("Verify error:", error);
    setUser(null);
    localStorage.removeItem("authToken");
  }
};
// REGISTER
const register = async (body, setToggle, e) => {
  if (e) e.preventDefault();
  try {
    const response = await api.post("/auth/register", body); // CORRECT ROUTE TO BACKEND
    if (response.status === 201 || response.status === 200) {
      setToggle((prev) => !prev); // STATE TO SIGNIN TAB
    }
  } catch (error) {
    console.log("Registering error:", error);
  }
};

// SIGNIN
const signin = async (body, setUser, e) => {
  if (e) e.preventDefault();
  try {
    const response = await api.post("/auth/signin", body); // CORRECT ROUTE TO BACKEND
    if (response.status === 200 || response.status === 201) {
      localStorage.setItem("authToken", response.data.authToken);
      await verify(response.data.authToken, setUser); // UPDATE USER STATE
      return true;
    }
  } catch (error) {
    console.log("Signin error:", error);
    return false;
  }
};

// LOGOUT
const logout = async (setUser) => {
  localStorage.removeItem("authToken");
  setUser(null);
};

export { register, signin, logout, verify };
