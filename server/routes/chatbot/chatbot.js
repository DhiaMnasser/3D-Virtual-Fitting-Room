const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {talkToChatbot, eventToChatbot} = require("./talkToChatbot");

var router = express.Router();
var jsonParser = bodyParser.json();
var urlEncoded = bodyParser.urlencoded({ extended: true });

router.post("/", jsonParser, urlEncoded,function (req, res, next) {
  const message = req.body.message;
  console.log("message" + message);

  talkToChatbot(message)
    .then((response) => {
  console.log("response" + response);

      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
      res.send({
        error: "Error occured here"
      });
    });
});

router.post("/eventQuery", jsonParser, urlEncoded,function (req, res, next) {
  const event = req.body.event;
  console.log("message" + event);

  eventToChatbot(event)
    .then((response) => {
  console.log("response" + response);

      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
      res.send({
        error: "Error occured here"
      });
    });
});

module.exports= router;
