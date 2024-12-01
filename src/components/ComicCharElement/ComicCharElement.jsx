import "./ComicCharElement.css";
import { Link, useNavigate } from "react-router-dom";
import { CgHeart } from "react-icons/cg";
import { VscHeartFilled } from "react-icons/vsc";
import NotFoundImg from "../../assets/img/not_found.webp";
import axios from "axios";
import Cookies from "js-cookie";

const ComicCharElement = ({
  title,
  image,
  linkTo,
  description,
  favObject,
  type,
  inFav,
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
          src={image.includes("image_not_available") ? NotFoundImg : image}
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
          {inFav ? <VscHeartFilled /> : <CgHeart />}
        </button>
      </div>
    </div>
  );
};

export default ComicCharElement;
