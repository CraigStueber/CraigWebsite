import { useState } from "react";
import BookTable from "./components/tables/bookTable/BookTable";
import WineTable from "./components/tables/wineTable";
import Header from "./components/Header/Header";
import "./Megan.styles.css";
function Megan() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="globalContainer">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "books" && <BookTable />}
      {activeTab === "wine" && <WineTable />}
    </div>
  );
}

export default Megan;
