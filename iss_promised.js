const request = require('request-promise-native');

const fetchMyIP = () => { //function that grabs an ip that has a callback parameter
  return request(`https://api.ipify.org/?format=json`);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};
module.exports = { fetchMyIP, fetchCoordsByIP };