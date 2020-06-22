const socketHelpers = require('../socket-helpers');

const handler = (users, data, ws) => {
    const { name, candidate } = data;

    const candidateRecipient = users[name];
    if(!!candidateRecipient) {
        socketHelpers.sendTo(candidateRecipient, {
            type: "candidate",
	    name,
            candidate
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
