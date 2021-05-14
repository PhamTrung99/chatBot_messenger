const listGenericFilmCard = require('../services/parseFilms');
const sendApi = require('../services/sendApi');
let response;

require('dotenv').config();
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const getHomePage = (req, res) => {
    res.send("Hello");
};

const getWebHook = (req, res) => {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
}

const postWebHook = (req, res) => {
    let body = req.body;
    if (body.object === 'page') {
        body.entry.forEach((entry) => {
            let webhook_event = entry.messaging[0];
            let sender_psid = webhook_event.sender.id;
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
    if (received_message) {
        if (received_message.text) {
            response = {
                "text": "Chào mừng đến với Netfix FAKE"
            };

        } else if (received_message.attachments) {
            // Xử lý khi tin đến là một attachment (image, icon, like, etc)
        }
        callSendAPI(sender_psid, response);
    }

}

async function handlePostback(sender_psid, received_postback) {
    let payload = received_postback.payload;

    if (payload === 'LIST_MOVIES') {
        const arr = await listGenericFilmCard();
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": arr
                }
            }
        }
        callSendAPI(sender_psid, response);
    } else if (payload === 'SEARCH_MOVIE') {
        response = { "text": "Phim gì nào ^-^"}
        callSendAPI(sender_psid, response);

        response = {
            "text": "Pick a color:",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"Red",
                "payload":"<POSTBACK_PAYLOAD>",
                "image_url":"http://example.com/img/red.png"
              },{
                "content_type":"text",
                "title":"Green",
                "payload":"<POSTBACK_PAYLOAD>",
                "image_url":"http://example.com/img/green.png"
              }
            ]
          }
          callSendAPI(sender_psid, response);
    }
    
}

const callSendAPI = async (sender_psid, response) => {

    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    await sendApi("https://graph.facebook.com/v2.6/me/messages", request_body);
}

module.exports = { getHomePage, getWebHook, postWebHook };