import "./Favourite.css";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ComicCharElement from "../../components/ComicCharElement/ComicCharElement";
import Shield from "../../assets/img/shield.png";

const Favourite = ({ token, setFavList, favList }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

        if (token) {
          const responseFav = await axios.get(
            `${import.meta.env.VITE_DATA}/favourite`,
            {
              headers: {
                authorization: "Bearer " + token,
              },
            }
          );

          const newFavList = responseFav.data.results.map(
            (item) => item.favouriteCharCom._id
          );

          setFavList(newFavList);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [token, setFavList]);

  return token ? (
    isLoading ? (
      <main className="isloading-page">
        <img className="isloading" src={Shield} alt="en chargement" />
      </main>
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
                  inFav={favList.includes(fav.favouriteCharCom._id)}
                  setFavList={setFavList}
                  favList={favList}
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
                  inFav={favList.includes(fav.favouriteCharCom._id)}
                  setFavList={setFavList}
                  favList={favList}
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
