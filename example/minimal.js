/**
 * Module dependencies.
 */
var express = require('express'),
    handrit = require('handrit'),
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
  render: function(err, data){
    if (err) { data.next(err) }

    // Add the list of items to the page context
    data.res.local("items", data.list || []);

    // Check if this is an item or a listing page
    if (data.item === undefined) {
      data.res.render('page', { title: "Notes list"});
    } else {
      // Add the item to the page context
      data.res.local("item", data.item);
      data.res.render('page', { title: data.res.local("item").title });
    }
  }
})

handrit.engine.add({
  name: "html",
  ext: "html",
  handler: function(content){
    return content;
  }
})

handrit.helpers(app);

if (!module.parent) {
  app.listen(3020);
  console.log("Express server listening on port %d (%s)", app.address().port, app.settings.env);
}
