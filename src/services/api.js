const BASE_URL = "https://restaurantdata.onrender.com";

export const getStates = async () => {
  const response = await fetch(`${BASE_URL}/states`);

  if (!response.ok) {
    throw new Error("Failed to fetch states");
  }

  return response.json();
};

export const getCities = async (state) => {
  const response = await fetch(
    `${BASE_URL}/cities/${encodeURIComponent(state)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  return response.json();
};

export const getRestaurants = async (state, city) => {
  const params = new URLSearchParams({ state, city });

  const response = await fetch(
    `${BASE_URL}/restaurants?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  return response.json();
};