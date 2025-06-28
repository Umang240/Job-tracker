const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localstratery = require("passport-local");
const User = require("./models/User.js");


const applicationRouter = require("./routes/Application.js");
const userRouter = require("./routes/User.js");

main().then(() => {
    console.log("connected to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/job-tracker');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionOptions = {
  secret: "mysupersceretcode",
  resave: false,
  saveUnitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstratery(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  next();
});

app.get("/demoUser", async(req,res) =>{
  let fakeuser = new User({
    email: "abc@gmail.com",
    username: "abc",
  })
  User.register(fakeuser, "hello123");
})


app.get("/", (req,res) => {
  res.render("home.ejs");
});

app.use("/application", applicationRouter );
app.use("/",userRouter);


app.listen(8080, () => {
    console.log("app is listening at port 8080");
});