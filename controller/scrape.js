var cheerio = require("cheerio");
var axios = require("axios");
var colors = require("colors");

var scrape = function (scr) {

  axios.get("http://www.nytimes.com/").then((urlResponse) => {
    var $ = cheerio.load(urlResponse.data);

    var articles = [];

    $("article.css-8atqhb").each((i, element) => {
      var link = $(element)
        .find("a")
        .attr("href");
      console.log(link);
      console.log("---------");



      var title = $(element)
        .find("h2")
        .text();
      console.log(title);

      var summary = $(element)
        .find("p")
        .text();
      console.log(summary.green);

      var articleData = {
        summary: summary,
        title: title,
        link: link

      };
      articles.push(articleData);
    });
    scr(articles);
  });

};
module.exports = scrape;

