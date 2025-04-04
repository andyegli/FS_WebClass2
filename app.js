var express = require('express');
var app = express();
var session = require('express-session');
var conn = require('./dbConfig');
app.set('view engine','ejs');
app.use(session({
    secret: 'yoursecret',
    resave: true,
    saveUninitialized: true
}))
app.use((req, res, next) => {
    res.locals.loggedin = req.session.loggedin || false;
    next();
});

// Middleware to Make the Message Available in All Views
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// Serve static files from the "public" folder
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', function (req, res){
    res.render("home");
});

app.get('/login', function (req, res){
    res.render('login.ejs');
});

// show messages on page
app.post('/auth', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      conn.query('SELECT * FROM users WHERE name = ? AND password = ?', [username, password], function(error, results) {
        if (error) throw error;
  
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/membersOnly'); // ✅ Success → go to protected page
        } else {
          req.session.message = { type: 'error', text: 'Login failed: Incorrect Username or Password' };
          res.redirect('/login'); // ❌ Failed → back to login with message
        }
      });
    } else {
      req.session.message = { type: 'error', text: 'Please enter both Username and Password' };
      res.redirect('/login');
    }
  });
  

// Users can access this if they are logged in
app.get('/membersonly', function (req, res, next) {
    if (req.session.loggedin) {
      res.render('membersOnly');
    } else {
      res.send('Please login to view this page!');
    }
  });
  
// Show registration page
app.get('/register', function (req, res) {
    res.render('register.ejs');
});

// Handle registration form submission
app.post('/register', function (req, res) {
    let name = req.body.username;
    let password = req.body.password;

    if (name && password) {
        // Check if user already exists
        conn.query('SELECT * FROM users WHERE name = ?', [name], function (error, results) {
            if (error) throw error;

            if (results.length > 0) {
                res.send('Username already taken. Please choose another one.');
            } else {
                // Insert new user
                conn.query('INSERT INTO users (name, password) VALUES (?, ?)', [name, password], function (err, result) {
                    if (err) throw err;
                    res.send('Registration successful. <a href="/login">Login here</a>.');
                });
            }
        });
    } else {
        res.send('Please enter a username and password.');
    }
});

app.get('/auckland', function (req, res){
    res.render("auckland");
});

app.get('/beaches', function (req, res){
    res.render("beaches");
});

app.get('/logout', function (req, res){
    req.session.destroy();
    res.render("home");
});


app.listen(3000, function () {
    console.log('Node app is running on http://localhost:3000');
});
