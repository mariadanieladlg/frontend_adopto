import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home.jsx";
import CatKittens from "./pages/CatKittens";
import DogPuppies from "./pages/DogPuppies";
import ProfilePage from "./pages/ProfilePage";
import AdminAccount from "./pages/AdminAccount";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import PetCardDetails from "./components/PetCardDetails.jsx";
import Paw from "./pages/Paw";
import { EditPage } from "./pages/EditPage.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cat-kittens" element={<CatKittens />} />
        <Route path="/dog-puppies" element={<DogPuppies />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/admin" element={<AdminAccount />} />
        <Route path="/pets/:id" element={<PetCardDetails />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/paw" element={<Paw />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
