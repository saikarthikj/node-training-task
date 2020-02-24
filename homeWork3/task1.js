/**
*    Implement an express server that runs on 3000 port and configure the below:
*    1. Enable the server to parse incoming requests with JSON payloads
*    2. Enable the server to serve static files (use built-in middleware)
*    3. Enable the server to parse incoming requests with URL encoded
*    4. Change the server settings to accept maximum request body size to 10 MB (this applies for JSON and URL encoded)
*    5. Enable router config on express
*    6. Connect to mongo server with database “booksdb” which is running on port 27017
*        a. Enable useNewUrlParser
*        b. Disable AutoIndex
*        c. Set poolsize to 10
*        d. Eable KeepAlive & add keepAliveInitialDelay
*        e. Listen or below events
*            i. Connecting
*            ii. Connected
*            iii. Disconnecting
*            iv. close
*/


const express = require("express");
const bookRoutes = require("./routes/books");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({limit: '10mb'}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use("/api", bookRoutes);
app.listen(port, () => {
    console.log("server listening at port ", port);
});