const handler = (socketData) => {
    socketData.helpers.sendToAll("leave");
}

module.exports = handler;