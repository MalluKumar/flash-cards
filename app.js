const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mainRoute = require('./routes'); // (./routes/index.js) can be used, not required as the file name is index.js
const cardRoute = require('./routes/cards');
app.use(mainRoute);
app.use('/cards', cardRoute);
app.use('/static', express.static('static'));

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log("The application is running on localhost:3000");
});