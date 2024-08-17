const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//check if user is logged in and has vaid acces token
if(req.session.authorization){
    let token = req.session.authorization['accesToken'];
    //verify JWT token
    jwt.verify(token, "acces", (err,user)=>{
        if(!err){
            req.user = user;
            next(); // proceed to the next middelware
        }else{
            return res.status(403).json({message:"User not authenticated"});
        }
    });

}else{
    return res.status(403).json({message:"User not authenticated"});
}

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("User not logged in "));
