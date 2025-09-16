import "./Header.styles.css";

function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header">
      <button
        className={`header-btn books-btn ${
          activeTab === "books" ? "active" : ""
        }`}
        onClick={() => setActiveTab("books")}
      >
        Books
      </button>

      <h1 className="header-title">Megan&apos;s List</h1>

      <button
        className={`header-btn wine-btn ${
          activeTab === "wine" ? "active" : ""
        }`}
        onClick={() => setActiveTab("wine")}
      >
        Wine
      </button>
    </header>
  );
}

export default Header;
