import "./Navbar.css";
import { Link } from "react-router-dom";
import navLogo from "../assets/logo-adopto.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo left */}
      <div className="logo">
        <Link to="/">
          <img src={navLogo} alt="Pet Adoption Logo" />
        </Link>
      </div>

      {/* Links right*/}
      <ul className="nav-links">
        <li>
          <Link to="/dog-puppies">Dogs & Puppies</Link>
        </li>
        <li>
          <Link to="/cat-kittens">Cat & Kittens</Link>
        </li>

        <li>
          <Link to="/paw">The Paw-trol</Link>
        </li>
        <li>
          <Link to="/aboutus">About Us</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
