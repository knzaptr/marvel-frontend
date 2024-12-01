import "./Comic.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Shield from "../../assets/img/shield.png";
import NotFoundImg from "../../assets/img/not_found.webp";

const Comic = () => {
  const { comicId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DATA}/comic/${comicId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [comicId]);

  return isLoading ? (
    <main className="isloading-page">
      <img className="isloading" src={Shield} alt="en chargement" />
    </main>
  ) : (
    <main className="comic-page">
      <div className="container">
        <div className="comic">
          <div className="image">
            <img
              src={
                data.thumbnail.path.includes("image_not_available")
                  ? NotFoundImg
                  : `${data.thumbnail.path}.${data.thumbnail.extension}`
              }
              alt={data.title}
            />
          </div>
          <div className="content">
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Comic;
