var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({

    headline: {
        type: String,
        required: true
      },
      summary: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
    });

// This creates our model from the above schema, using mongoose's model method
var Arrticle = mongoose.model("Arrticle", ArticleSchema);

// Export the Note model
module.exports = Arrticle;

    