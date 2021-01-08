import publicIp from "public-ip";
import ipLocation from "iplocation";

export function getBrowserLocation() {
  // Wrap getCurrentPosition to return a promise
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((pos) =>
      resolve({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      })
    );
  });
}

export const getCurrentLatLon = async () => {
  const ip = await publicIp.v4({
    fallbackUrls: ["https://ifconfig.co/ip"],
  });
  const location = await ipLocation(ip);

  return location;
};
