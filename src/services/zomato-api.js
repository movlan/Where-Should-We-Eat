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

  if (results) return results;
}

async function getEstablishments(lat, lon) {
  const establishments = await fetch("/api/zomato/establishments", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (establishments) return establishments.json();
}

export {
  getCategories,
  getGeocode,
  getCuisines,
  getSearchCity,
  getEstablishments,
  getRestaurant,
};
