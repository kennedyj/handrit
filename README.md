## What is Handrit
Handrit is a basic wiki style node.js framework leveraging jade and markdown.

### Usage
Currently it relies on Express and connect. Below is a complete example. Only render, or list and item are required though.

    var handrit = require('handrit');

    handrit.type(app, {
      src: "notes",
      render: function(err, data){
        if (err) { next(err) }

        res.local("items", items || []);
        if (item === undefined) {
          res.render('notes/index', { title: "Notes list"});
        } else {
          res.local("item", item);
          res.render('notes/single', { title: res.local("item").title });
        }
      },
      list: function(err, data){
        res.local("items", data.list || []);
        res.render('notes/index', { title: "Notes list"});
      },
      item: function(err, data){
        res.local("item", data.item);
        res.render('notes/single', { title: res.local("item").title });
      }
    })

Example of a multi column layout. Columns are case-insensitive

    handrit.type(app, {
      src: "notes",
      columns: ["right"],
      render: function(err, data){
        if (err) { next(err) }

        res.local("items", data.list || []);
        if (data.item === undefined) {
          res.render('notes/index', { title: "Notes list"});
        } else {
          res.local("item", data.item);
          res.render('notes/single', { title: res.local("item").title });
        }
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
