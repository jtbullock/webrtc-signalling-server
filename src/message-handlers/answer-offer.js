const handler = (socketData, message) => {
    const {helpers} = socketData;
    const {name, answer, isAccepted} = message;

    const answerRecipient = helpers.getUser(name);

    if (helpers.notifyCallerIfUnknownUser(answerRecipient, name)) {
        return;
    }

    helpers.sendTo(answerRecipient, {
        type: "answer",
        name: socketData.socket.name,
        isAccepted,
        answer
    });
};

module.exports = handler;
