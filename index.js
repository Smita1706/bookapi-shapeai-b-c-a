const express = require("express"); //importing express in index.js file

const OurApp =express();  //initializing the downloaded or imported express to variable "OurApp"

//declare your route
OurApp.get("/",(request,response)=>{                          //call express application specify the http method specify 
  response.json({message:"Request served!!!!!!!"});           //the route here use request and respond methods 
});                                                           //here converting our data to json


//listen to our port
OurApp.listen(4000,()=> console.log("server is running"));