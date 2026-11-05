import "./Seitenkopf.css";

function Seitenkopf({ eyebrowText, header, date }) {
  return (
    <header className="header">
      {date && <p className="date">{date}</p>}
      {eyebrowText && <p className="eyebrow">{eyebrowText}</p>}
      <h1>{header}</h1>
    </header>
  );
}

export default Seitenkopf;