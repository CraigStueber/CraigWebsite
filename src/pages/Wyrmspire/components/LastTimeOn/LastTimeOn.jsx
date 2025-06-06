import "./LastTimeOn.styles.css";
import recapData1 from "./recapDataSession1";

function LastTimeOn() {
  return (
    <div className="last-time-on">
      <h2>Last Time On</h2>
      {recapData1.map((item, index) => (
        <div
          className={`recap-section ${
            index % 2 === 0 ? "left-image" : "right-image"
          }`}
          key={index}
        >
          <img src={item.image} alt={item.title} className="recap-image" />
          <div className="recap-text">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LastTimeOn;
