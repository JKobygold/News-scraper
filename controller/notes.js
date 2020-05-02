var Note = require("../models/Noote");

module.exports ={
   get: function(data,scr){
       Note.find({
           headlineId:data._id

       },scr);
   },
   save: function(data,scr){
      varnewNote={
          _headlineId:data.id,
          noteText:data.noteText
      };
      Note.create(newNote,function(err,doc){
          if(err){
              console.log(err);
          }else{
              console.loh(doc);
              scr(doc);
          }
      });

   },
   delete: function(data,scr){
       Note.remove({
           _id:data.id
       },scr);
   }

};