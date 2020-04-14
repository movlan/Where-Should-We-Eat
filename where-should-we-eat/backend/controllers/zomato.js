var request = require("request");

const KEY = process.env.ZOMATO_API_KEY;
const REQ_URL = "https://developers.zomato.com/api/v2.1/";

async function cats(req, res) {
  try {
    const cats = await fetch(REQ_URL + "establishments");
  } catch (error) {}
}

async function geocode(req, res) {
  console.log(req);
  const url = `${REQ_URL}geocode?lat=${req.body.lat}&lon=${req.body.lon}`;
  console.log(url);
  request.get(
    { url, headers: { Accept: "application/json", "user-key": KEY } },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let data = JSON.parse(body);
        // console.log(data)
        return res.send(data);
      }
    }
  );
}

module.exports = {
  cats,
  geocode,
};
