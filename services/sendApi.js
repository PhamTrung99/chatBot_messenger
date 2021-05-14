const request = require("request");
require("dotenv").config();

module.exports = sendApi = async (url,request_body) => {
    await request({
        "uri": url,
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}