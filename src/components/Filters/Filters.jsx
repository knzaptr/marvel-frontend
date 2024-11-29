import "./Filters.css";
const Filters = ({ limit, setLimit, setSearch, search }) => {
  console.log(limit);

  return (
    <div className="filters">
      <input
        className="search-bar"
        type="text"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        value={search}
      />
      <div className="nbPerPage">
        <button
          onClick={() => {
            setLimit(20);
          }}
          className={limit === 20 ? "selected" : ""}
        >
          20
        </button>
        <button
          onClick={() => {
            setLimit(40);
          }}
          className={limit === 40 ? "selected" : ""}
        >
          40
        </button>
        <button
          onClick={() => {
            setLimit(100);
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
