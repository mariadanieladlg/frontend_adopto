import "./Home.css";
import petPhoto1 from "/public/photo1.png";
import petPhoto4 from "/public/photo4.png";
import petPhoto5 from "/public/photo5.png";

const photos = [petPhoto1, petPhoto4, petPhoto5];

const Home = () => {
  return (
    <section className="home">
      <h1 className="home-title">Home is Where the Paw Is</h1>

      <div className="photo-grid">
        <img src={petPhoto1} alt="Pet 1" />
        <img src={petPhoto4} alt="Pet 4" />
        <img src={petPhoto5} alt="Pet 5" />
      </div>
    </section>
  );
};

export default Home;
