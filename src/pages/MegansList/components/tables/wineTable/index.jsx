// src/components/tables/wineTable/WineTable.jsx
import { useEffect, useState } from "react";
import { fetchWinesByUser } from "../../../api/fetchWines";
import { useSession } from "../../../../../context/SessionContext";
import "../styles.css";

function WineTable() {
  const { userId } = useSession();
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWine, setSelectedWine] = useState(null);

  // Filters
  const [regionFilter, setRegionFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  useEffect(() => {
    if (!userId) return;

    async function loadWines() {
      try {
        setLoading(true);
        const data = await fetchWinesByUser(userId);
        setWines(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWines();
  }, [userId]);

  if (!userId) return <div>Please log in</div>;
  if (loading) return <div>Loading wines...</div>;
  if (error) return <div>Error: {error}</div>;

  // Unique regions
  const regions = [
    "All",
    ...new Set(wines.map((w) => w.region).filter(Boolean)),
  ];

  // Apply filters
  let filteredWines = wines;

  // Region filter
  if (regionFilter !== "All") {
    filteredWines = filteredWines.filter((w) => w.region === regionFilter);
  }

  // Rating filter
  if (ratingFilter !== "All") {
    filteredWines = filteredWines.filter((w) => {
      const r = w.rating || 0;
      switch (ratingFilter) {
        case "10":
          return r === 10;
        case "7-9":
          return r >= 7 && r <= 9;
        case "4-6":
          return r >= 4 && r <= 6;
        case "2-3":
          return r >= 2 && r <= 3;
        case "1":
          return r === 1;
        default:
          return true;
      }
    });
  }

  return (
    <>
      {/* Filter controls */}
      <div className="filter-bar">
        <label htmlFor="regionFilter">Filter by Region:</label>
        <select
          id="regionFilter"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label htmlFor="ratingFilter">Filter by Rating:</label>
        <select
          id="ratingFilter"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="10">10</option>
          <option value="7-9">7–9</option>
          <option value="4-6">4–6</option>
          <option value="2-3">2–3</option>
          <option value="1">1</option>
        </select>
      </div>

      <table>
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Winery</th>
            <th>Region</th>
            <th>Year</th>
            <th>Type</th>
            <th>Rating</th>
            <th className="description-cell">Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredWines.map((w) => (
            <tr
              key={w.id}
              onClick={() => setSelectedWine(w)}
              className="clickable-row"
            >
              <td>{w.name}</td>
              <td>{w.winery}</td>
              <td>{w.region || "—"}</td>
              <td>{w.year || "—"}</td>
              <td>{w.type || "—"}</td>
              <td>{w.rating || "—"}</td>
              <td className="description-cell">{w.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedWine && (
        <div className="modal-backdrop" onClick={() => setSelectedWine(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{selectedWine.name}</h2>
            <p>
              <strong className="modal-author">Winery:</strong>{" "}
              {selectedWine.winery}
            </p>
            <p>
              <strong className="modal-author">Region:</strong>{" "}
              {selectedWine.region || "—"}
            </p>
            <p>
              <strong className="modal-author">Year:</strong>{" "}
              {selectedWine.year || "—"}
            </p>
            <p>
              <strong className="modal-author">Type:</strong>{" "}
              {selectedWine.type || "—"}
            </p>
            <p>
              <strong className="modal-author">Rating:</strong>{" "}
              {selectedWine.rating || "—"}
            </p>
            <p>{selectedWine.description}</p>

            <button onClick={() => setSelectedWine(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default WineTable;
