import axios from "axios";

const getBrowserLocation = () => {
  return new Promise(
    (resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (err) => resolve(undefined)
      );
    },
    (reject) => reject(undefined)
  );
};

export const getCurrentLatLon = async () => {
  const browserLocation = await getBrowserLocation();

  /*** Cant figure out how to make this request while deployed to heroku ***/
  // const ipRequest = await axios.get("https://api.ipify.org/?format=json");

  // const ip = ipRequest.data.ip;

  // const locationRequest = await axios.get(`https://ipapi.co/${ip}/json/`);

  const ipLocationDefaultData = {
    latitude: 39.7392,
    longitude: -104.9903,
  };

  if (browserLocation) {
    return browserLocation;
  } else {
    return ipLocationDefaultData;
  }
};
