//contain the logic for fetching data from each API
const request = require('request');


const fetchMyIP = (callback) => { //function that grabs an ip that has a callback parameter
  request(`https://api.ipify.org/?format=json`, (error, response, body) => { //gets the IP of the user

    if (error) { //checks if there is an error first
      callback(error, null); //will log the error and the ip which is part of the callback in index.js resorts to null
      return;
    }
    if (response.statusCode !== 200) { //if status code is anything but 200 (200 means everything went well)
      callback(Error(`Status Codee ${response.statusCode} when fetching I{. Response: ${body}`), null); //Error here creates a new Error object that we can pass around
      return;
    }
    const ip = JSON.parse(body).ip; //sets ip variable to the parsed body that was returned to us by the ip request
    callback(null, ip); //logs the ip and sets error to null in index.js
  });
};

const fetchCoordsByIP = (ip, callback) => { //takes the ip variable and a callback
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => { //gets coordinates using the ip variable
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body); //creates an object with the keys latitude and longitude and makes their values equal to the lat long values of the body
    callback(null, { latitude, longitude }); //logs the lat long data
  });
};

const fetchISSFlyOverTimes = function(coords, callback) { //takes the coordinates from last function and a callback
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => { //inserts coordinates into URL
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response; //sets variables passes to the response section of the body object
    callback(null, passes); //logs the passes
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => { //first step calls function and gets ip - needs ip to get location
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => { //calls function with ip and gets location - needs location to get passes
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => { //calls function with location and gets passes - needs passes to format and get final output
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses); //logs next passes (hands it to index to format)
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };