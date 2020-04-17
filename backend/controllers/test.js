const KEY = process.env.ZOMATO_API_KEY;
const REQ_URL = "https://developers.zomato.com/api/v2.1/";
const url = `https://developers.zomato.com/api/v2.1/geocode?lat=39.7017088&lon=-105.02144`;

function foo() {
  const b = fetch(url, {
    headers: {
      "Accept": "application/json",
      "user-key": KEY,
    },
  }).then(res => console.log(res))
}

foo();