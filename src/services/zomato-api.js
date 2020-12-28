import axios from "axios";

async function getGeocode(lat, lon) {
  try {
    const response = await axios.post("/api/zomato/geocode", { lat, lon });
    return response;
  } catch (err) {
    console.log(err);
  }

  // const info = await fetch("/api/zomato/geocode", {
  //   method: "POST",
  //   headers: new Headers({ "Content-Type": "application/json" }),
  //   body: JSON.stringify({ lat, lon }),
  // });
  // if (info) return info.json();
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

async function getSearch(lat, lon, establishment, category) {
  const restaurants = await fetch("/api/zomato/search", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon, establishment, category }),
  });
  if (restaurants) return restaurants.json();
}

async function getEstablishments(lat, lon) {
  const establishments = await fetch("/api/zomato/establishments", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (establishments) return establishments.json();
}

export { getCategories, getGeocode, getCuisines, getSearch, getEstablishments };
