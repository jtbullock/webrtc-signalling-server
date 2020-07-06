const handler = (socketData, message) => {
    const {name, answer, isAccepted} = message;

    const answerRecipient = socketData.users[name];

    if (!!answerRecipient) {
        socketData.helpers.sendTo(answerRecipient, {
            type: "answer",
            name: socketData.socket.name,
            isAccepted,
            answer
        });
    } else {
        socketData.helpers.replyToCaller({
            type: "error",
            message: `User ${name} does not exist.`
        });
    }
};

module.exports = handler;
