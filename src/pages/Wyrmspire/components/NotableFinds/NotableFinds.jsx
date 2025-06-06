import "./NotableFinds.styles.css";
import notableFindsData from "./notableFindsData";

function NotableFinds() {
  return (
    <div className="notable-finds">
      <h2>Notable Finds</h2>
      {notableFindsData.map((item, index) => (
        <div
          className={`find-section ${
            index % 2 === 0 ? "left-image" : "right-image"
          }`}
          key={index}
        >
          <img src={item.image} alt={item.title} className="find-image" />
          <div className="find-text">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotableFinds;
