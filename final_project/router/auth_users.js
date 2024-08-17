const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{isbn:1, "username": juan, password:"carro"},
{isbn:2, "username": pedro, password:"toro"},
{isbn:3, "username": carlos, password:"reno"}
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
	    // Filter the users array for any user with the same username and password
	    let validusers = users.filter((user) => {
	        return (user.username === username && user.password === password);
	    });
	    // Return true if any valid user is found, otherwise false
	    if (validusers.length > 0) {
	        return true;
	    } else {
	        return false;
	  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
	const username = req.body.username;
    const password = req.body.password;

	    // Check if username or password is missing
	    if (!username || !password) {
	        return res.status(404).json({ message: "Error logging in" });
	    }
	
	    // Authenticate user
	    if (authenticatedUser(username, password)) {
	        // Generate JWT access token
	        let accessToken = jwt.sign({
	            data: password
	        }, 'access', { expiresIn: 60 * 60 });
	
	        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
	        return res.status(208).json({ message: "Invalid Login. Check username and password" });
	    } 
});

// Add a book review
   regd_users.put("/auth/reviews/:isbn", function(req, res) {
        	   
        	    const reviews = req.params.reviews;
        	    let book = books[reviews];  // Retrieve friend object associated with email

        	    if (book) {  // Check if book exists
        	        let isbn = req.body.isbn;
                    let author = req.author;
                    let title = req.title;
                    let reviews = req.reviews;
        	     
	
        // Update isbn if provided in request body

                if (isbn) {

                friend["isbn"] = isbn;

            }
                  if (author) {

                friend["author"] = author;

            }
                  if (title) {

                friend["title"] = title;

            }
                  if (reviews) {

                friend["reviews"] = reviews;

            }             
	        books[isbn] = book;  // Update friend details in 'friends' object
	        res.send(`Books with the isbn ${isbn} updated.`);
	    } else {
	        // Respond if friend with specified email is not found
	        res.send("Unable to find book!");
	    }

  return res.status(300).json({message: "Yet to be implemented"});
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

