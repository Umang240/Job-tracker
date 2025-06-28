const express = require("express");
const router = express.Router();
const User = require("../models/User.js")

router.get("/signup", (req,res) => {
    res.render("users/signup.ejs");
})

router.post("/signup",async (req,res) =>{
    try{
        let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    req.flash("success", "User registered successfully");
    res.redirect("/");
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/");
    }
});
 
module.exports = router;