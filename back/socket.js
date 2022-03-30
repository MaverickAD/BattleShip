const Game = require(__dirname + '/game/game.js').Game;
const Ship = require(__dirname + '/game/game.js').Ship;

let allRooms = [];
let indexRoom = 0;

let redirectRoom = (tabRoom, io) => {
    let roomToRedirect = []

    for (let i = 0; i < tabRoom.length; i++){
        if(tabRoom[i].numberPlayer === 2 && tabRoom[i].usernameSessionPlayer.length === 2){
            roomToRedirect.push(tabRoom[i].roomName);
        }
    }

    console.log(roomToRedirect)

    if(roomToRedirect.length > 0){
        for (let i = 0; i < roomToRedirect.length; i++){
            io.in(roomToRedirect[i]).emit('redirect', '');
        }
    }
}

let checkTwoPlayersAreOnPlay = (client, io) => {
    const room = client.roomName;
    let secondPlayerIsReady = false

    for (let user of io.sockets.sockets){
        if(user[1].handshake.session.roomName === room && user[1].handshake.session !== client && user[1].handshake.session.ready === 1){
            secondPlayerIsReady = true;
        }
    }

    return secondPlayerIsReady;
}

let checkTwoPlayersBoardOn = (client, io) => {
    const room = client.roomName;
    let secondPlayerIsReady = false

    for (let user of io.sockets.sockets){
        if(user[1].handshake.session.roomName === room && user[1].handshake.session !== client && user[1].handshake.session.makerBoard === true){
            secondPlayerIsReady = true;
        }
    }

    return secondPlayerIsReady;
}

let init = io => {

    io.on('connection', (socket) => {
        console.log('A client connection has been established');

        socket.handshake.session.socketId = socket.id;
        socket.handshake.session.ready = 0;
        if(socket.handshake.session.roomName){
            socket.join(socket.handshake.session.roomName);
        }

        socket.on('connect-play-room', () => {
            if (indexRoom === 0){
                indexRoom += 1;
                allRooms.push({indexRoom : indexRoom, roomName : "room" + indexRoom, numberPlayer: 1, usernameSessionPlayer: [socket.handshake.session.userdata.username]});
                socket.handshake.session.roomName = "room" + indexRoom;
                socket.join("room" + indexRoom);
            }
            else {
                let i = 0;
                let into = 0;

                while (into === 0 && i !== allRooms.length){
                    if(allRooms[i].numberPlayer === 1){
                        into = allRooms[i].indexRoom;
                    }
                    i++;
                }

                if (into === 0){
                    indexRoom += 1;
                    allRooms.push({indexRoom : indexRoom, roomName : "room" + indexRoom, numberPlayer: 1, usernameSessionPlayer: [socket.handshake.session.userdata.username]});
                    socket.handshake.session.roomName = "room" + indexRoom;
                    socket.join("room" + indexRoom);
                }
                else {
                    allRooms[into - 1].numberPlayer += 1;
                    allRooms[into - 1].usernameSessionPlayer.push(socket.handshake.session.userdata.username);
                    socket.handshake.session.roomName = "room" + indexRoom;
                    socket.join("room" + into);
                }
            }

            console.log(allRooms);
            redirectRoom(allRooms, io);
            console.log(io.sockets.adapter.rooms);
        })

        socket.on('start-game', () => {
            socket.handshake.session.ready = 1;
            console.log(io.sockets.adapter.rooms);
            if(checkTwoPlayersAreOnPlay(socket.handshake.session, io)){
                socket.handshake.session.player = 1;

                for (let user of io.sockets.sockets){
                    if(user[1].handshake.session !== socket.handshake.session && user[1].handshake.session.roomName === socket.handshake.session.roomName){
                        user[1].handshake.session.player = 2;
                    }
                }

                let room = allRooms.filter(element => element.roomName === socket.handshake.session.roomName);

                let bs = new Game();
                room[0].gameName  = 'game' + room[0].indexRoom;
                room[0].game = bs;

                let newAirCraftCarrier = new Ship("Aircraft Carrier", 5, "north");

                // bs.positionShip(1, 1, 1, newAirCraftCarrier);

                // bs.positionShip(2, 1, 5, newAirCraftCarrier);

                io.in(room[0].roomName).emit('display-makerBoard', '');
            }

        })

        socket.on('get-table', () => {
            let player = socket.handshake.session.player;

            let game = allRooms.filter(element => element.roomName === socket.handshake.session.roomName)[0].game;
            let shipBoard = game.getShipBoard(player);
            let weaponBoard = game.getWeaponBoard(player);

            socket.emit('return-get-table', shipBoard, weaponBoard);
        })

        socket.on('player-ready', (data, shipData) => {
            let game = allRooms.filter(element => element.roomName === socket.handshake.session.roomName)[0].game;
            for(let i = 0; i < shipData.length; i++) {
                console.log(String(shipData[i][0]) + '-' + String(shipData[i][3][0]) + '-' + String(shipData[i][3][2]))
                let ship = new Ship(shipData[i][0], shipData[i][1], shipData[i][2], shipData[i][1]);
                game.positionShip(socket.handshake.session.player, parseInt(shipData[i][3][0]), parseInt(shipData[i][3][2]),ship);
            }
            socket.handshake.session.makerBoard = data;
            if(checkTwoPlayersBoardOn(socket.handshake.session, io)){
                let room = allRooms.filter(element => element.roomName === socket.handshake.session.roomName);
                io.in(room[0].roomName).emit('display-game', '');
            }
        })

        socket.on('missile', (position) => {
            let game = allRooms.filter(element => element.roomName === socket.handshake.session.roomName)[0].game;
            game.attackMissile(socket.handshake.session.player, parseInt(position[0]), parseInt(position[2]));

            socket.emit('missile-result', game.getWeaponBoard(socket.handshake.session.player));
        })

        socket.on('radar', (position) => {
            let game = allRooms.filter(element => element.roomName === socket.handshake.session.roomName)[0].game;
            game.radar(socket.handshake.session.player, parseInt(position[0]), parseInt(position[2]));

            socket.emit('radar-result', game.getWeaponBoard(socket.handshake.session.player));
        })

        socket.on('frag', (position) => {
            let game = allRooms.filter(element => element.roomName === socket.handshake.session.roomName)[0].game;
            game.fragMissile(socket.handshake.session.player, parseInt(position[0]), parseInt(position[2]));

            socket.emit('frag-result', game.getWeaponBoard(socket.handshake.session.player));
        })

        socket.on('torpedo', (position) => {
            let game = allRooms.filter(element => element.roomName === socket.handshake.session.roomName)[0].game;
            game.torpedoMissile(socket.handshake.session.player, parseInt(position[0]), parseInt(position[2]));

            socket.emit('torpedo-result', game.getWeaponBoard(socket.handshake.session.player));
        })

        socket.on('disconnect', () => {
            for (let i = 0; i < allRooms.length; i++) {
                for (let j = 0; j < 2; j++){
                    if(socket.id === allRooms[i].usernameSessionPlayer[j]){
                        allRooms[i].usernameSessionPlayer.splice(j, 1);
                        allRooms[i].numberPlayer -= 1;
                    }
                }
            }

            socket.leave(socket.handshake.session.roomName);

            console.log('A client has been disconnected');
        });
    })

}

module.exports = {
    init(io) { return init(io); }
}