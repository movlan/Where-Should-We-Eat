const axios = require("axios");
require("dotenv").config();

const KEY = process.env.ZOMATO_API_KEY;
const REQ_URL = "https://developers.zomato.com/api/v2.1/";

async function geocode(req, res) {
  try {
    const url = `${REQ_URL}geocode?lat=${req.body.lat}&lon=${req.body.lon}`;
    const response = await axios.get(url, { headers: { "user-key": KEY } });
    res.send(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function restaurant(req, res) {
  try {
    const url = `${REQ_URL}restaurant?res_id=${req.params.id}`;
    const response = await axios.get(url, { headers: { "user-key": KEY } });
    res.send(response.data);
  } catch (err) {
    console.log(err);
  }
}

function categories(req, res) {
  try {
    const url = `${REQ_URL}categories?lat=${req.body.lat}&lon=${req.body.lon}`;
    axios.get(
      { url, headers: { Accept: "application/json", "user-key": KEY } },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          return res.send(data.categories);
        }
      }
    );
  } catch (error) {}
}

function cuisines(req, res) {
  try {
    const url = `${REQ_URL}cuisines?lat=${req.body.lat}&lon=${req.body.lon}`;
    axios.get(
      { url, headers: { Accept: "application/json", "user-key": KEY } },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          return res.send(data.cuisines);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function searchRestaurant(req, res) {
  try {
    console.log(req.body);
    const url = `${REQ_URL}search?entity_id=${req.body.city_id}&entity_type=city&q=${req.body.query}`;
    const response = await axios.get(url, { headers: { "user-key": KEY } });

    console.log(response.data);

    res.send(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function searchCity(req, res) {
  try {
    const url = `${REQ_URL}cities?q=${req.body.query}`;
    const response = await axios.get(url, { headers: { "user-key": KEY } });
    res.send(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function restaurants(req, res) {
  try {
    const url = `${REQ_URL}search?entity_id=${req.body.city_id}&entity_type=city`;
    const restaurants = await axios.get(url, { headers: { "user-key": KEY } });

    res.send(restaurants.data);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  categories,
  geocode,
  cuisines,
  searchRestaurant,
  searchCity,
  restaurants,
  restaurant,
};
