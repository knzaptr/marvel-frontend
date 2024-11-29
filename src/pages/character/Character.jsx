import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ComicCharElement from "../../components/ComicCharElement/ComicCharElement";
import "./Character.css";
const Character = () => {
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
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [characterId]);
  return isLoading ? (
    <div>chargement</div>
  ) : (
    <main className="character">
      <div className="container">
        <div className="character-info">
          <div className="description">
            <h2>{dataChar.name}</h2>
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
                linkTo={`/comics/${comic._id}`}
                type="comic"
                favObject={comic}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Character;
