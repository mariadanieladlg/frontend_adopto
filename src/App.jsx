import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home.jsx";
import CatKittens from "./pages/CatKittens";
import DogPuppies from "./pages/DogPuppies";
import Account from "./pages/Account.jsx";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cat-kittens" element={<CatKittens />} />
        <Route path="/dog-puppies" element={<DogPuppies />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
        {/* Protected Routes*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
