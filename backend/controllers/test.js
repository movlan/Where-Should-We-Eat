const axios = require("axios");

async function foo() {
  const ip = await axios.get("https://checkip.amazonaws.com/");
  console.log(ip.data);
}

foo();
