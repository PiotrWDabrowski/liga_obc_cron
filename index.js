const cheerio = require('cheerio');
const request = require('request');

const source = 'https://www.oliviacentre.com/olivia-sports/olivia-sports-2019-2020/';

var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
    response.send('Hello World!')
})

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})

request({
    method: 'GET',
    url: source
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let matchdaysSource = $('tbody');
    body = matchdaysSource.text();
    console.log(body);
});
