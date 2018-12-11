const request = require('request')

var getAddress = (address, callback) => {
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json' +
            '?address=' + encodeURIComponent(address) +
            '&key=AIzaSyDLgUIoTtSEdi-yy_RDGFtIscL-Tb8KajY',
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to Google Maps')
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Cannot find requested address')
        } else if (body.status === 'OK') {
            callback(undefined, {
                lat: body.results[0].geometry.location.lat,
                long: body.results[0].geometry.location.lng
            });
        }
    });
};


var getTemperature = (lat, long, callback) => {
    request({
        url: 'https://api.darksky.net/forecast/ceb562b3eea286f47e789c742754520f/' + lat + ',' + long,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to API')
        } else if (body == 400) {
            callback('The given location is invalid')
        } else {
            callback(undefined, {
                lat: body.latitude,
                long: body.longitude,
                summary: body.currently.summary
            });
        }
    });
};

module.exports = {
    getAddress,
    getTemperature
}