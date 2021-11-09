const Router = require("express").Router();

const BookModel = require('../schema/book');


// Route    - /book
// Des      - To get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
//getting all books
Router.get("/book", async (req, res) => {
    const getAllBooks = await BookModel.find();
      return res.json(getAllBooks);
    });

    // Route    - /book/:bookID
// Des      - To get a book based on ISBN
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none
//getting specific book
 Router.get("/book/:bookID", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({
        ISBN: req.params.bookID,
    });

    if (!getSpecificBook) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.bookID}`,
        });
    }

    return res.json({ book: getSpecificBook });
});


// Route    - /book/c/:category
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none
Router.get("/book/c/:category",async (req, res) => {
    const getSpecificBook = await BookModel.find({
      category:req.params.category,
    });
    if (!getSpecificBook) {
      return res.json({
          error: `No book found for the category of ${req.params.category}`,
      });
    }
    return res.json({ book: getSpecificBook });
  });

// Route    - /book/a/:author
// Des      - to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none
Router.get("/book/a/:author",async (req, res) => {
  const getSpecificBook = await BookModel.find({
    category:parseInt(req.params.author),
  });
  if (!getSpecificBook) {
    return res.json({
        error: `No book found for the category of ${req.params.author}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

//POST route
/* 
Route          /book/new
description    adding new book
access         public
parameter      none
method         post
*/
Router.post("/book/new",async (req, res) => {
    try {
        const { newBook } = req.body;
  
        await BookModel.create(newBook);
        return res.json({ message: "Book added to the database" });
    } catch (error) {
        return res.json({ error: error.message });
    }
  });

  //PUT method

// route          /book/updateTitle
// description    update title of the book
// access         public
// parameter      isbn
// method         PUT
Router.put("/book/updateTitle/:isbn", async (req, res) => {
    const { title } = req.body;
  
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            title: title,
        },
        {
            new: true,
        }
    );
  
    return res.json({ book: updateBook });
  });
  

  // route          /bookAuthor/update/:isbn
// description    update/add new author to a book
// access         public
// parameter      isbn
// method         PUT
Router.put("/book/updateAuthor/:isbn",async (req, res) => {
    const { newAuthor } = req.body;
    const { isbn } = req.params;
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: isbn,
        },
        {
            $addToSet: {
                authors: newAuthor,
            },
        },
        {
            new: true,
        }
    );
  
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: newAuthor,
        },
        {
            $addToSet: {
                books: isbn,
            },
        },
        {
            new: true,
        }
    );
  
    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: "New author was added into the database",
    });
  });
  

  //DELETE route
// route          /book/delete
// description    delete a book
// access         public
// parameter      isbn
// method         DELETE
Router.delete("/book/delete/:isbn",async (req, res) => {
    const { isbn } = req.params;
  
    const updateBookDatabase = await BookModel.findOneAndDelete({
        ISBN: isbn,
    });
  
    return res.json({ books: updateBookDatabase });
  });
  
  // route          /book/delete/author
  // description    delete an author from a book
  // access         public
  // parameter      isbn,id
  // method         DELETE
  Router.delete("/book/delete/author/:isbn/:id", async (req, res) => {
    const { isbn, id } = req.params;
  
    //updating book database object
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: isbn,
        },
        {
            $pull: {
                authors: parseInt(id),
            },
        },
        {
            new: true,
        }
    );
  
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(id),
        },
        {
            $pull: {
                books: isbn,
            },
        },
        {
            new: true,
        }
    );
  
    return res.json({
        message: "Author was deleted",
        book: updatedBook,
        author: updatedAuthor,
    });
  });
  
  module.exports = Router;