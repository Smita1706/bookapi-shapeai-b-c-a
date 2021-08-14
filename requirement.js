/*
Requirments

Book 
-ISBN            -string   //international standard book number
-Title           -string
-author          -[string]
-lang            -string
-publication     -number
-no of pages     -number
-category        -[string]

Author
-id                -number
-name              -string
-books             -[string]


Publicatioon
-id                -number
-name              -string
-books             -[string]

--------APIs---------
Book
-GET
  -to get all books
  -to get specific book
  -to get a list of books based on category
  -to get a list of books based on author

-POST
  -to add new book

-PUT
  -to update book details
  -to update/add new author

-DELETE
  -delete a book
  -delete author from book

Authors  
-GET
  -to get all authors
  -to get specific author
  -to get a list of author based on book
  

-POST
  -to add new author
  -to update/add new book

-PUT
  -to update author details
  

-DELETE
  -delete a authors
 
Publication
-GET
  -to get all publications
  -to get specific publication
  -to get a list of publication based on book
  

-POST
  -to add new publication

-PUT
  -to update publication details
  -to update/add new book

-DELETE
  -delete a publication




*/