async function getLocalCategories(lat, lon) {
  const categories = await fetch("/api/zomato/cats", { lat, lon });
  console.log(categories);
}

async function getLocationInfo(lat, lon) {
  const categories = await fetch("/api/zomato/geocode", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ lat, lon }),
  });
  if (categories) return categories.json();
}

module.exports = {
  getLocalCategories,
  getLocationInfo,
};
