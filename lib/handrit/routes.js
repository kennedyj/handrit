/*
Copyright (c) 2012 Josh Kennedy <josh@vsso.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var data = require('./data');

module.exports = function(app){
  var locals = {
    scripts: [],
    stylesheets: []
  }


  app.get('/', function(req, res){
    res.render('index', { title: 'landing' });
  });
  
  app.get('/notes', data.listNotes, function(req, res){
    res.render('notes/index', { title: "Notes list"});
  });
  
  app.get('/notes/:id', data.listNotes, data.getNote, function(req, res, next){
    res.render('notes/single', { title: res.local("note").title });
  });
  
  /* Error Pages */
  app.use(function(req, res, next) {
    var err = new Error("It's missing, oh noes!");
    err.status = 404;
    err.title = "Is it in the couch cushions?"

    next(err);
    //res.render('error', { status: 404, title: "", message: ""});
  });

  app.use(function(err, req, res, next){
    res.render('error', { 
      error: err, 
      status: err.status || 500,
      message: err.message || "Note quite sure what happened, but don't do it again.",
      title: err.title || "Whoopsie daisy"
    });
  });

  app.get("/404", function(req, res, next) {
    var err = new Error("It's missing, oh noes!");
    err.status = 404;
    err.title = "Is it in the couch cushions?"

    next(err);
  });

  app.get('/403', function(req, res, next){
    var err = new Error('Thou shalt not pass');
    err.status = 403;
    err.title = "Who are you?"

    next(err);
  });

  app.get("/500", function(req, res, next) {
    var err = new Error('For the love of god, why!');
    err.status = 500;
    err.title = "Whoopsie daisy"

    next(err);
  });
};