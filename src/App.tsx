import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { City } from "./models/City";
import { loadCities } from "./utils/cityDataLoader";
import { calculateDistance } from "./services/distanceCalculator";
import CitySearch from "./components/CitySearch";
import CityList from "./components/CityList";

const App: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [nearestCities, setNearestCities] = useState<City[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityData = await loadCities();
        setCities(cityData);
        setNearestCities(cityData);
      } catch (error) {
        console.error("Error loading cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const findNearestCities = useCallback(
    (selectedCity: City | null) => {
      if (!selectedCity) {
        setNearestCities(cities);
        return;
      }

      const distances = cities
        .filter((city) => city.name !== selectedCity.name)
        .map((city) => ({
          ...city,
          distance: calculateDistance(
            selectedCity.lat,
            selectedCity.lng,
            city.lat,
            city.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 4);

      setNearestCities(distances);
    },
    [cities]
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchText(text);
      if (text) {
        setNearestCities(cities); 
      }
    },
    [cities]
  );

  return (
    <div className="app-container">
      <h1>Find Nearest Cities</h1>

      {loading ? (
        <p>Loading cities...</p>
      ) : (
        <>
          <CitySearch
            cities={cities}
            onCitySelect={findNearestCities}
            onSearchChange={handleSearchChange}
          />
          <hr className="divider" />
          <CityList cities={nearestCities} />
        </>
      )}
    </div>
  );
};

export default App;
