const { fetchMyIP } = require('./iss_promised');

fetchMyIP()
  .then(body => console.log(JSON.parse(body).ip));