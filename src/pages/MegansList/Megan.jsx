import BookTable from "./components/tables/bookTable/BookTable";
import "./Megan.styles.css";
function Megan() {
  return (
    <div className="globalContainer">
      <h1 className="meganTitle">Megan's List Page</h1>
      <BookTable />
    </div>
  );
}
export default Megan;
