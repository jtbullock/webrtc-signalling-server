const socketHelpers = require('../socket-helpers');

const handler = (users, data, ws) => {
    socketHelpers.sendToAll(users, "leave", ws);
}

module.exports = handler;