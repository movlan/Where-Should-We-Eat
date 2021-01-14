function setToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

function getToken() {
  let token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }
  return token;
}

function getUserFromToken() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

function removeToken() {
  localStorage.removeItem("token");
}

const tokenService = {
  setToken,
  getToken,
  getUserFromToken,
  removeToken,
};

export default tokenService;
