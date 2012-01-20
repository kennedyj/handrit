/**
 * Module dependencies.
 */
var express = require('express'),
    handrit = require('handrit'),
    markdown = require("node-markdown").Markdown,
    jade = require('jade');

var app = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
});

app.get('/', function(req, res){
  res.render('page', { title: 'landing' });
});

handrit.type(app, {
  src: "notes",
  render: function(err, items, item, req, res, next){
    if (err) { next(err) }

    res.local("items", items || []);
    if (item === undefined) {
      res.render('page', { title: "Notes list"});
    } else {
      res.local("item", item);
      res.render('page', { title: res.local("item").title });
    }
  }
})

app.helpers({
  transform: function(item, context) {
    if (typeof item.filetype == "undefined" || item.filetype == "markdown") {
      return markdown(item.content);
    } else if (item.filetype === "jade") {
      return jade.compile(item.content, false)(context);
    }
  }
})

if (!module.parent) {
  app.listen(3020);
  console.log("Express server listening on port %d (%s)", app.address().port, app.settings.env);
}
