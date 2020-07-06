const {v4: uuidv4} = require("uuid");

const handler = (socketData, message) => {
    const {name} = message;
    const {users, socket, helpers} = socketData

    if (users[name]) {
        helpers.replyToCaller({
            type: "login",
            success: false,
            message: "Username is unavailable"
        });
    } else {
        const id = uuidv4();

        const otherLoggedInUsers = Object.values(users)
            .map(({id, name: userName}) => ({id, userName}));

        users[name] = socket;

        socket.name = name;
        socket.id = id;

        helpers.replyToCaller({
            type: "login",
            success: true,
            users: otherLoggedInUsers
        });

        helpers.sendToAll("updateUsers");
    }
};

module.exports = handler;