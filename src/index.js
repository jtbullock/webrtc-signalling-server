const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const messageHandlers = require("./message-handlers");
const SocketData = require('./socket-data');

const port = process.env.PORT || 9000;

const app = express();
const server = http.createServer(app);
const socketServer = new WebSocket.Server({ server });

let users = {};

socketServer.on("connection", webSocket => {

    const socketData = new SocketData(webSocket, users);

    webSocket.on("message", message => {
        let messageJson;

        try {
            messageJson = JSON.parse(message);
        } catch (e) {
            console.log("Invalid JSON Received");
            messageJson = {};
        }

        console.log("Received message: %s from client", message);

        const { type } = messageJson;

        const messageHandler = messageHandlers[type];

        if(!messageHandler)
        {
            socketData.helpers.sendTo(webSocket, {
                type: "error",
                message: "Command not found: " + type
            });

            return;
        }

        messageHandler(socketData, messageJson);
    })

    webSocket.on("close", () => {
        delete users[webSocket.name];
        socketData.helpers.sendToAll(users, "leave", webSocket);
    });

    webSocket.send(
        JSON.stringify({
            type: "connect",
            message: "Well hello there, I am a WebSocket server"
        })
    );
});

server.listen(port, () => {
    console.log(`Signalling Server running on port: ${port}`);
});
