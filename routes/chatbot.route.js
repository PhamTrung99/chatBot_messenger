const express = require('express');
const chatBotControler = require('../controllers/chatbot.controller');

let router = express.Router();

let initWebRoutes = (app)=>{
    router.get('/',chatBotControler.getHomePage);

    app.get('/webhook', chatBotControler.getWebHook);

    app.post('/webhook', chatBotControler.postWebHook);
    
    return app.use("/", router);
}

module.exports = initWebRoutes;