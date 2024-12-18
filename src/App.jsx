import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Characters from "./pages/characters/Characters";
import Comics from "./pages/comics/Comics";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Comic from "./pages/comic/Comic";
import Character from "./pages/character/Character";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Favourite from "./pages/favourite/Favourite";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [favList, setFavList] = useState([]);

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                token={token}
                setFavList={setFavList}
                favList={favList}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics token={token} setFavList={setFavList} favList={favList} />
            }
          />
          <Route path="/comic/:comicId" element={<Comic />} />
          <Route
            path="/character/:characterId"
            element={
              <Character
                token={token}
                setFavList={setFavList}
                favList={favList}
              />
            }
          />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/favourite"
            element={
              <Favourite
                token={token}
                setFavList={setFavList}
                favList={favList}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
