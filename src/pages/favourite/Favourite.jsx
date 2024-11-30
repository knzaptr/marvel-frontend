import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ComicCharElement from "../../components/ComicCharElement/ComicCharElement";
import "./Favourite.css";

const Favourite = ({ token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DATA}/favourite`,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [token, refreshTrigger]);

  return token ? (
    isLoading ? (
      <main>Chargement</main>
    ) : (
      <main className="favourite-page">
        <div className="container">
          <div className="favourites">
            {data.map((fav) => {
              return fav.type === "character" ? (
                <ComicCharElement
                  key={fav.favouriteCharCom._id}
                  linkTo={`/character/${fav.favouriteCharCom._id}`}
                  image={`${fav.favouriteCharCom.thumbnail.path}.${fav.favouriteCharCom.thumbnail.extension}`}
                  title={fav.favouriteCharCom.name}
                  description={fav.favouriteCharCom.description}
                  type="character"
                  favObject={fav.favouriteCharCom}
                />
              ) : (
                <ComicCharElement
                  key={fav.favouriteCharCom._id}
                  linkTo={`/comic/${fav.favouriteCharCom._id}`}
                  image={`${fav.favouriteCharCom.thumbnail.path}.${fav.favouriteCharCom.thumbnail.extension}`}
                  title={fav.favouriteCharCom.title}
                  description={fav.favouriteCharCom.description}
                  type="comic"
                  favObject={fav.favouriteCharCom}
                />
              );
            })}
          </div>
        </div>
      </main>
    )
  ) : (
    <Navigate to="/login" state={{ from: "/favourite" }} />
  );
};

export default Favourite;
