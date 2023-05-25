const http = require('http');

const server = http.createServer((req,res)=>{

    const url=req.url;

    if(url === "/home"){
        res.write('<h1>Welcome home</h1>')
    }
    else if(url === "/about"){
        res.write('<h1>Welcome to about us page</h1>')
    }
    else if(url === "/node"){
        res.write('<h1>Welcome to my node js project</h1>')
    }

    res.end();

    
});

server.listen(4000);