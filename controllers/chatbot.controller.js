const sendApi = require('../services/sendApi');

require('dotenv').config();
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const getHomePage = (req, res) => {
    res.send("Hello");
};

const getWebHook = (req, res) => {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            // console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}

const postWebHook = (req, res) => {
    let body = req.body;
    if (body.object === 'page') {
        body.entry.forEach((entry) => {
            let webhook_event = entry.messaging[0];
            //console.log(webhook_event);
            console.log('\n--------------------------------------------');
            console.log('chạy hàm postWebHook');
            console.log('--------------------------------------------\n');
            let sender_psid = webhook_event.sender.id;
            //console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        })
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
}

function handleMessage(sender_psid, received_message) {
    console.log('\n--------------------------------------------');
    console.log('chạy hàm handleMessage');
    console.log("received_message là: " + received_message);
    console.log('--------------------------------------------\n');
    if (received_message) {
        // Checks if the message contains text
        if (received_message.text) {
            response = {
                "text": "Chào bạn đến với cửa hàng"
            };

        } else if (received_message.attachments) {
            // Get the URL of the message attachment
            //let attachment_url = received_message.attachments[0].payload.url;

            // response = {
            //     "attachment": {
            //         "type": "template",
            //         "payload": {
            //             "template_type": "generic",
            //             "elements": [{
            //                 "title": "Is this the right picture?",
            //                 "subtitle": "Tap a button to answer.",
            //                 "image_url": attachment_url,
            //                 "buttons": [
            //                     {
            //                         "type": "postback",
            //                         "title": "Yes!",
            //                         "payload": "yes",
            //                     },
            //                     {
            //                         "type": "postback",
            //                         "title": "No!",
            //                         "payload": "no",
            //                     }
            //                 ],
            //             }]
            //         }
            //     }
            // }
        }
        callSendAPI(sender_psid, response);
    }

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    console.log('\n--------------------------------------------');
    console.log('chạy hàm handlePostback');
    console.log("received_postback là: " + received_postback);
    console.log('--------------------------------------------\n');
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'LIST_MOVIES') {
        response = { "text": "List phim đây nhé" }
    } else if (payload === 'SEARCH_MOVIE') {
        response = { "text": "oke Search ngay " }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
const callSendAPI = async (sender_psid, response) => {
    console.log('\n--------------------------------------------');
    console.log('chạy hàm callSendAPI');
    console.log("response là: " + response);
    console.log('--------------------------------------------\n');
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    await sendApi("https://graph.facebook.com/v2.6/me/messages", request_body);
}

module.exports = { getHomePage, getWebHook, postWebHook, callSendAPI };