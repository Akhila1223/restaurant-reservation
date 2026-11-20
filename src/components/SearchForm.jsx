import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStates, getCities } from "../services/api";
import "./SearchForm.css";

function SearchForm() {
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getStates();
        setStates(Array.isArray(data) ? data : data.states || []);
      } catch (err) {
        setError("Unable to load states. Please refresh.");
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  const handleStateSelect = async (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);
    setStateOpen(false);
    setCityOpen(false);
    setError("");
    setLoadingCities(true);

    try {
      console.time("Cities API");

      const data = await getCities(state);

      console.timeEnd("Cities API");
      console.log("Cities API response:", data);

      console.log("Cities API response:", data);

      let cityList = [];

      if (Array.isArray(data)) {
        cityList = data;
      } else if (Array.isArray(data.cities)) {
        cityList = data.cities;
      } else if (Array.isArray(data.data)) {
        cityList = data.data;
      }

      setCities(cityList);
    } catch (err) {
      console.error("Cities API failed:", err);
      setError("Unable to load cities. Please try again.");
    } finally {
      setLoadingCities(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!selectedState || !selectedCity) {
      setError("Please select both state and city.");
      return;
    }

    navigate(
      `/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`,
    );
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="search-fields">
        <div
          id="state"
          className="dropdown"
          role="button"
          tabIndex={0}
          aria-label="Select state"
          aria-expanded={stateOpen}
          onClick={() => {
            setStateOpen(!stateOpen);
            setCityOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setStateOpen(!stateOpen);
            }
          }}
        >
          <span>
            {loadingStates
              ? "Loading states..."
              : selectedState || "Select State"}
          </span>
          <span>⌄</span>

          {stateOpen && (
            <ul className="dropdown-options">
              {states.map((state) => (
                <li
                  key={state}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStateSelect(state);
                  }}
                >
                  {state}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          id="city"
          className={`dropdown ${!selectedState ? "disabled" : ""}`}
          role="button"
          tabIndex={selectedState ? 0 : -1}
          aria-label="Select city"
          aria-expanded={cityOpen}
          onClick={() => {
            if (!selectedState) return;

            setCityOpen(true);
            setStateOpen(false);
          }}
        >
          <span>
            {loadingCities
              ? "Loading cities..."
              : selectedCity || "Select City"}
          </span>

          <span>⌄</span>

          {cityOpen && (
            <ul className="dropdown-options">
              {loadingCities ? (
                <li>Loading cities...</li>
              ) : (
                cities.map((city) => (
                  <li
                    key={city}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCity(city);
                      setCityOpen(false);
                    }}
                  >
                    {city}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <button id="searchBtn" type="submit">
          🔍 Search
        </button>
      </div>

      {error && <p className="search-error">{error}</p>}
    </form>
  );
}

export default SearchForm;
