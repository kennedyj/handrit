## What is Handrit
Handrit is a basic wiki style node.js framework leveraging jade and markdown.


How do I want it to behave

handrit.addType('folder');
	It does
		new Class Item('folder')
	function list"new item"
	function get"new item"

You add
route.get('folder', handrit.type('folder'))

-- Not used currently --
app.use(handrit.type({
  src: "",
  render: function(){},
  renderList: function(){},
  renderItem: function(){}
}))

handrit.type({
  src: "",
  render: function(){},
  renderList: function(){},
  renderItem: function(){}
})

handrit.addEngine({
  extention: "",
  callback: function(){}
})

### Examples

app.get('/notes', data.listNotes, function(req, res){
  res.render('notes/index', { title: "Notes list"});
});

app.get('/notes/:id', data.listNotes, data.getNote, function(req, res, next){
  res.render('notes/single', { title: res.local("note").title });
});

app.use(expressUglify.middleware({ src: __dirname + '/public' }));
