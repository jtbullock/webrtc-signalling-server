const socketHelpers = require('../socket-helpers');

const handler = (users, data, ws) => {

    const {name, offer} = data;

    const offerRecipient = users[name];

    if(!!offerRecipient) {
        socketHelpers.sendTo(offerRecipient, {
            type: "offer",
            offer,
            name: ws.name
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
