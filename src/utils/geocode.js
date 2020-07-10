const request = require('request')

const geocode = (address,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=17fb94951ab71986d3040dfdb52c77e8&query='+ address
    request({ url : url, json: true}, (error, {body} ) => {
          if (error) {
            callback('Unable to connect to location services.', undefined)
          } else if (body.success === false) {
            callback('Unable to find location. Try another search.', undefined)
          } else {
            callback(undefined, {
                    latitude: body.location.lat,
                    longitude: body.location.lon
            })
          }
    })
}

module.exports = geocode