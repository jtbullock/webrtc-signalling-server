
const { v4: uuidv4 } = require("uuid");
const socketHelpers = require("../socket-helpers");

const handler = (users, name, ws) => {
    if (users[name]) {
        socketHelpers.sendTo(ws, {
            type: "login",
            success: false,
            message: "Username is unavailable"
        });
    }
    else {
        const id = uuidv4();

        const otherLoggedInUsers = Object.values(users)
            .map(({ id, name: userName }) => ({ id, userName }));

        users[name] = ws;
        ws.name = name;
        ws.id = id;

        socketHelpers.sendTo(ws, {
            type: "login",
            success: true,
            users: otherLoggedInUsers
        });

        socketHelpers.sendToAll(users, "updateUsers", ws);

    }
}

module.exports = handler;