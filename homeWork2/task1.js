const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb'}));
app.use(express.static('public'));
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World!')
});
app.listen(port, () => console.log(`App listening on port ${port}!`));