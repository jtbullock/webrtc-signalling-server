const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const app = express();
const messageHandlers = require("./message-handlers");
const { sendTo, sendToAll } = require("./socket-helpers");

const port = process.env.PORT || 9000;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

let users = {};

wss.on("connection", ws => {
    ws.on("message", msg => {
        let data;

        try {
            data = JSON.parse(msg);
        } catch (e) {
            console.log("Invalid JSON Received");
            data = {};
        }

        console.log("Received message: %s from client", msg);

        const { type } = data;

        const messageHandler = messageHandlers[type];

        if(!messageHandler)
        {
            sendTo(ws, {
                type: "error",
                message: "Command not found: " + type
            });

            return;
        }

        messageHandler(users, data, ws);
    })

    ws.on("close", () => {
        delete users[ws.name];
        sendToAll(users, "leave", ws);
    });

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