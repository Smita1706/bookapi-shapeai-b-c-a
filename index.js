const express = require("express"); //importing express in index.js file
const mongoose=require('mongoose');
require('dotenv').config();

//importiong API
const Book=require('./API/book');
const Author =require('./API/author');
const Publication=require('./API/publication');
const BookModel=require('./schema/book');
mongoose.connect(
  process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
).then(()=>console.log('connection established!')).catch((err)=>{
  console.log(err);
});

const OurApp =express();  //initializing the downloaded or imported express to variable "OurApp"
OurApp.use(express.json());

// Microservices
OurApp.use("/book", Book);
OurApp.use("/author", Author);
OurApp.use("/publication", Publication);

//declare your route
OurApp.get("/",(request,response)=>{                       //call express application specify the http method specify 
  response.json({message:"Server is working"});           //the route here use request and respond methods 
});                                                       //here converting our data to json
OurApp.get("/book", async (req, res) => {
  const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
  });
OurApp.listen(4000,()=> console.log("server is running"));
