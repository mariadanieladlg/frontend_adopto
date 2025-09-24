import api from "../api";

// VERIFY USER
const verify = async (token, setUser) => {
  if (!token) {
    setUser(null);
    localStorage.removeItem("authToken");
    return;
  }
  try {
    const response = await api.get("/auth/verify"); // CORRECT ROUTE TO BACKEND
    if (response.status === 200) {
      setUser(response.data.payload); // PAYLOAD COMING FROM BACKEND
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
      verify(response.data.authToken, setUser); // UPDATE USER STATE
    }
  } catch (error) {
    console.log("Signin error:", error);
  }
};

// LOGOUT
const logout = async (setUser) => {
  localStorage.removeItem("authToken");
  setUser(null);
};

export { register, signin, logout, verify };
