const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=17fb94951ab71986d3040dfdb52c77e8&query='+longitude+','+latitude
    
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        } else if(body.error) {
            callback('Unable to find location. Please try another search.', undefined)
        } else {
            callback(undefined, body.current.wind_dir, body.current.temperature, body.current.feelslike, body.current.humidity)
        }
    })

}

module.exports = forecast
