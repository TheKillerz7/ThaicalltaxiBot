const getChattingMessages = async (req, res) => {
    const io = req.app.get('socketio');

    io.on('connection', (socket) => {
        console.log('a user connected');
    });
}

const storeChatMessages = (req, res) => {

}

const startChattingRoom = (req, res) => {

}

const deleteChattingRoom = (req, res) => {

}

module.exports = {
    getChattingMessages,
    storeChatMessages,
    startChattingRoom,
    deleteChattingRoom
}