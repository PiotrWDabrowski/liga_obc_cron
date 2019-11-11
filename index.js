const cheerio = require('cheerio');
const request = require('request');

const source = 'https://www.oliviacentre.com/olivia-sports/olivia-sports-2019-2020/';

request({
    method: 'GET',
    url: source
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let title = $('tbody');

    console.log(title.text());
});
