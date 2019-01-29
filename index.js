"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
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
var city=req.body.queryResult.parameters['geo-city'];
var w = getWeather(city);
console.log("data from weather " + w);
responseObj=
  {
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": w
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
 var result ;
 function cb(err,response,body){
    
  //var parse = JSON.parse(body)
  //    var weather = JSON.stringify(parse);
    var weather = JSON.parse(body);
     console.log("weather data " + weather);
     if(weather.messasge === 'city not found')
     {
         result = "unable to get weather " + weather.messasge;
        }

        else{
            result = weather.main.temp + "degree" + weather.weather[0].description;
        }
    }

    function getWeather(city){
        result = undefined;
        var url ="http://api.openweathermap.org/data/2.5/weather?q=chennai&units=Metric&appid=a460fad55c48ec9d205741d13b1376fb" 
        var req = request(url,cb);
        while(result === undefined)
        {
            require('deasync').runLoopOnce();
        }
        return result;
    }

restService.listen(process.env.PORT || 4000, function() {
  console.log("Server up and listening");
});

