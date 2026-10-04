var http = require('http'); 
var fs = require('fs'); 
const content = 'HTML, CSS, JAVASCRIPT, TYPESCRIPT, MONGODB, EXPRESS JS, 
REACT JS'; 
fs.writeFile("src.txt", content, (err) => 
{ 
if (err) 
{ 
console.log("Error occurred in writing 
the content to the file"); 
return; 
} 
console.log("src.txt gets created successfully"); 
}); 