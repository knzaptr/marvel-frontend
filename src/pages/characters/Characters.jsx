import axios from "axios";
import { useEffect, useState } from "react";
import ComicCharElement from "../../components/ComicCharElement/ComicCharElement";
import "./Characters.css";
import Filters from "../../components/Filters/Filters";

const Characters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [limit, setLimit] = useState(20);
  const [nbTotal, setNbTotal] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  let pageButton = [];

  const pageNo = () => {
    let nbpage = Math.ceil(nbTotal / limit);
    if (nbpage > 1) {
      for (let i = 1; i <= nbpage; i++) {
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

      return pageButton;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DATA}/characters`,
          {
            params: {
              page: page,
              limit: limit,
              name: search,
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
  }, [limit, page, search]);

  return isLoading ? (
    <main>chargement</main>
  ) : (
    <main className="characters-page">
      <div className="container">
        <Filters
          limit={limit}
          setLimit={setLimit}
          setSearch={setSearch}
          search={search}
          setPage={setPage}
        />
        <div className="characters">
          {data.results.map((character) => {
            return (
              <ComicCharElement
                key={character._id}
                linkTo={`/character/${character._id}`}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                title={character.name}
                description={character.description}
                type="character"
                favObject={character}
              />
            );
          })}
        </div>
        <div className="page-number">{pageNo()}</div>
      </div>
    </main>
  );
};

export default Characters;
