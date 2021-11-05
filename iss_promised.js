const request = require('request-promise-native');

const fetchMyIP = () => { //function that grabs an ip that has a callback parameter
  return request(`https://api.ipify.org/?format=json`)
};

module.exports = { fetchMyIP };