const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaName = new Schema({
    name: String
});
const book = mongoose.model('book', schemaName);
const db = mongoose.connection;
db.on('connecting',  () => {
    console.log("connecting");
});
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
    console.log("connection open");
});
db.on('disconnecting', () => {
    console.log("disconnecting");
});
db.on('connected',  () => {
    console.log("connected");
});
db.on('disconnected',  () => {
    console.log("disconnected");
});
mongoose.connect('mongodb://localhost:27017/dbName', {
    useNewUrlParser: true,
    poolSize: 10,
    keepAlive: true,
    autoIndex: false,
    keepAliveInitialDelay: 3000
});
router.get('/books', (req,res) => {
    console.log("router working");
    res.send("router working");
});
db.close();
module.exports = router;