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
    md5 = require('./md5'),
    jade = require('jade'),
    datetime = require('datetime');

module.exports = function(app){
  app.helpers({
    transform: function(item, context) {
      if (typeof item._filetype == "undefined" || item._filetype == "markdown") {
        return markdown(item.content);
      } else if (item._filetype === "jade") {
        return jade.compile(item.content, false)(context);
      }
    },
    formatDate: function formatDate(val) {
      return datetime.format(new Date(val), '%A, %B %e, %Y');
    },
    formatDateCustom: function formatDateCustom(val, format, tz, locale) {
      return datetime.format(new Date(val), format, tz, locale);
    },
    github: function github(name) {
      return '<a href="http://github.com/' + name + '">' + name + '</a>';
    },
    bitbucket: function bitbucket(name) {
      return '<a href="http://bitbucket.com/' + name + '">' + name + '</a>';
    },
    twitter: function twitter(name) {
      return '<a href="http://twitter.com/' + name + '">' + name + '</a>';
    },
    gravitar: function gravitar(email, size) {
      size = size || 200;
      return "http://www.gravatar.com/avatar/" +
        md5.md5((email+"").trim().toLowerCase()) +
        "?s=" + size + "";
    }
  })
}
