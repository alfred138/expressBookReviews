const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
// Check if a user with the given username already exists
const doesExist = (username) => {
	    // Filter the users array for any user with the same username
	    let userswithsamename = users.filter((user) => {
	        return user.username === username;
	    });
	    // Return true if any user with the same username is found, otherwise false
	    if (userswithsamename.length > 0) {
	        return true;
	    } else {
	        return false;
	}
}
    

    
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
// chequee si se proporciona tanto el usuario como la contraseña
if(username && password){
    // compruebe si el usuario aun no existe
    if(!doesExist(username)){
        // add el nuevo usuario al array users
        users.push({"username": username, "password": password});
        return res.status(300).json({message: "Yet to be implemented"});

    }else{
       return res.status(404).json({message:"User already exists!"});  
    }

}

 
});

// Get the book list available in the shop
public_users.get('/',(req, res)=> {
// send JSON response with formatted books data
   res.send(JSON.stringify(books,null,4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const aut = req.params.author;
    res.send(books[aut]);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const tit = req.params.title;
    res.send(books[tit]);
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/reviews/:isbn',function (req, res) {
    const reviews = req.params.reviews;
    res.send(books[reviews]);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

