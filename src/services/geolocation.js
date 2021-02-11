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

  const ipRequest = await axios.get("https://api.ipify.org/?format=json");

  const ip = ipRequest.data.ip;

  const locationRequest = await axios.get(`https://ipapi.co/${ip}/json/`);

  const ipLocationData = {
    latitude: locationRequest.data.latitude,
    longitude: locationRequest.data.longitude,
  };

  if (browserLocation) {
    return browserLocation;
  } else {
    return ipLocationData;
  }
};
