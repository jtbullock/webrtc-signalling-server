const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const app = express();

const port = process.env.PORT || 9000;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

let users = {};

const sendTo = (connection, message) => {
    connection.send(JSON.stringify(message));
};

const sendToAll = (clients, type, { id, name: userName }) => {
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

wss.on("connection", ws => {
    ws.on("message", msg => {
        let data;

        try {
            data = JSON.parse(msg);
        } catch (e) {
            console.log("Invalid JSON Received");
            data = {};
        }

        const { type, name } = data;

        switch (type) {
            case "login":
                if (users[name]) {
                    sendTo(ws, {
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

                    sendTo(ws, {
                        type: "login",
                        success: true,
                        users: otherLoggedInUsers
                    });

                    sendToAll(users, "updateUsers", ws);

                }
                break;
            default:
                sendTo(ws, {
                    type: "error",
                    message: "Command not found: " + type
                });
                break;
        }

        console.log("Received message: %s from client", msg);
    })

    ws.send(
        JSON.stringify({
            type: "connect",
            message: "Well hello there, I am a WebSocket server"
        })
    );
});

server.listen(port, () => {
    console.log(`Signalling Server running on port: ${port}`);
});