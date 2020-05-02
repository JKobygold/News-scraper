var scrape =require("./scrape");


var headline =require("../models/Arrticles");

module.exports ={
fetch: function(scr){
    scrape(function(data){
        var articles=data;
        for(var i=0; i<articles.length;i++){
            articles[i].saved=false;
        }
        headline.collection.insertMany(articles,{ordered:false},function(err,docs){
              scr(err,docs);
        });
    });
  
},

delete:function(query,scr){
    headline.remove(query,scr);
},

get: function(query,scr){
    headline.find(query).sort({_id:-1}).exec(function(err,doc){scr(doc)})
},
update:function(query,scr){
    headline.update({_id:query._id},{$set:query},{},scr);
}

};