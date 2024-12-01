import "./Filters.css";
const Filters = ({ limit, setLimit, setSearch, search, setPage }) => {
  return (
    <div className="filters">
      <input
        className="search-bar"
        type="text"
        placeholder="Miles Morales"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        value={search}
      />
      <div className="nbPerPage">
        <span>Afficher par</span>
        <button
          onClick={() => {
            setLimit(20);
            setPage(1);
          }}
          className={limit === 20 ? "selected" : ""}
        >
          20
        </button>
        <button
          onClick={() => {
            setLimit(40);
            setPage(1);
          }}
          className={limit === 40 ? "selected" : ""}
        >
          40
        </button>
        <button
          onClick={() => {
            setLimit(100);
            setPage(1);
          }}
          className={limit === 100 ? "selected" : ""}
        >
          100
        </button>
      </div>
    </div>
  );
};

export default Filters;
