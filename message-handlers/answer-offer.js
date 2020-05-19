const socketHelpers = require('../socket-helpers');

const handler = (users, data, ws) => {
    const {name, answer} = data;

    const answerRecipient = users[name];

    if(!!answerRecipient) {
        socketHelpers.sendTo(answerRecipient, {
            type: "answer",
            name,
            answer
        });
    }
    else {
        socketHelpers.sendTo(ws, {
            type: "error",
            message: `User ${name} does not exist!`
        });
    }
};

module.exports = handler;