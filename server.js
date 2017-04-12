var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/2.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '2.png'));
});
app.get('/ui/Google.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Google.jpg'));
});
app.get('/ui/slider.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'slider.jpg'));
});
app.get('/ui/tributepage.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'tributepage.jpg'));
});
app.get('/ui/game.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'game.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
