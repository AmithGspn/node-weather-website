const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c45d4b29c04437d00919998da5f9b3d4/' + latitude + ',' + longitude +'?units=si'
    request({url, json: true}, (error, {body}) => {
      if (error) {
        callback('Unable to connect to the weather service!', undefined)
      } else if (body.error) {
        callback('Unable to find location', undefined)
      } else {
        callback(undefined ,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + ' . There is a ' + body.currently.precipProbability + '% chance of rain. ')
      }
    })  
}

module.exports = forecast
