/**
 * Modify your server implementation to POST new books to books.json (use fs module)
 * 1.	Use custom middleware with express JSON parser and urlencoded to add a new book from POSTMAN
 * 2.	Perform schema validation to check if the provided data is of correct format – use 3rd party schema validators like JOI or AJV etc) – two books can’t share same ISBN & title
 * 3.	Update new book data in books.json file
 */
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const bookRoutes = require("../routes/books");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/books", bookRoutes);

app.listen(port, () => {
    console.log("server listening at port ", port);
});