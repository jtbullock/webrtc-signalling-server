const handler = (socketData, message) => {
    const {name, candidate} = message;
    const {helpers} = socketData;
    const candidateRecipient = socketData.users[name];

    if (helpers.notifyCallerIfUnknownUser(candidateRecipient, name)) {
        return;
    }

    socketData.helpers.sendTo(candidateRecipient, {
        type: "candidate",
        name: socketData.socket.name,
        candidate
    });
};

module.exports = handler;
