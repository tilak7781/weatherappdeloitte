import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/hourly-forecast" className="nav-link">
        Hourly Forecast
      </Link>
      <Link to="/search" className="nav-link">
        Search City
      </Link>
      <Link to="/five-day-forecast" className="nav-link">
        5-Day Forecast
      </Link>
    </nav>
  );
};

export default Navbar;
