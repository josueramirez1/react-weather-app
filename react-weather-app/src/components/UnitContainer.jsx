function UnitContainer({ handleClick, unit }) {
  return (
    <div className="unit-container">
      <button
        className={unit === "celsius" ? null : "greyed"}
        id="celsius"
        onClick={handleClick}
      >
        °C
      </button>

      <button
        className={unit === "fahrenheit" ? null : "greyed"}
        id="fahrenheit"
        onClick={handleClick}
      >
        °F
      </button>
      <button
        className={unit === "kelvin" ? null : "greyed"}
        id="kelvin"
        onClick={handleClick}
      >
        K
      </button>
    </div>
  );
}

export default UnitContainer;
