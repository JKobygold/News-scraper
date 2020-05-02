
$(document).ready (function(){


    var articleContain =$("$.article-container");
    $(document).on("click", ".btn.save", handleAticleSave);
    $(document).on("click", "scrape-new", handleAticleScrap);
    
    start();
    
    function start(){
      articleContain.empty();
      $.get("/api/headlines?saved=false").then(function(data){
    if(data && data.length){
      renderArticles(data);
    }else{
      alert("sorry we have no articles for you today ");
      }
    });
    }
    });
    
    function renderArticles(articles){
    
      var articlArr =[];
      for(var i=0;i<articles.length;i++){
        articlArr.push(createpanel(articles[i])); 
      }
      articleContain.append(articleArr);
    }
    
    function createpanel(article){
    
    var panel=
    $(["<div class='panel pandel-default'>",
     "div class ='panel-heading'>",
     "<h4>",
     article.headline,
     "<a class='btn btn-success save'>",
     "save Article",
     "</a>",
     "</h4>",
    "<div>",
    "<div class ='panel-body'",
    article.summary,
    "</div>",
    "</div>"
    ].join(""));
    panel.data("_id", article._id);
    return panel;
    }
    
    function handleAticleSave(){
    
      var aticlesave =$(this).parents(".panel").data();
      aticlesave.saved = true;
    
      $.ajax({
        method:"PATCH",
        url: "/api/headlines",
        data:aticlesave
    
      }).then(function(data){
     if(data.ok){
    
     }
    start();
      });
    
    }
    
    function handleAticleScrap(){
    
      $.get("/api/fetch").then(function(data){
        start();
       
      }).alert("<h3 class='text-center m-top-40>"+ data.message+"<h3>");
    }