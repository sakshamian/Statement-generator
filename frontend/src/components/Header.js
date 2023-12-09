
import { Link } from "react-router-dom";

const Navbar = ({ title = "Bank Statement Generator" }) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/">
          <div className="navbar-brand mx-3">{title}</div>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;