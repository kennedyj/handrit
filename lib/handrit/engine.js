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

var markdown = require("node-markdown").Markdown,
    jade = require('jade');

var exports = module.exports;

exports.engines = [];
exports.add = function(options) {
  if (options.name === undefined || options.name == "") {
    throw "name must be specified"
  } 

  if (options.ext === undefined || options.ext == "") {
    throw "ext must be specified"
  }

  if (options.handler === undefined || typeof options.handler != 'function') {
    throw "handler must be a function"
  }

  // Check if duplicate
  for (var index in exports.engines) {
    var e = exports.engines[index]

    if (e.name == options.name || e.ext == options.ext) {
      throw "duplicate engine: " + e.name
    }
 }

  exports.engines.push(options)
}

exports.extentions = function() {
  var ext = [];

  for (var i in exports.engines) {
    ext.push(exports.engines[i].ext)
  }

  return ext.join("|");
}

// Init default engines
exports.add({
  name: "markdown",
  ext: "md",
  handler: function(content){
    return markdown(content);
  }
})

exports.add({
  name: "jade",
  ext: "jade",
  handler: function(content, context){
    return jade.compile(content, false)(context);
  }
})

