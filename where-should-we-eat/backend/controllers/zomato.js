var request = require("request");

const KEY = process.env.ZOMATO_API_KEY;
const REQ_URL = "https://developers.zomato.com/api/v2.1/";

function categories(req, res) {
  try {
    const url = `${REQ_URL}categories?lat=${req.body.lat}&lon=${req.body.lon}`;
    request.get(
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

function geocode(req, res) {
  try {
    const url = `${REQ_URL}geocode?lat=${req.body.lat}&lon=${req.body.lon}`;
    request.get(
      { url, headers: { Accept: "application/json", "user-key": KEY } },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          return res.send(data);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

function cuisines(req, res) {
  try {
    const url = `${REQ_URL}cuisines?lat=${req.body.lat}&lon=${req.body.lon}`;
    request.get(
      { url, headers: { Accept: "application/json", "user-key": KEY } },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          return res.send(data);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

function search(req, res) {
  try {
    let count = 20;
    const url = `${REQ_URL}search?lat=${req.body.lat}&lon=${req.body.lon}&category=${req.body.category}&count=${count}&radius=${req.body.radius}`;
    request.get(
      { url, headers: { Accept: "application/json", "user-key": KEY } },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          return res.send(data.restaurants);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

function establishments(req, res) {
  try {
    const url = `${REQ_URL}establishments?lat=${req.body.lat}&lon=${req.body.lon}`;
    request.get(
      { url, headers: { Accept: "application/json", "user-key": KEY } },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          return res.send(data.establishments);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  categories,
  geocode,
  cuisines,
  search,
  establishments,
};
