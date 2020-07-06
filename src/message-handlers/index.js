const login = require('./login');
const offer = require('./offer');
const answerOffer = require('./answer-offer');
const candidate = require('./candidate');
const leave = require('./leave');

module.exports = {
    "login": login,
    "offer": offer,
    "answer": answerOffer,
    "candidate": candidate,
    "leave": leave
};