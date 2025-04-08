const express = require('express');
const session = require('express-session');
const conn = require('./dbConfig');

const app = express();
app.set('view engine', 'ejs');

// Session setup
app.use(session({
    secret: 'yoursecret',
    resave: true,
    saveUninitialized: true
}));

// Static files
app.use(express.static('public'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Globals for views
app.use((req, res, next) => {
    res.locals.loggedin = req.session.loggedin || false;
    res.locals.username = req.session.username || null;
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/auth', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        conn.query('SELECT * FROM users WHERE name = ? AND password = ?', [username, password], (error, results) => {
            if (error) throw error;

            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/membersOnly');
            } else {
                req.session.message = { type: 'error', text: 'Login failed: Incorrect Username or Password' };
                res.redirect('/login');
            }
        });
    } else {
        req.session.message = { type: 'error', text: 'Please enter both Username and Password' };
        res.redirect('/login');
    }
});

app.get('/membersOnly', (req, res) => {
    if (req.session.loggedin) {
        res.render('membersOnly');
    } else {
        res.send('Please login to view this page!');
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        conn.query('SELECT * FROM users WHERE name = ?', [username], (error, results) => {
            if (error) throw error;

            if (results.length > 0) {
                req.session.message = { type: 'error', text: 'Registration failed: Username already taken' };
                res.redirect('/register');
            } else {
                conn.query('INSERT INTO users (name, password) VALUES (?, ?)', [username, password], (err) => {
                    if (err) throw err;

                    req.session.message = { type: 'success', text: 'Registration successful. You can now log in.' };
                    res.redirect('/login');
                });
            }
        });
    } else {
        req.session.message = { type: 'error', text: 'Please fill out both fields.' };
        res.redirect('/register');
    }
});

app.get('/auckland', (req, res) => {
    res.render('auckland');
});

app.get('/beaches', (req, res) => {
    res.render('beaches');
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Node app is running on http://localhost:3000');
});
