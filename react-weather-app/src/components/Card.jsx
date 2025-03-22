import { getIcon, convertUnit } from "../helpers";

function Card({ day, index, unit }) {
  const date = day.date.toString();
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const dayOfTheMonth = date.slice(6, 8);
  const formmattedDate = new Date(year, month - 1, dayOfTheMonth)
    .toDateString()
    .slice(0, 3);

  const unitShortHand =
    unit === "kelvin"
      ? unit.slice(0, 1).toUpperCase()
      : "°" + unit.slice(0, 1).toUpperCase();
  return (
    <div className="card-container">
      <h3>{index === 0 ? "Today" : formmattedDate}</h3>
      <div className="icon-container">
        {day.weather && getIcon(day.weather)}
      </div>
      <p>{day.weather}</p>
      <p>
        {convertUnit(unit, day.temp2m.max)} {unitShortHand} max
      </p>
      <p>
        {convertUnit(unit, day.temp2m.min)} {unitShortHand} min
      </p>
    </div>
  );
}

export default Card;
