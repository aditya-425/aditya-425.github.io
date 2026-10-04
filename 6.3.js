const express=require('express'); 
const session = require('express-session'); 
const cookieParser = require('cookie-parser'); 
const app = express(); 
const PORT = 8081; 
// Middleware setup 
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true })); 
// Session setup 
app.use( 
session({ 
secret: 'mySecretKey123', // Change to a secure key 
resave: false, 
saveUninitialized: true, 
cookie: { maxAge: 60000 }, // 1 minute 
}) 
); 
// Home Route 
app.get('/', (req, res) => { 
if (req.session.username) { 
res.send(` 
<h1>Welcome back, ${req.session.username}!</h1> 
<p><a href="/logout">Logout</a></p> 
`); 
} else { 
res.send(` 
<h1>Welcome Guest</h1> 
<form method="POST" action="/login"> 
<input type="text" name="username" placeholder="Enter Username" required/> 
<button type="submit">Login</button> 
</form> 
`); 
} 
}); 
// Login Route 
app.post('/login', (req, res) => { 
const { username } = req.body; 
if (username) { 
req.session.username = username; 
res.cookie('username', username); 
res.redirect('/'); 
} else { 
res.send('Login failed. No username provided.'); 
} 
}); 
// Logout Route 
app.get('/logout', (req, res) => { 
res.clearCookie('username'); 
req.session.destroy((err) => { 
if (err) { 
return res.send('Error logging out.'); 
} 
res.redirect('/'); 
});
 
}); 
// Server listening 
app.listen(PORT, () => { 
console.log(`Server is running at http://localhost:${PORT}`); 
}); 



//Steps to run: 
//1. node -v 
//2. npm -v 
//3. npm init -y 
//Setup Instructions 
//First, install dependencies: 
//1. npm install express express-session 
//2. npm list express 
//3. npm list express-session 
//4. npm install cookie-parser 