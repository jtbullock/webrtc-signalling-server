const socketHelpers = require('../socket-helpers');

const handler = (socketData, message) => {
    const {name, offer} = message;
    const {users, helpers} = socketData;

    const offerRecipient = users[name];

    if (helpers.notifyCallerIfUnknownUser(offerRecipient, name)) {
        return;
    }

    helpers.sendTo(offerRecipient, {
        type: "offer",
        offer,
        name: socketData.socket.name
    });
};

module.exports = handler;
