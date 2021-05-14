const request = require("request");
const sendApi = require("./sendApi");
require('dotenv').config();

module.exports = persistentMenu = async (sender_psid) =>{
    const url = `https://graph.facebook.com/v10.0/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`
    const request_body = {
        "recipient": {
            "id": sender_psid
        },
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Talk to an agent",
                        "payload": "CARE_HELP"
                    },
                    {
                        "type": "postback",
                        "title": "Outfit suggestions",
                        "payload": "CURATION"
                    },
                    {
                        "type": "web_url",
                        "title": "Shop now",
                        "url": "https://www.originalcoastclothing.com/",
                        "webview_height_ratio": "full"
                    }
                ]
            }
        ]
    }
    await sendApi(url, request_body);
}