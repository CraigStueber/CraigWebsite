import "./NotableFinds.styles.css";
import notableFindsData from "./notableFindsData";

function NotableFinds() {
  return (
    <div className="notable-finds">
      <h2>Notable Finds</h2>
      {notableFindsData.map((item, index) => (
        <div
          className="find-section"
          style={{
            flexDirection:
              window.innerWidth > 768
                ? index % 2 === 0
                  ? "row"
                  : "row-reverse"
                : "column",
          }}
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
