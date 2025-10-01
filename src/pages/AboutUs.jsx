import "./AboutUs.css";
import Dani from "../assets/daniela.jpg";
import Larissa from "../assets/larissa.jpg";

// Ícones
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="aboutus-page">
      <h2 className="aboutus-title"> About Us</h2>

      <div className="aboutus-section left">
        <img src={Dani} alt="Daniela" />
        <p className="aboutus-text">
          We are <strong>Daniela and Larissa</strong>, driven by our passion for
          pets and our wish to make a difference. Living in the Netherlands, we
          saw how many pets in shelters are waiting for a new chance, and how
          difficult it can sometimes be for people to find their lost
          companions.
        </p>
      </div>

      <div className="aboutus-section right">
        <img src={Larissa} alt="Larissa" />
        <p className="aboutus-text">
          With <strong>Adopto</strong>, our goal is to support shelters in the
          Netherlands by giving them a space to showcase their pets for
          adoption, while also helping people connect through a{" "}
          <strong>lost &amp; found service for pets</strong>.
        </p>
      </div>

      <p className="aboutus-highlight">Because every paw matters.</p>

      {/* Contact Section */}
      <div className="contact-section">
        <h3 className="contact-title">Contact Us</h3>
        <p>
          Do you want to collaborate, share feedback, or simply say hello? Reach
          out to us, we’d love to hear from you!
        </p>

        <div className="contact-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram /> Instagram
          </a>
          <a href="mailto:adopto@example.com">
            <FaEnvelope /> adopto@example.com
          </a>

          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook /> Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
