const request = require('request');

var getImages = (keyword, callback) => {
    request({
        url: `https://pixabay.com/api/?key=10968987-c47c73eac958214213594df83&q=${encodeURIComponent(keyword)}&image_type=photo`,
        json: true
    }, (error, response, body) => {
        if (error) {
        	callback('Cannot connect to Pixabay');
        } else if (body.totalHits == 0) {
            callback('Cannot find image');
        } else if (body.totalHits != 0) {
        	callback(undefined, {
        		image: body.hits,
        	});
        }
    });
};

module.exports = {
    getImages
};