const express = require('express');
const bodyParser = require('body-parser');

const viewEngine = require('./config/viewEngine');
const initWebRoutes = require('./routes/chatbot.route');

require("dotenv").config();

const app = express();
viewEngine(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

initWebRoutes(app);

let port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('chatbot is running on port '+ port));







