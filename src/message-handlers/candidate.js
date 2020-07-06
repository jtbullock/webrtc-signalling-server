const handler = (socketData, message) => {
    const {name, candidate} = message;
    const candidateRecipient = socketData.users[name];

    if (!!candidateRecipient) {
        socketData.helpers.sendTo(candidateRecipient, {
            type: "candidate",
            name: socketData.socket.name,
            candidate
        });
    } else {
        socketData.helpers.replyToCaller({
            type: "error",
            message: `User ${name} does not exist!`
        });
    }
};

module.exports = handler;
