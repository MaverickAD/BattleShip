const socket = io();

socket.emit('connect-play-room', '');

socket.on('redirect', () => {
    let sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    sleep(100).then(() => {
        window.location.replace("http://localhost:3000/play")
    })
})