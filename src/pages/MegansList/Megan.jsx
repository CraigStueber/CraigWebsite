import { useState } from "react";
import BookTable from "./components/tables/bookTable/BookTable";
import WineTable from "./components/tables/wineTable";
import Header from "./components/header/Header";
import "./Megan.styles.css";
function Megan() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="globalContainer">
        {activeTab === "books" && <BookTable />}
        {activeTab === "wine" && <WineTable />}
      </div>
    </div>
  );
}

export default Megan;
