import "./Character.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ComicCharElement from "../../components/ComicCharElement/ComicCharElement";
import Shield from "../../assets/img/shield.png";

const Character = ({ token, setFavList, favList }) => {
  const { characterId } = useParams();
  const [dataChar, setDataChar] = useState(null);
  const [dataCharInComics, setDataCharInComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseChar = await axios.get(
          `${import.meta.env.VITE_DATA}/character/${characterId}`
        );

        const responseCharInComics = await axios.get(
          `${import.meta.env.VITE_DATA}/comics/${characterId}`
        );

        setDataChar(responseChar.data);
        setDataCharInComics(responseCharInComics.data.comics);

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
  }, [characterId, setFavList, token]);

  return isLoading ? (
    <main className="isloading-page">
      <img className="isloading" src={Shield} alt="en chargement" />
    </main>
  ) : (
    <main className="character">
      <div className="container">
        <div className="character-info">
          <div className="description">
            <h1 className="char-name">{dataChar.name}</h1>
            <p>{dataChar.description}</p>
          </div>
        </div>
        <div className="character-comics">
          {dataCharInComics.map((comic) => {
            return (
              <ComicCharElement
                key={comic._id}
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                title={comic.title}
                linkTo={`/comic/${comic._id}`}
                type="comic"
                favObject={comic}
                inFav={favList.includes(comic._id)}
                setFavList={setFavList}
                favList={favList}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Character;
