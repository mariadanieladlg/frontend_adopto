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
        <li>
          <Link to="/paw">The Paw-trol</Link>
        </li>
        <li>
          <Link to="/account" className="account-link">
            <RiUserLine size={28} />
          </Link>
        </li>
        <li>
          <Link to="/pets/add" className="add-btn">
            + Add
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
