const cheerio = require('cheerio');
const express = require('express');
const admin = require('firebase-admin');
const moment = require('moment')();
const request = require('request');

const source = 'https://www.oliviacentre.com/olivia-sports/olivia-sports-2019-2020/';

var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
    processMatchDaysWithCron(response);
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://obc-liga.firebaseio.com/'
});

function processMatchDaysWithCron(response) {
    getMatchDaySource((matchDaySource) => {
        sendMatchDaySource(matchDaySource, response);
    });
}

function sendMatchDaySource(matchDaySource) {
    admin.database().ref('matchdaysSource').set(matchDaySource);
}

function getMatchDaySource(matchDaySourcePromise, response) {
    return request({
        method: 'GET',
        url: source
    }, (err, res, body) => {

        if (err) return console.error(err);

        let $ = cheerio.load(body);

        let timeHeader = moment.format('MMMM Do YYYY, h:mm:ss a');
        let matchdaysSource = $('tbody').html();
        matchDaySourcePromise(matchdaysSource);
        let responseCode = `${timeHeader} <br /> ${matchdaysSource}`;
        if (response) {
            response.send(responseCode);
        }

    });
}
