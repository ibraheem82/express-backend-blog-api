const http  = require("http")
const app = require("./app");
const {port} = require("./config/kyes");

// Create server
// This is the variable name that will hold the Express application instance.
// express(): This creates a new Express application instance. 

// server: This variable will hold the HTTP server instance.
// http.createServer(app): This creates an HTTP server using the http module built into Node.js. The app object, which is an Express application instance, is passed as an argument to the createServer function. This means that Express will handle incoming HTTP requests and generate appropriate responses.
const server = http.createServer(app);

server.listen(port, () => console.log(`Server is running of port ${port}`))



