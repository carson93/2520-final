const express = require('express');
const request = require('request');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

const weather = require('./weather')
const images = require('./images')


var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
	response.render('home.hbs', {
		title: 'Images',
	})
})


app.post('/', (request, response) => {
	images.getImages(request.body.keyword, (error, results) => {
		if (error) {
			console.log(error);
		} else {
			response.render('home.hbs', {
				title: 'Images',
				img1: results.image[0].webformatURL,
				img2: results.image[1].webformatURL,
				img3: results.image[2].webformatURL
			});
		}
	})
});


app.get('/weather', (request, response) => {
	response.render('weather.hbs', {
		title: 'Weather'
	})
})

app.post('/weather', (request, response) => {
	weather.getAddress(request.body.location, (error, results) => {
		if (error) {
			console.log(error);
		} else {
			weather.getTemperature(results.lat, results.long, (error, results) => {
				if (error) {
					console.log(error);
				} else {
					response.render('weather.hbs', {
						title: 'Weather',
						returned: true,
						icon: results.summary
					})
				}
			})
		}
	})
});


app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});