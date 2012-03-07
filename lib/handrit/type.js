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
var data    = require('./data'),
    express = require('express'),
    step    = require('step');

module.exports = function(app, options) {
  var src, _render, _list, _item;
  var columns = [];

  if(options.hasOwnProperty("src")) {
    if (options.src.indexOf("/") === 0) {
      src = options.src.substr(1);
    }
    else {
      src = options.src;
    }
  } else {
    throw new Error("Handrit type requires a 'src' directory");
  }

  if(options.hasOwnProperty("render")) {
    _render = options.render;
  } 
  else if (options.hasOwnProperty("list") && options.hasOwnProperty("item")) {
    _list = options.list;
    _item = options.item;
  }
  else {
    throw new Error("Handrit type requires either a render or a render list and item");
  }

  // Add support for multi-column layouts
  if (options.hasOwnProperty("columns") && options.columns.length > 0) {
    columns = options.columns;
  }

  app.use(express.static(process.cwd() + '/' + src), {maxAge: 86400000});

  app.get('/' + src, function(req, res, next){
    res.local("base", src);

    data.list(src, function(err, list){
      if (err) next(err);

      var data = {
        err: err,
        list: list,
        req: req,
        res: res,
        next: next
      }

      _render ? _render(err, data) : _list(err, data);
    });
  });

  app.get('/' + src + '/:id', function(req, res, next){
    var list, item; 
    step(
      function loadList() {
        res.local("base", src);
        
        data.list(src, this);
      },
      function(err, l) {
        if (err) next(err);
        
        list = l;

        data.load(new Item(src, req.params.id, true), this)
      },
      function(err, i){
        if (err) next(err);

        item = i;
        
        if (columns.length > 0) {
          var group = this.group();

          for (var key in columns) {
            if (item[columns[key.toLowerCase()]] !== undefined) {
              data.load(new Item(src + '/' + req.params.id, item[columns[key.toLowerCase()]], true), group());
            }
          }
        }
        else {
          return [];
        }
      },
      function(err, extras) {
        if (err) next(err);

        var data = {
          err: err,
          list: list,
          item: item,
          columns: extras,
          req: req,
          res: res,
          next: next
        }

        _render ? _render(err, data) : _item(err, data);
      }
    )
  });

  app.get('/' + src + '/:id/:extra', function(req, res, next){
    express.static.send(
      req, res, next, 
      {
        root: process.cwd() + '/' + src, 
        maxAge: 86400000,
        path: req.params.id + '/' + req.params.extra
      }
    );
  });
};
