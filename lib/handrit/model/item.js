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
SupportedFiles = function() { return "md|jade" }
Item = function() {};

Item.prototype = {
  _base: "",
  _filename: "",
  _filetype: undefined,
  _name: "",
  title: "Empty",
  author: "",
  date: new Date(),
  content: "### I got nothin"
}

Item = function(base, filename, find) {
  this._base = base;
  
  this._find = find || false;
  this._filename = filename || "";
  
  if (filename !== undefined) {
    this._name =  filename.replace(new RegExp('\.(' + SupportedFiles() + ')$'), '');
  }
  
  this.title = this._name;
}
