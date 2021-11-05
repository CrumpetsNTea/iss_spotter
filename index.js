//require and run our main fetch function

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log("It worked! Returned IP:", ip);
  
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      console.log("It worked! Returned Coordinates:", coordinates);
    
      fetchISSFlyOverTimes({ latitude: 44.5698, longitude: -80.9439 }, (error, pass) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
        console.log("It worked! Returned Passes:", pass);
        // success, print out the deets!
        console.log(passTimes);
      });
    });
  });
});



 



