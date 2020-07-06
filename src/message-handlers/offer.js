const socketHelpers = require('../socket-helpers');

const handler = (socketData, message) => {

    const {name, offer} = message;
    const {users} = socketData;

    const offerRecipient = users[name];

    if (!!offerRecipient) {
        socketData.helpers.sendTo(offerRecipient, {
            type: "offer",
            offer,
            name: socketData.socket.name
        });
    } else {
        socketData.helpers.replyToCaller({
            type: "error",
            message: `User ${name} does not exist.`
        });
    }
};

module.exports = handler;
