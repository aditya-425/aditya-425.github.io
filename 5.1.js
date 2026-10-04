var http = require('http'); 
var server = http.createServer((req, res) => 
{ 
res.write(req.url); 
res.end(); 
console.log("server received request"); 
}); 
server.listen((8081), () => 
{ 
console.log("server is running on port no : 8081"); 
}); 