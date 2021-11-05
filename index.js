//require and run our main fetch function

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

fetchMyIP((error, ip) => { //calls to get ip
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);
  
  fetchCoordsByIP(ip, (error, coordinates) => { //gets coordinates with ip
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log("It worked! Returned Coordinates:", coordinates);
    
    fetchISSFlyOverTimes(coordinates, (error, pass) => { //gets risetimes with coordinates
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      console.log("It worked! Returned Passes:", pass); 
      
      const printPassTimes = (passTimes) => { //takes the pass/risetimes and formats them to be readable
        for (const pass of passTimes) { //loops through all the risetimes
          const datetime = new Date(0);
          datetime.setUTCSeconds(pass.risetime);//formats all the date information
          const duration = pass.duration;
          console.log(`Next pass at ${datetime} for ${duration} seconds!`); //logs readable passtimes
        }
      };
      nextISSTimesForMyLocation((error, passTimes) => {
        if (error) {
          return console.log("It didn't work!", error);
        }
        // success, print out the deets!
        printPassTimes(passTimes); //calls the formatting function with the received passtimes from all prior steps
      });
    });
  });
});






