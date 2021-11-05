const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');//returns request
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip; //parses ip request
  return request(`https://freegeoip.app/json/${ip}`); //requests coordinates
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body); //parses coordinates info
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`); //gets pass over request
};

const nextISSTimesForMyLocation = () => { //gets flyover times for location
  return fetchMyIP() //calls fetchIp and gets ip
    .then(fetchCoordsByIP) //gets coordinates
    .then(fetchISSFlyOverTimes) //gets times
    .then((data) => {
      const { response } = JSON.parse(data); //parses the data from the times
      return response; //returns it
    });
};


module.exports = { nextISSTimesForMyLocation };