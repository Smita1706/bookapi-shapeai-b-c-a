const Router = require("express").Router();
const AuthorModel = require("../schema/author");

// Route    - /author
// Des      - to get all authors
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
Router.get("/author",async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
    });
  
  // Route    - /author/:authorID
  // Des      - To get a author based on ID
  // Access   - Public
  // Method   - GET
  // Params   - authorID
  // Body     - none
  //getting specific author
    Router.get("/author/:authorName", async(req, res) => {
      const getSpecificAuthor =await AuthorModel.findOne({
        name:req.params.authorName,
      })
      if(!getSpecificAuthor){
        return res.json({
          error:`No author found for name of ${req.params.authorName}`,
        });
      }
      return res.json({ author: getSpecificAuthor });
      
  });
  
  // Route    - /author/b/:bookName
  // Des      - to get a list of author based on book
  // Access   - Public
  // Method   - GET
  // Params   - book
  // Body     - none
  //listen to our port
  Router.get("/author/b/:bookName", async (req,res)=>{
      const getSpecificAuthor = await AuthorModel.find({
        books:req.params.bookName,
      });
      if(!getSpecificAuthor){
        return res.json({
          error:`no author found for book name of ${req.params.bookName}`,
        });
      }
      return res.json({author:getSpecificAuthor});
  });
  
  /* 
Route          /author/new
description    adding new author
access         public
parameter      none
method         post
*/
Router.post("/author/new",(req,res)=>{
    const {newAuthor}=req.body;
  
    //add new data
    AuthorModel.create(newAuthor);
  
      return res.json({ message: "Author added to the database" });
  });
  

//TASK
// route          /author/updateTitle
// description    update title of the author
// access         public
// parameter      id
// method         PUT
Router.put("/author/updateName/:id",async(req,res)=>{
    const { name } = req.body;
  
    const updateAuthor= await AuthorModel.findOneAndUpdate(
        {
            id: req.params.id,
        },
        {
            name: name,
        },
        {
            new: true,
        }
    );
  
    return res.json({ author: updateAuthor });
  });
  

// Route               /author/delete
// Description         delete an author
// Access              PUBLIC
// Parameters          id
// Method              DELETE

 Router.delete("/author/delete/:id", async (req, res) => {
    const { id } = (req.params);
  
    const updateAuthor = await AuthorModel.findOneAndDelete({
        id: id,
    });
  
    return res.json({ author: updateAuthor });
  }); 
  
  module.exports = Router;