/** Require system constants */
require('dotenv').config();
const config        = require('./config/index.config');
const Responser     = require('./helpers/responser')
const chalk         = require('chalk');
const morgan        = require('morgan')
const express       = require('express');
const bodyParser    = require("body-parser");
const cors          = require('cors');
const app           = express();
const mainRoutes    = require('./routes')
const db            = require('./db/mongoConnect')();

/** Express app settings */
app.use(cors({ origin: '*' }));
app.use(morgan(chalk.green.bold(`
    Method: :method 
    URL: :url
    Status: :status
    Respone-time: :response-time`)));
app.use('/public', express.static('public'))
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

/** Starting server */
app.listen(config.dotEnv.PORT, () => {
  console.log(chalk.blue(`Qurba http server is live on: ${config.dotEnv.PORT}`))
});

/** Initiate routes */
mainRoutes.initRoutes(app)


/** 404 Handler */
app.use((req, res )=> {
  return (new Responser(res).error('Not Found').status('404').send());
});