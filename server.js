var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);