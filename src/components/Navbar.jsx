import "./Navbar.css";
import { RiUserLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import navLogo from "../assets/logo-adopto.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo left */}
      <div className="logo">
        <img src={navLogo} alt="Pet Adoption Logo" />
      </div>

      {/* Links right*/}
      <ul className="nav-links">
        <li>
          <Link to="/cat-kittens">Cat & Kittens</Link>
        </li>
        <li>
          <Link to="/dog-puppies">Dogs & Puppies</Link>
        </li>
        <li>The Paw-trol</li>
        <li>
          <Link to="/Account" className="account-link">
            <RiUserLine size={28} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
