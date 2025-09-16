import "./Navbar.css";
import { Link } from "react-router-dom";
import navLogo from "/public/logo-adopto.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo left */}
      <div className="logo">
        <img src={navLogo} alt="Pet Adoption Logo" />
      </div>

      {/* Links right*/}
      <ul className="nav-links">
        <li>Cats & Kittens</li>
        <li>Dogs & Puppies</li>
        <li>The Paw-trol</li>
        <li>
          <Link to="/Account">Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
