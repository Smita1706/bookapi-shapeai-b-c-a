const mongoose =require('mongoose');


//create a book schema
const BookSchema = mongoose.Schema({
    ISBN:{
        type: String,
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    authors:[Number],
    language:String,
    pubDate:String,
    numofPage:Number,
    category:[String],
    publication:Number

});

//create book model                       it tells that what we are using in schema

const BookModel=mongoose.model('books',BookSchema);//here the name should be same as written in mongoDB site.

module.exports=BookModel;