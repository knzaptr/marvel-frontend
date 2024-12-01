import "./ComicCharElement.css";
import { Link, useNavigate } from "react-router-dom";
import { CgHeart } from "react-icons/cg";
import { VscHeartFilled } from "react-icons/vsc";
import NotFoundImg from "../../assets/img/not_found.webp";
import axios from "axios";
import Cookies from "js-cookie";

const ComicCharElement = ({
  inFav,
  title,
  image,
  linkTo,
  description,
  favObject,
  type,
  setFavList,
  favList,
}) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const addToFav = async () => {
    if (token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_DATA}/favourite`,
          { favouriteCharCom: favObject, type: type },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );

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
          console.log(favList);
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout aux favoris", error);
      }
    } else {
      navigate("/login", { state: { from: `/${type}s` } });
    }
  };

  return (
    <div className="comic-char">
      <div className="imgBx">
        <img
          src={
            image.includes("image_not_available") ||
            image ===
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
              ? NotFoundImg
              : image
          }
          alt={title}
        />
      </div>
      <div className="content">
        <Link className="comic-char-link" to={linkTo}>
          <h2 className="title">{title}</h2>
          {description && <p className="description">{description}</p>}
          <span>See more</span>
        </Link>

        <button className="addfav" onClick={addToFav}>
          {inFav ? <VscHeartFilled /> : <CgHeart className="favIcon" />}
        </button>
      </div>
    </div>
  );
};

export default ComicCharElement;
