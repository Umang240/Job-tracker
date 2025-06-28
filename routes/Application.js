const express = require("express");
const router = express.Router();
const Application = require("../models/Application.js");

// applications dashboard route
router.get("/dashboard", async(req,res) => {
    const apps = await Application.find({});
    res.render("Applications/dashboard.ejs",{apps} );
});

// new application route
router.get('/new', (req, res) => {
  res.render('Applications/form.ejs');
});

router.post('/new', async (req, res) => {
  const newapps =new Application(req.body);
  newapps.save();
  req.flash("success", "New application created");
  res.redirect('/application/dashboard');
});

// application edit routes
router.get('/edit/:id', async (req, res) => {
  const app = await Application.findById(req.params.id);
  res.render('Applications/edit.ejs', { app });
});

router.post('/edit/:id', async (req, res) => {
  await Application.findByIdAndUpdate(req.params.id, req.body);
  req.flash("success", "Application edited");
  res.redirect('/application/dashboard');
});


//application delete route
router.delete("/delete/:id", async(req,res) => {
    await Application.findByIdAndDelete(req.params.id);
    req.flash("success", "Application deleted!");
    res.redirect('/application/dashboard');
});

module.exports = router;