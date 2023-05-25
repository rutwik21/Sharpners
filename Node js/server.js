const http = require('http');

const server = http.createServer((req,res)=>{
    console.log("rutwik");
});

server.listen(4000);