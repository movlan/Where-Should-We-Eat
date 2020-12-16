import axios from "axios";
import tokenService from "./tokenService";

const BASE_URL = "/users";

async function login(creds) {
  try {
    const response = await axios.post(BASE_URL + "/login", creds);
    tokenService.setToken(response.data.token);
    return response.data.user;
  } catch (error) {
    return new Error(error);
  }
}

async function signup(user) {
  try {
    const response = await axios.post(BASE_URL, user);
    tokenService.setToken(response.data.token);
    return response.data.user;
  } catch (error) {
    return new Error(error);
  }
}

async function getUser() {
  try {
    const response = await axios.get(BASE_URL + "/me", {
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    // no user available with our token so lets delete it
    tokenService.removeToken();
  }
}

async function logout() {
  try {
    const response = await axios.post(
      BASE_URL + "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenService.getToken()}`,
        },
      }
    );
    tokenService.removeToken();
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

async function logoutAll() {
  try {
    const response = await axios.post(BASE_URL + "/logout/all", {
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });
    tokenService.removeToken();
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

// if we have token stored for this site we can log this user
async function logInWithToken() {
  const token = tokenService.getToken();

  // no token do nothing
  if (!token) {
    return;
  }

  // token is available lets get user info
  const user = await getUser();
  return user;
}

async function update(updates) {
  const response = await axios.patch(
    BASE_URL + "/me",
    { ...updates },
    {
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    }
  );
  if (response.status === 200) {
    return response.data;
  }
  return response.status;
}

const userService = {
  login,
  signup,
  getUser,
  logout,
  logoutAll,
  update,
  logInWithToken,
};
export default userService;
