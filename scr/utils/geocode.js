const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGFoc2liIiwiYSI6ImNrcGZpdmNybjI3bG0ybm5sOWt6dGt1OG8ifQ.cXEW7XgTaSqqQ21ufNpelg&limit=1'
    request ({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to local service',undefined)
        }
        else if(body.features.length==0){
            callback('Unable to find location. Try another one',undefined)
        } else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
