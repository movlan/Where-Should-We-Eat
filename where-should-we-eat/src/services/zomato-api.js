async function getCategories(lat, lon) {
  const categories = await fetch("/api/zomato/categories", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (categories) return categories.json();
}

async function getGeocode(lat, lon) {
  const info = await fetch("/api/zomato/geocode", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (info) return info.json();
}

async function getCuisines(lat, lon) {
  const cuisines = await fetch("/api/zomato/cuisines", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (cuisines) return cuisines.json();
}

async function getSearch(lat, lon, radius, category) {
  const restaurants = await fetch("/api/zomato/search", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon, radius, category }),
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

module.exports = {
  getCategories,
  getGeocode,
  getCuisines,
  getSearch,
  getEstablishments,
};
