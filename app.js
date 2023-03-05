const express = require("express");
const properties = require("./config/properties");
const database = require("./config/database");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express()
const exceptionHandler = require("./middleware/exceptionHandler");
const responseHandler = require("./middleware/responseHandler");

//initialize express router
var router = express.Router();

database();



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({
  extended: true,
});

app.use(bodyParserURLEncoded);
app.use(bodyParserJSON);

// set assets/images as public folder
app.use('/assets', express.static(__dirname + "/assets"));

// Error handling
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  ); 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(`/api/v${properties.API_VERSION}`, router);
routes(router);

app.use(responseHandler);
app.use(exceptionHandler);

app.listen(properties.PORT, () => {
  console.log(`Example app listening on port ${properties.PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})