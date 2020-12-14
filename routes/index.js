const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.userName;

    if (name) {
        res.render('index', { name }); // here {name} is same as {name:name} according to ES6
    } else {
        res.redirect('hello');
    }
});

router.get('/hello', (req, res) => {
    const name = req.cookies.userName;

    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie("userName", req.body.userName);
    res.redirect('/');
});

router.post('/goodBye', (req, res) => {
    res.clearCookie("userName");
    res.redirect('/');
});

module.exports = router;