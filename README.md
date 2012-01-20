## What is Handrit
Handrit is a basic wiki style node.js framework leveraging jade and markdown.

### Usage
Currently it relies on Express, hopefully I can change that. Below is a complete example. Only render or list and get are required though. Currently only render is supported

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
      get: function(err, item, req, res, next){
        res.local("item", items);
        res.render('notes/single', { title: res.local("item").title });
      }
    })

Still need to add the engine support.

### Dev Notes

#### What it's replacing

    app.get('/notes', data.listNotes, function(req, res){
      res.render('notes/index', { title: "Notes list"});
    });
    
    app.get('/notes/:id', data.listNotes, data.getNote, function(req, res, next){
      res.render('notes/single', { title: res.local("note").title });
    });
    
    app.use(expressUglify.middleware({ src: __dirname + '/public' }));
    
#### How do I want it to behave
For adding transform engines

    handrit.addEngine({
      extention: "",
      callback: function(){}
    })


#### If Express and Connect
You add

    route.get('folder', handrit.type('folder'))

-- Not used currently --  
This relies on Express/Connect

    app.use(handrit.type({
      src: "",
      render: function(){},
      renderList: function(){},
      renderItem: function(){}
    }))
    


