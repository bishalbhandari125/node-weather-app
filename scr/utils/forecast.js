const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url ='http://api.weatherstack.com/current?access_key=6b41d6ab10462fff3cfd31075b74a273&query=' + latitude + ',' + longitude 

    request ({url,json:true},(error,{body})=>{
           if(error){
               callback('Unable to connect', undefined)
           }else if(body.error){
                callback('Unable to find location', undefined)
           }
           else{
                callback(undefined, body.current.weather_descriptions + '. It is currently '+  body.current.temperature + ' degrees out there. The pressure is '+ body.current.pressure)
           }
        })

}

module.exports = forecast