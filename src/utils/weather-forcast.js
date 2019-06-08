const request = require('request');

const weatherForcast = ({ lat, long }, CallBack) => {
    const url = `https://api.darksky.net/forecast/91dc5c0b95354613c633dc8870569320/${lat},${long}?units=us`;
    //request({ url:url, json: true }, (error, response) url shorthanded below
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            CallBack("Connection Error!", undefined); // instead of tru u can directly pass error message
        } else if (body.error) {
            CallBack("Something went wrong inside weather service!", undefined);
        } else {
            CallBack(undefined, body);
        }
    });
}

module.exports = {
    weatherForcast: weatherForcast
};
