"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

var responseObj;

restService.post("/api",function(req,res){
console.log("received a post request");
if(!req.body) return res.sendStatus(400);
res.setHeader('Content-Type','application/json');
console.log("here is the post request from dialogflow");
console.log("request body " + JSON.stringify(req.body));
console.log("parameter form dilaogflow " + req.body.queryResult.parameters['geo-city']);
  responseObj=
  {
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "hii i am piyush weather"
              }
            }
          ]
        }
      }
    }
  }


console.log("response data " + JSON.stringify(responseObj));
return res.json(responseObj);

});



// restService.post("/cal", function(req, res) {
  
//   if (req.body.result.parameters.addition == "add"){
//     result =
//     req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.first_number
//       ? parseInt(req.body.result.parameters.second_number )+ parseInt(req.body.result.parameters.first_number)
//       : "Seems like some problem from addition. Speak again.";
//   }

//   else if(req.body.result.parameters.subtraction == "sub")
//   {
//     result =
//     req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.first_number
//       ? req.body.result.parameters.second_number - req.body.result.parameters.first_number
//       : "Seems like some problem for subtraction. Speak again.";
//   }


//   return res.json({
//     speech: result,
//     displayText: result,
//     source: "calc-app"
//   });
// });

restService.listen(process.env.PORT || 5000, function() {
  console.log("Server up and listening");
});