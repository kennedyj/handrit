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

module.exports = function(app, options) {
  var src, render, renderList, renderItem;

  if(options.hasOwnProperty("src")) {
    src = options.src;

    if (src.indexOf("/") !== 0) {
      src = "/" + src;
    }
  } else {
    throw new Error("Handrit type requires a 'src' directory");
  }

  if(options.hasOwnProperty("render")) {
    render = options.render;
  } 
  else if (options.hasOwnProperty("renderList") && options.hasOwnProperty("renderItem")) {
    renderList = options.renderList;
    renderItem = options.renderItem;
  }
  else {
    throw new Error("Handrit type requires either a render or a renderList and renderItem");
  }
  console.log(src)
  app.get(src, data.listItem, function(req, res){
    console.log("Woo")
  });

  app.get(src + '/:id', data.listItem, data.getItem, function(req, res){
    
  });
  /*
    Find if this will work for what i need
  return function(req, res, next) {
  };
  */
};