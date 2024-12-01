import "./Comics.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ComicCharElement from "../../components/ComicCharElement/ComicCharElement";
import Filters from "../../components/Filters/Filters";
import Shield from "../../assets/img/shield.png";

const Comics = ({ setFavList, favList, token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [limit, setLimit] = useState(20);
  const [nbTotal, setNbTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  let pageButton = [];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pageNo = () => {
    let nbpage = Math.ceil(nbTotal / limit);
    if (nbpage > 1) {
      for (let i = 1; i <= nbpage; i++) {
        if (i === 1 || i === nbpage || (i >= page - 1 && i <= page + 1)) {
          pageButton.push(
            <button
              key={i}
              className={page === i ? "selected" : ""}
              onClick={() => {
                setPage(i);
                scrollToTop();
              }}
            >
              {i}
            </button>
          );
        }
      }
      if (page >= 4) {
        pageButton.splice(1, 0, <span key={"span-1"}>...</span>);
      }
      if (page <= nbpage - 3) {
        pageButton.splice(
          pageButton.length - 1,
          0,
          <span key={"span-2"}>...</span>
        );
      }
      return pageButton;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DATA}/comics`,
          {
            params: {
              page: page,
              limit: limit,
              title: search,
            },
          }
        );

        setNbTotal(response.data.count);
        setData(response.data);

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
  }, [page, limit, search, setFavList, token]);

  return isLoading ? (
    <main className="isloading-page">
      <img className="isloading" src={Shield} alt="en chargement" />
    </main>
  ) : (
    <main className="comics-page">
      <div className="container">
        <Filters
          limit={limit}
          setLimit={setLimit}
          setSearch={setSearch}
          search={search}
          setPage={setPage}
        />
        <div className="comics">
          {data.results.map((comic) => {
            return (
              <ComicCharElement
                key={comic._id}
                id={comic._id}
                linkTo={`/comic/${comic._id}`}
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                title={comic.title}
                description={comic.description}
                type="comic"
                favObject={comic}
                inFav={favList.includes(comic._id)}
              />
            );
          })}
        </div>
        <div className="page-number">{pageNo()}</div>
      </div>
    </main>
  );
};

export default Comics;
