import { useEffect, useState } from "react";
import { fetchBooksByUser } from "../../../api/fetchBooks";
import { useSession } from "../../../../../context/SessionContext";
import "../styles.css";
import supabase from "../../../../../client";
function BookTable() {
  const { userId } = useSession();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function loadBooks() {
      try {
        setLoading(true);
        const data = await fetchBooksByUser(userId);
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [userId]);

  async function toggleOwned(book) {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("Books")
        .update({ owned: !book.owned })
        .eq("id", book.id);

      if (error) throw error;

      // update both the table + modal state
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, owned: !b.owned } : b))
      );
      setSelectedBook((prev) =>
        prev ? { ...prev, owned: !prev.owned } : prev
      );
    } catch (err) {
      alert("Error updating owned status: " + err.message);
    } finally {
      setUpdating(false);
    }
  }

  if (!userId) return <div>Please log in</div>;
  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <table>
        <thead>
          <tr className="table-header">
            <th>Title</th>
            <th>Author</th>
            <th className="description-cell">Description</th>
            <th>Owned</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr
              key={b.id}
              onClick={() => setSelectedBook(b)}
              className="clickable-row"
            >
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td className="description-cell">{b.description}</td>
              <td>{b.owned ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBook && (
        <div className="modal-backdrop" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{selectedBook.title}</h2>
            <p>
              <strong className="modal-author">Author:</strong>{" "}
              {selectedBook.author}
            </p>
            <p>{selectedBook.description}</p>
            <p>
              <strong className="modal-author">Owned:</strong>{" "}
              {selectedBook.owned ? "Yes" : "No"}
            </p>

            {!selectedBook.owned && (
              <button
                onClick={() => toggleOwned(selectedBook)}
                disabled={updating}
              >
                {updating ? "Updating..." : "Mark as Owned"}
              </button>
            )}

            <button onClick={() => setSelectedBook(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default BookTable;
