const Router = require("express").Router();
const PublicationModel = require("../schema/publication");

// Route    - /publication
// Des      - to get all publication
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
Router.get("/publication",async (req,res)=>{
    const getAllPublication= await PublicationModel.find();
    return res.json(getAllPublication);
  });
  
  // Route    - /publication/:publicationName
  // Des      - To get a author based on name
  // Access   - Public
  // Method   - GET
  // Params   - publicationName
  // Body     - none
  //getting specific publication
  Router.get("/publication/:publicationName",async (req,res)=>{
      const getSpecificPublication = await PublicationModel.find({
        name:req.params.publicationName,
      });
      if(!getSpecificPublication){
        return res.json({
          error:`no publication found for name of ${req.params.publicationName}`
        });
      }
      return res.json({publication:getSpecificPublication});
    });
  
  // Route    - /publication/b/:bookName
  // Des      - to get a list of publication based on book
  // Access   - Public
  // Method   - GET
  // Params   - book
  // Body     - none
  //listen to our port
Router.get("/publication/b/:bookName",async(req,res)=>{
   const getSpecificPublication = await PublicationModel.find({
     books:req.params.bookName,
   });
   if(!getSpecificPublication){
     return res.json({
       error:`no publication found for book name of ${req.params.bookName}`,
     });
   }
   return res.json({publication: getSpecificPublication});
  });
  
  /* 
Route          /publication/new
description    adding new publication
access         public
parameter      none
method         post
 */
Router.post("/publication/new",(req,res)=>{
    const {newPublication}=req.body;
  
    //add new data
    PublicationModel.create(newPublication);
    return res.json({message:"Publication is addedd tothe database"});
  });

  // route          /publication/updateTitle
// description    update name of the publication
// access         public
// parameter      id
// method         PUT
Router.put("/publication/updateName/:id",async(req,res)=>{
    const { name } = req.body;
  
    const updatePublication= await PublicationModel.findOneAndUpdate(
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
  
    return res.json({ publication: updatePublication });
  });
  

// Route               /publication/delete
// Description         delete an publication
// Access              PUBLIC
// Parameters          id
// Method              DELETE

 Router.delete("/publication/delete/:id",async(req,res)=>{
    const {id}=req.params;
  
    const updatePublication = await PublicationModel.findOneAndDelete({
      id:id,
    });
   return res.json({publication:updatePublication});
  }); 
  
  
 
  // Route               /publication/delete/book
  // Description         delete an book from a publication
  // Access              PUBLIC
  // Parameters          id, isbn
  // Method              DELETE
 
   OurApp.delete("/publication/delete/book/:isbn/:id", (req, res) => {
    const { isbn, id } = req.params;
  const update
    
  
    return res.json({ book: Database.Book, publication: Database.Publication });
  });

  module.exports = Router;