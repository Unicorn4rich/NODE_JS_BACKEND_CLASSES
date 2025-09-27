const http = require("node:http")

const server = http.createServer(function (request, response){  // write on browser and click send -> http://localhost:8000/
    console.log(`I got incomming request: ${Date.now()}`); // to ye wala msg hamen browser pe milega

    // console.log("😍", request.url); 
    // console.log("😕", request.method); 

    // // logic
    // // logic
    // // logic
    // // DB calls

    // response.writeHead(200);
    // response.end("Thank you for visiting our website");
    //------------------------------
       // URL routing

    // switch(request.url){
    //     case "/":
    //         response.writeHead(200);
    //         return response.end("Welcome to HOME Page");
            
    //     case "/contact-us":
    //         response.writeHead(200);
    //         return response.end("Welcome to CONTACT-US Page");
            
    // }

    //------------------------------
       // Method routing

       switch(request.method){
        case "GET":
            switch(request.url){
                case "/":
                    response.writeHead(200);
                    return response.end("Welcome to HOME Page");
            }
       }

    
})


server.listen(8000, ()=>{  // node main.js -> likhenge to ye server chalega
    console.log("http server is Up on Port:8000"); // or ye message hamen terminal mein milega ke server start ho chuka hai.
})