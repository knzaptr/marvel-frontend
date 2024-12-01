import { Link, useNavigate } from "react-router-dom";
import MarvelLogo from "../../assets/img/MarvelLogo.webp";
import Cookies from "js-cookie";
import "./Header.css";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const Header = ({ token, setToken }) => {
  const [showPhoneVersion, setShowPhoneVersion] = useState(false);

  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={MarvelLogo} alt="" />
        </Link>
        <div className="menu">
          <nav>
            <Link className="nav-item hidden-phone" data-target="first" to="/">
              Personnages
            </Link>
            <Link
              className="nav-item hidden-phone"
              data-target="second"
              to="/comics"
            >
              Comics
            </Link>
            <Link
              className="nav-item hidden-phone"
              data-target="third"
              to="/favourite"
            >
              Favoris
            </Link>
            <div className="underline"></div>
          </nav>

          <div className="connect hidden-phone">
            {token ? (
              <button
                className="hidden-phone"
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
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="hidden-phone"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="hidden-phone"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>

        <div className="menu-phone-size">
          <FiMenu
            onClick={() => {
              setShowPhoneVersion(!showPhoneVersion);
            }}
          />
        </div>
      </div>
      {showPhoneVersion && (
        <div className="menu-phone hidden-default">
          <nav>
            <Link
              className="nav-item hidden-default"
              data-target="first"
              to="/"
            >
              Personnages
            </Link>
            <Link
              className="nav-item hidden-default"
              data-target="second"
              to="/comics"
            >
              Comics
            </Link>
            <Link
              className="nav-item hidden-default"
              data-target="third"
              to="/favourite"
            >
              Favoris
            </Link>
            <div className="underline"></div>
          </nav>
          <div className="connect hidden-default">
            {token ? (
              <button
                className="hidden-default"
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
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="hidden-default"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="hidden-default"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
