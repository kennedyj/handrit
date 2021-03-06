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
var fs = require('fs'),
    step = require('step'),
    preprocess = require('./preprocess'),
    engine = require('./engine');

require('./model/item');
require('./model/author');

function findWhichItem(item, callback) {
  for (var i in engine.engines) {
    var e = engine.engines[i];

    try {
      fs.lstatSync(item._base + "/" + item._filename + "." + e.ext);
      item._filename = item._filename + "." + e.ext;
      item._filetype = e.name;

      callback(undefined, item);

      return;
    } catch (err) {}
  }

  callback(new Error('Unknown article' + item._filename), item);
  return;
}

data = {
  /** STEPS **/
  author: function(name, callback) {
    step(
      function start() {
        if (!name) return {};
        fs.readFile("authors/" + name + ".md", 'utf8', this);
      },
      function process(err, markdown) {
        if (err) { callback(err); return; }
        return preprocess.headers(markdown);
      },
      function finish(err, props) {
        if (err) { callback(err); return; }
        
        var author = new Author(name);
        
        if (props.email) author.email = props.email;
        if (props.github) author.github = props.github;
        if (props.twitter) author.twitter = props.twitter;
        if (props.location) author.location = props.location;

        return author;
      },
      callback
    )
  },
  
  /* List Items */
  list: function(dir, callback) {
    step(
      function getList() {
        fs.readdir(dir, this);
      },
      function read(err, files) {
        if (err) throw err
        
        var group = this.group()

        files.forEach(function(filename) {
          if (!new RegExp('\.(' + engine.extentions() + ')$').test(filename)) {
            return;
          }
          data.load(new Item(dir, filename), group());
        });
      },
      callback
    )
  },
  
  /* Loads an item */
  load: function(item, callback) {
    step(
      function locate() {
        if (item._find) {
          findWhichItem(item, this);
        } else {
          return item;
        }
      },
      function start(err, modItem) {
        item = modItem;
        fs.readFile(item._base + "/" + item._filename, 'utf8', this);
      },
      function load(err, filecontents) {
        if (err) { callback(err); return }

        props = preprocess.headers(filecontents);

        for (var key in props) {
          item[key] = props[key];
        }

        if (props.date) item.date = new Date(props.date); // Date.parse(props.date);

        if (props.author) {
          data.author(props.author, this);
        } else {
          return null;
        }
      },
      function fin(err, author) {
        if (err) { console.log(err.message); }

        item.author = author;

        return item;
      },
      callback
    );
  }
  
};

module.exports = data;
