const mongoose =require('mongoose');

//create schema for author

const AuthorSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

//AuthorModel
const AuthorModel=mongoose.model('authors',AuthorSchema);

module.exports=AuthorModel;