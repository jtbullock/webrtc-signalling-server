exports.sendTo = (connection, message) => {
    connection.send(JSON.stringify(message));
};

exports.sendToAll = (clients, type, { id, name: userName }) => {
    Object.values(clients).forEach(client => {
        if (client.name !== userName) {
            client.send(
                JSON.stringify({
                    type,
                    user: { id, userName }
                })
            );
        }
    });
};