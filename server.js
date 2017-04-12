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
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
app.post('/create-user', function (req, res) {
    var username=req.body.username;
     var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username, dbString],function (err,result){
         if (err){
            res.status(500).send(err.toString());
        }else {
            res.send('User successfully created: '+ username);
        }
        
    });
});
app.post('/login', function (req, res) {
    var username=req.body.username;
     var password=req.body.password;
   
    pool.query('SELECT * FROM "user" WHERE username=$1',[username],function (err,result){
         if (err){
            res.status(500).send(err.toString());
        }else {
            if (result.rows.length===0){
                res.send(403).send('usename/password is invalid');
            }else {
                var dbString=result.rows[0].password;
               var salt=dbString.split('$')[2];
               var hashedPassword=hash(password,salt);
               if(hashedPassword===dbString){
                    req.session.auth = {userId: result.rows[0].id};
               res.send('credentials correct!'); 
               }else {
                    res.send(403).send('usename/password is invalid');
               
               }
            }
           
        }
        
    });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
