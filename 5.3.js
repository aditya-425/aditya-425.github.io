Exp4>views>profile.ejs 
<!DOCTYPE html> 
<html> 
<head> 
<title>User Profile</title> 
<style> 
body { 
font-family: Arial, sans-serif; 
margin: 30px; } 
h1  { color: #333; } 
ul {  list-style-type: square; } 
</style> 
</head> 
<body> 
<h1>Welcome, <%= user.name %>!</h1> 
<p>Age: <%= user.age %></p> 
<p>Email: <%= user.email %></p> 
<h2>Skills:</h2> 
<ul> 
<% user.skills.forEach(skill => { %> 
<li><%= skill %></li> 
<% }); %> 
</ul> 
</body> 
</html>

Exp4>4a.js 
const express = require('express'); 
const app = express(); 
const port = 5000; 
// Set EJS as the templating engine 
app.set('view engine', 'ejs'); 
// Define a route 
app.get('/', (req, res) => { 
const user = { 
name: 'Aditya', 
age: 20, 
email: 'aditya.1234@email.com', 
skills: ['JavaScript', 'Node.js', 'Express'] 
}; 
// Render the 'profile' template and pass the user data 
res.render('profile', { user }); 
}); 
// Start the server 
app.listen(port, () => { 
console.log('Server is running at http://localhost:${port}'); 
}); 
Steps to run: 
1. node -v 
2. npm i express 
3. npm install ejs 
4. node 4a.js 
