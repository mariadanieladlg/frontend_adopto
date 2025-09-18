import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar.jsx";
import Footer from "./components/Footer";

import Home from "./pages/Home.jsx";
import CatKittens from "./pages/CatKittens.jsx";
import DogPuppies from "./pages/DogPuppies.jsx";
import Account from "./pages/Account.jsx";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";

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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
