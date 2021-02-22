const getReplyToCaller = (connection) => {
    return (message) => sendTo(connection, message);
}

const getSendToAll = (socket, users) => {
    return (type) => sendToAll(socket, users, type);
}

const sendTo = (connection, message) => {
    connection.send(JSON.stringify(message));
};

const sendToAll = (socket, users, type) => {
    const {id, name: userName} = socket;

    Object.values(users).forEach(client => {
        if (client.name !== userName) {
            client.send(
                JSON.stringify({
                    type,
                    user: {id, userName}
                })
            );
        }
    });
};

module.exports = {
    getReplyToCaller,
    getSendToAll,
    sendTo,
    sendToAll
};