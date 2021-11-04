//contain the logic for fetching data from each API
const request = require('request');


const fetchMyIP = (callback) => {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Codee ${response.statusCode} when fetching I{. Response: ${body}`;
      callback(Error(msg), null); //Error here creates a new Error object that we can pass around
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };