//Import http modules
const http = require("http");

//import app.js file from app folder
const app = require('./app/app');

//create a local server to receive data
//create server with createserver method and pass whole application
const server = http.createServer(app);

//create PORT for run whole application
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is listening ${PORT}`);
})
