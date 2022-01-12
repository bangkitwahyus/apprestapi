const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var morgan = require('morgan');

// parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// panggil routes
var routes = require('./routes');
routes(app);

// Daftarkan menu routes dari index
app.use('/auth',require('./middleware'));


app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});