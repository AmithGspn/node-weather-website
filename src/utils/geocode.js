const request = require('request')

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW1pdGhnc3BuIiwiYSI6ImNrMjhxOGE2ZTA1dWYzY3Bld3ByeW9haGcifQ.tXGS49ivXiswo-wZGmyI6g&limit=1'
    request ({url, json: true}, (error, {body}) => {
      if (error) {
       callback ('Unable to connect to the location service',undefined)
      } else if (body.features.length === 0) {
       callback ('Unable to find location. Try an other search',undefined)
      } else {
       callback (undefined,{
       latitude: body.features[0].center[1],
       longitude: body.features[0].center[0],
       location: body.features[0].place_name
       })
      }
    })
}

module.exports = geoCode