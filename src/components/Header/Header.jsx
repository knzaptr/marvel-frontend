import { Link, useNavigate } from "react-router-dom";
import MarvelLogo from "../../assets/img/MarvelLogo.webp";
import Cookies from "js-cookie";
import "./Header.css";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={MarvelLogo} alt="" />
        </Link>
        <nav>
          <Link className="nav-item" data-target="first" to="/characters">
            Personnages
          </Link>
          <Link className="nav-item" data-target="second" to="/comics">
            Comics
          </Link>
          <Link className="nav-item" data-target="third" to="/favourite">
            Favoris
          </Link>
          <div className="underline"></div>
        </nav>

        <div className="connect">
          {token ? (
            <button
              className="logoff"
              onClick={() => {
                Cookies.remove("token");
                setToken(null);
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
