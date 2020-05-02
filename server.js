const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
var colors = require("colors");
var bodyParser = require('body-parser');
//Heroku connect/server config
var PORT = 8080;


const app = express();

//middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));

//handlebars config

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// serve static files form /public
// app.use(express.static(path.resolve(__dirname, 'public')));
  
// var db = require("./models");


// mongo setup

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsStory";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true} );


// the following are the base routes for my application
app.get("/", (req, res) => {
    res.render("Home");
});

app.get("/saved", (req, res) => {
    res.render("Saved");

});


var headlines = require("./controller/headlines");
var scrape = require("./controller/scrape");
var notescontrol = require("./controller/notes");

app.get("/api/fetch", function (req, res) {
    headlines.fetch(function (err, docs) {
        if (!docs || docs.insertedcount === 0) {
            res.json({ message: "Sorry,looks like we have nothing to show you" });
        }
        else {
            res.json({ message: "we have added :" + docs.insertedcount + " new articles" });
        }
    });
});
app.get("/api/headlines", function (req, res) {
    var query = {};
    if (req.query.saved) {
        query = req.query;
    }
    headlines.get(query, function (data) {
        res.json(data);
    });
});

app.delete("/api/headlines/:id"), function (req, res) {
    var query = {};
    query._id = req.params.id;
    headlines.delete(query, function (err, data) {
        res.json(data);
    });
};
//
app.patch("/api/headlines", function (req, res) {
    headlines.update(req.body, function (err, data) {
        res.json(data);
    });
});
//taking in notes
app.get("/api/notes:headlines_id?", function (req, res) {
    var query = {};
    if (req.params.headline_id) {
        query._id = req.params.headlines_id;
    }
    notescontrol.get(query, function (err, data) { res.json(data); });
});

//delete notes should be here

app.post("api/notes", function (req, res) {
    notescontrol.save(req.body, function (data) { res.json(data); });
});


// Start the server
app.listen(process.env.PORT||PORT,  () => {
    console.log("App running on port " + PORT + "!");
});
