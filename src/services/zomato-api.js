import axios from "axios";

async function getGeocode(lat, lon) {
  try {
    const response = await axios.post("/api/zomato/geocode", { lat, lon });
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function getRestaurant(id) {
  const restaurant = await axios.post(`/api/zomato/restaurant/${id}`);
  return restaurant;
}

async function getCategories(lat, lon) {
  const categories = await fetch("/api/zomato/categories", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (categories) return categories.json();
}

async function getCuisines(lat, lon) {
  const cuisines = await fetch("/api/zomato/cuisines", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (cuisines) return cuisines.json();
}

async function getSearchCity(query) {
  const results = await axios.post("/api/zomato/search/city", { query });

  if (results.data) return results.data.location_suggestions;
  throw new Error("City was not found");
}

async function getSearchRestaurant(city_id, query) {
  const results = await axios.post("/api/zomato/search/restaurant", {
    city_id,
    query,
  });

  if (results.data.restaurants) return results.data.restaurants;
  throw new Error("Restaurant was not found");
}

async function getRestaurantsByCityId(city_id) {
  const restaurants = await axios.post("/api/zomato/restaurants", { city_id });

  if (restaurants) return restaurants.data;
}

export {
  getCategories,
  getGeocode,
  getCuisines,
  getSearchCity,
  getSearchRestaurant,
  getRestaurantsByCityId,
  getRestaurant,
};
