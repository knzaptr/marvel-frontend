import axios from "axios";
import { useEffect, useState } from "react";
import ComicCharElement from "../../components/ComicCharElement/ComicCharElement";
import "./Comics.css";
import Filters from "../../components/Filters/Filters";

const Comics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [limit, setLimit] = useState(20);
  const [nbTotal, setNbTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  let pageButton = [];

  const pageNo = () => {
    let nbpage = Math.ceil(nbTotal / limit);
    if (nbpage > 1) {
      for (let i = 1; i <= nbpage; i++) {
        if (i === 1 || i === nbpage || (i >= page - 4 && i <= page + 4)) {
          pageButton.push(
            <button
              key={i}
              className={page === i ? "selected" : ""}
              onClick={() => {
                setPage(i);
              }}
            >
              {i}
            </button>
          );
        }
      }

      if (page >= 7) {
        pageButton.splice(1, 0, <span key={"span-1"}>...</span>);
      }
      if (page <= nbpage - 6) {
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
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [page, limit, search]);

  return isLoading ? (
    <main>chargement</main>
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
                linkTo={`/comic/${comic._id}`}
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                title={comic.title}
                description={comic.description}
                type="comic"
                favObject={comic}
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
