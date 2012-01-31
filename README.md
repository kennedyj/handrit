## What is Handrit
Handrit is a basic wiki style node.js framework leveraging jade and markdown.

### Usage
Currently it relies on Express and connect. Below is a complete example. Only render, or list and item are required though.

    var handrit = require('handrit');

    handrit.type(app, {
      src: "notes",
      render: function(err, items, item, req, res, next){
        if (err) { next(err) }

        res.local("items", items || []);
        if (item === undefined) {
          res.render('notes/index', { title: "Notes list"});
        } else {
          res.local("item", item);
          res.render('notes/single', { title: res.local("item").title });
        }
      },
      list: function(err, items, req, res, next){
        res.local("items", items || []);
        res.render('notes/index', { title: "Notes list"});
      },
      item: function(err, item, req, res, next){
        res.local("item", items);
        res.render('notes/single', { title: res.local("item").title });
      }
    })

Still need to add the engine support.

    handrit.engine(app {
      name: "jade",
      ext: "jade",
      handler: function(content){
        return "<h1>Output</h1>";
      }
    })

    handrit.engine(app {
      name: "markdown",
      ext: "md",
      handler: function(content){
        return "<h1>Output</h1>";
      }
    })

### Dev Notes
Add extrapolation for the URI and the src folder  
Allow authors to be configurable  

#### What it's replacing
In addition to all of the data code, and serving static files under each item it replaces the specific routes.

    app.get('/notes', data.listNotes, function(req, res){
      res.render('notes/index', { title: "Notes list"});
    });
    
    app.get('/notes/:id', data.listNotes, data.getNote, function(req, res, next){
      res.render('notes/single', { title: res.local("note").title });
    });
    
#### How do I want it to behave
For adding transform engines

    handrit.addEngine({
      extention: "",
      callback: function(){}
    })


