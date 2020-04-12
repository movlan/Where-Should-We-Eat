const BASE_URL = "/users/";

async function login(creds) {
  try {
    const res = await fetch(BASE_URL + "login", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(creds),
    });
    console.log(res);
    if (res.ok) return res.json();
  } catch (err) {
    return console.log(err);
  }
}

export default {
  login,
};
