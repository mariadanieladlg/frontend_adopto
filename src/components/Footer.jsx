import "./Footer.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <footer className={`footer ${isHome ? "fixed-footer" : ""}`}>
      <p>© 2025 Adopto. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
