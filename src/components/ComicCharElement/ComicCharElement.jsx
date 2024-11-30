import { Link, useNavigate } from "react-router-dom";
import { CgHeart } from "react-icons/cg";
import { VscHeartFilled } from "react-icons/vsc";
import NotFoundImg from "../../assets/img/not_found.webp";
import "./ComicCharElement.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const ComicCharElement = ({
  title,
  image,
  linkTo,
  description,
  favObject,
  type,
}) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const addToFav = async () => {
    if (token) {
      await axios.post(
        `${import.meta.env.VITE_DATA}/favourite`,
        { favouriteCharCom: favObject, type: type },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
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
        <h2 className="title">{title}</h2>
        {description && <p className="description">{description}</p>}

        <Link className="comic-char-link" to={linkTo}>
          See more
        </Link>

        <button className="addfav" onClick={addToFav}>
          <CgHeart />
        </button>
      </div>
    </div>
  );
};

export default ComicCharElement;
