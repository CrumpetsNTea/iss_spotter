const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = (passTimes) => { //takes the pass/risetimes and formats them to be readable
  for (const pass of passTimes) { //loops through all the risetimes
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);//formats all the date information
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`); //logs readable passtimes
  }
};


nextISSTimesForMyLocation() //calls this function which is a function containing promises to our other functions in iss_promised
  .then((passTimes) => { //once that's done it will execute an anonymous function with passTimes as a parameter
    printPassTimes(passTimes); //which executes printPassTimes function with passTimes as argument
  })
  .catch((error) => { //error statement - .catch() is if promise goes into rejected state (if an error)
    console.log("It didn't work: ", error.message); //logs error message
  }); //Now, if there is ever an error anywhere along our chain of promises, execution will jump to our