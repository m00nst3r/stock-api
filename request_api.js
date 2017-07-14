const request = require('request');

function request_url(url) {
    return request.get(url, (error, response, body) => {
        if(error) {
            console.log(error);
        }
        if(response.statusCode !== 200 ) {
            console.log('1111');
        } else {
            // console.log(body);
            return JSON.parse(body);
            // res.json({'response': JSON.parse(body)});
        }
    });
}

module.exports = request_url;