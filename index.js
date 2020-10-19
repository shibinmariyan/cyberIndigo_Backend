const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnect } = require('./config/dbConnection');
app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.raw());
app.use(bodyParser.text());
//testing apis
app.get('/', async function(req, res) {
    res.status(200)
        .json(
            "Test Success"
        );
});
dbConnect();
app.use('/api', require('./config/apisHandle'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server Running on port -------- ${port}`));
module.exports = app;