const socketHelpers = require('../socket-helpers');

const handler = (users, data, ws) => {
    const {name, answer, isAccepted} = data;

    const answerRecipient = users[name];

    if(!!answerRecipient) {
        socketHelpers.sendTo(answerRecipient, {
            type: "answer",
            name: ws.name,
			      isAccepted,
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
