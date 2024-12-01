import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Comic.css";
import Shield from "../../assets/img/shield.png";

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
        console.log(response.data);

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
      <img className="isloading" src={Shield} alt="" />
    </main>
  ) : (
    <main className="comic-page">
      <div className="container">
        <div className="comic">
          <div className="image">
            <img
              src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
              alt=""
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
