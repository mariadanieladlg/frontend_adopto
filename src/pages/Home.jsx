import "./Home.css";
import { Link } from "react-router-dom";
import petPhoto1 from "../assets/photo1.png";
import petPhoto4 from "../assets/photo4.png";
import petPhoto5 from "../assets/photo5.png";

const Home = () => {
  const handleClick = (e) => {
    e.currentTarget.classList.add("luxury-click");
    setTimeout(() => navigate("/cat-kittens"), 500);
  };

  return (
    <section className="home">
      <h1 className="home-title">Home is Where the Paw Is</h1>

      <div className="photo-grid">
        <Link to="/dog-puppies">
          <img src={petPhoto5} alt="Pet 5" onClick={handleClick} />
        </Link>
        <Link to="/cat-kittens">
          <img src={petPhoto4} alt="Pet 4" />
        </Link>
        <Link to="/paw">
          <img src={petPhoto1} alt="Pet 1" onClick={handleClick} />
        </Link>
      </div>
    </section>
  );
};

export default Home;
