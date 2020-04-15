async function getLocalCategories(lat, lon) {
  const categories = await fetch("/api/zomato/categories", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (categories) return categories.json();
}

async function getLocationInfo(lat, lon) {
  const info = await fetch("/api/zomato/geocode", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (info) return info.json();
}

async function getLocalCuisines(lat, lon) {
  const cuisines = await fetch("/api/zomato/cuisines", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (cuisines) return cuisines.json();
}

async function getRestaurantFromCategory(lat, lon, category) {
  const restaurants = await fetch("/api/zomato/search", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon, category }),
  });
  if (restaurants) return restaurants.json();
}

module.exports = {
  getLocalCategories,
  getLocationInfo,
  getLocalCuisines,
  getRestaurantFromCategory,
};
