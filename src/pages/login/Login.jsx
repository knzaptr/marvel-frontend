import axios from "axios";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

const Login = ({ setToken }) => {
  const [userInfo, setUserInfo] = useState({
    password: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, key) => {
    const newObj = { ...userInfo };
    newObj[key] = event.target.value;
    setUserInfo(newObj);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DATA}/user/login`,
        userInfo
      );
      Cookies.set("token", response.data.token, { expires: 14 });
      setToken(Cookies.get("token"));

      if (location.state) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        // je fais appraître un message d'erreur
        setErrorMessage("Adresse mail ou mot de passe incorrect !");
      } else {
        // Si je tombe dans le catch pour une raison inconnue
        setErrorMessage("Une erreur est survenue, veuillez réessayer !");
      }
      console.log(error.response);
    }
  };
  return (
    <main className="login-page">
      <div className="login">
        <h1>Se connecter</h1>
        <form method="post" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => handleChange(event, "email")}
            value={userInfo.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={(event) => handleChange(event, "password")}
            value={userInfo.password}
            required
          />

          <button type="submit">Se connecter</button>
        </form>
        <Link to="/signup">
          <p>Pas encore de compte ? Inscris-toi !</p>
        </Link>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </main>
  );
};

export default Login;
