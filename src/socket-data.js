const {getSendToAll, getReplyToCaller, sendTo} = require('./socket-helpers');

module.exports = class SocketData {
    constructor(socket, users) {
        this.socket = socket;
        this.users = users;
        this.helpers = new SocketHelpers(socket, users);
    }
}

class SocketHelpers {
    constructor(socket, users) {
        this.sendTo = sendTo;
        this.sendToAll = getSendToAll(socket, users);
        this.replyToCaller = getReplyToCaller(socket);
        this.getUser = (name) => users[name];
    }

    notifyCallerIfUnknownUser(user, expectedName) {
        if (!user) {
            this.replyToCaller({
                type: "error",
                message: `User ${expectedName} does not exist.`
            });

            return true;
        }

        return false;
    }
}