const mongoose =require('mongoose');

//create schema for publication

const PublicationSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

//Publication Model
const PublicationModel=mongoose.model('publications',PublicationSchema);

module.exports=PublicationModel;