const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data; // can be written as const cards = data.cards;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashCard = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${flashCard}`);
});

router.get('/:id', (req, res) => {

    const { side } = req.query;
    const { id } = req.params;

    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }

    const name = req.cookies.userName;
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = { id, text, name };

    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToDisplay = 'Answer';
    } else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToDisplay = 'Question';
    }

    res.render('card', templateData);
});

module.exports = router;