const request = require('request');


const getGeoCode = (searchTerm, Callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=pk.eyJ1IjoicmFqaXRoYWV5ZSIsImEiOiJjandkbnVvdmMwbWJ4NDRwbGIyNzh4Mm9sIn0.Ijl4DUTzF61ROFlvI4wp8g`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            Callback("Connection Error!", undefined);
        } else if (body.features.length === 0) {
            Callback("Given Adddress is incorrect!", undefined);
        } else {
            const location = {
                long: body.features[0].center[0],
                lat: body.features[0].center[1]
            }
            Callback(undefined, location);
        }
    });
}

module.exports = {
    getGeoCode: getGeoCode
}