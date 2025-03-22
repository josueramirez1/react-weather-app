import { useEffect, useState } from "react";
import TodayDislay from "./components/TodayDisplay";
import UnitContainer from "./components/UnitContainer";
import Card from "./components/Card";

function App() {
  // useState variables that will be changed later
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("fahrenheit");

  // Functions that will be used to getLocation and fetchData from API
  // get geolocation using javascript method getCurrentPosition.
  const getLocation = () => {
    if (!navigator.geolocation) {
      // use useState to update error variable
      setError("Location API is not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        // takes in two callbacks, first it is to get position. In this case we are accessing coords to get just longitude and latitude. We are updating LOCATION variable.
        (position) => {
          setLocation(position.coords);
        },
        // otherwise return an error using useState error variable
        () => {
          setError("Sorry, we cannot find your location.");
        }
      );
    }
  };

  const fetchData = () => {
    // then we take the location variable that was updated and we sepearte them into individual latitude and longitude numbers.
    const latitude = location?.latitude;
    const longitude = location?.longitude;
    //we use the fetch method using numbers passed as temperal strings to get the response.json
    fetch(
      `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  };

  // We run a loop using useEffect that will constantly check for updates by running both getLocation and fetchData functions. Functions will run accordingly.
  useEffect(() => {
    getLocation();
    fetchData();
  }, []);

  const handleClick = (e) => {
    setUnit(e.target.id);
  };

  return (
    <>
      <div className="weather-app">
        <TodayDislay today={data?.dataseries[0]} location={location} />
        <div className="cards-container">
          {data?.dataseries.map((day, index) => (
            <Card key={index} day={day} index={index} unit={unit} />
          ))}
        </div>
        <UnitContainer handleClick={handleClick} unit={unit} />
        {error}
      </div>
    </>
  );
}

export default App;
