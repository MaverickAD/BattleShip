const socket = io();

let shipName = ['submarine', 'torpedo', 'againstTorpedo', 'cruiser', 'aircraftCarrier'];


let gameTable = document.getElementById("game-table");
let weaponTable = document.getElementById("weapon-table");
let shipContainer = document.getElementById("ship-container");
let shipPlacement = document.getElementById("ship-placement");
let makerBoardOn = false;

let weaponSelected;

socket.emit('start-game', '');

socket.on('display-makerBoard', () => {

    if(!makerBoardOn){ //If client refresh the page
        Lib.createShipContainer(shipContainer, shipName);
        Lib.createBoard(shipPlacement);
        shipManager.init(shipName);
        makerBoardOn = true;

        let readyButton = document.getElementById("ready");

        readyButton.addEventListener("click", () => {
            let total = 0;
            let buttons = document.querySelectorAll("button");
            buttons.forEach(e => {
                if (e.disabled){
                    total++;
                }
            });
            if (total === 5){
                socket.emit('player-ready', true, shipManager.getMap());
                console.log(shipManager.getMap());
            }
        });
    }

})

socket.on('display-game', () => {
    while(gameTable.lastChild){
        gameTable.removeChild(gameTable.lastChild)
    }

    socket.emit('get-table', '');
    socket.on('return-get-table', (shipTableServer, weaponTableServer) => {
        let shipTableReturn = document.createElement('div');
        shipTableReturn.id = "ship-board";
        shipTableReturn.classList.add("game-board");
        Lib.createBoardSecond(shipTableReturn, shipTableServer);
        gameTable.appendChild(shipTableReturn);

        let weaponTableReturn = document.createElement('div');
        weaponTableReturn.id = "weapon-board";
        weaponTableReturn.classList.add("game-board");
        Lib.createBoardSecond(weaponTableReturn, weaponTableServer);
        gameTable.appendChild(weaponTableReturn);


        Lib.createWeaponContainer(weaponTable);
        for(let i = 0; i < 4; i++){
            weaponTable.children[i].addEventListener('click', (event) => {
                event.preventDefault();
                if (weaponSelected === undefined){
                    event.target.style.backgroundColor = "#FF00FF";
                    weaponSelected = event.target.textContent;
                }
                else if (weaponSelected === event.target.textContent){
                    event.target.style.backgroundColor = "";
                    weaponSelected = undefined;
                }
                else {
                    let w;
                    for(let i = 0; i < 4; i++){
                        if(weaponTable.children[i].textContent === weaponSelected){
                            w = weaponTable.children[i];
                        }
                    }

                    w.style.backgroundColor = "";
                    event.target.style.backgroundColor = "#FF00FF"
                    weaponSelected = event.target.textContent;
                }
            })
        }

        for (let i = 0; i < weaponTableReturn.children.length; i++){
            weaponTableReturn.children[i].addEventListener('click',(event) => {
                event.preventDefault();
                if (weaponSelected !== undefined){
                    let pos = event.target.id
                    switch (weaponSelected) {
                        case 'M':
                            event.target.textContent = weaponSelected;
                            socket.emit('missile', pos);
                            break;
                        case 'R':
                            event.target.textContent = weaponSelected;
                            for (let j = 0; j < weaponTableReturn.children.length; j++){
                                for (let k = -1; k < 2;  k++){
                                    for (let l = -1; l < 2; l++){
                                        if (weaponTableReturn.children[j].id === String(parseInt(pos[0]) + k) + '-' + String(parseInt(pos[2]) + l)){
                                            weaponTableReturn.children[j].textContent = weaponSelected;
                                        }
                                    }
                                }
                            }
                            socket.emit('radar', pos);
                            break;
                        case 'F':
                            event.target.textContent = weaponSelected;
                            for (let j = 0; j < weaponTableReturn.children.length; j++){
                                for (let k = -1; k < 2;  k++){
                                    if (weaponTableReturn.children[j].id === String(parseInt(pos[0]) + k) + '-' + pos[2]){
                                        weaponTableReturn.children[j].textContent = weaponSelected;
                                    }
                                    if (weaponTableReturn.children[j].id === pos[0] + '-' + String(parseInt(pos[2]) + k)){
                                        weaponTableReturn.children[j].textContent = weaponSelected;
                                    }
                                }
                            }
                            socket.emit('frag', pos);
                            break;
                        case 'T':
                            event.target.textContent = weaponSelected;
                            socket.emit('torpedo', pos);
                            break;
                    }
                }

            })
        }
    })
})

socket.on('missile-result', (updateBoard) => {
    let board = document.getElementById("weapon-board");
    for (let i = 0; i < 10 * 10; i++) {
        if (board.children[i].textContent === 'M' && updateBoard[board.children[i].id[0] - 1][board.children[i].id[2] - 1] === 'M-G') {
            board.children[i].textContent = 'M-G';
        }

    }
})

socket.on('radar-result', (updateBoard) => {
    let board = document.getElementById("weapon-board");
    for (let i = 0; i < 10 * 10; i++) {
        if (board.children[i].textContent === 'R' && updateBoard[board.children[i].id[0] - 1][board.children[i].id[2] - 1] === 'R-G') {
            board.children[i].textContent = 'R-G';

        }
    }

})

socket.on('frag-result', (updateBoard) => {
    let board = document.getElementById("weapon-board");
    for (let i = 0; i < 10 * 10; i++) {
        if (board.children[i].textContent === 'F' && updateBoard[board.children[i].id[0] - 1][board.children[i].id[2] - 1] === 'F-G') {
            board.children[i].textContent = 'F-G';

        }
    }
})

socket.on('torpedo-result', (updateBoard) => {
    let board = document.getElementById("weapon-board");
    for (let i = 0; i < 10 * 10; i++) {
        if (board.children[i].textContent === 'T' && updateBoard[board.children[i].id[0] - 1][board.children[i].id[2] - 1] === 'T-G') {
            board.children[i].textContent = 'T-G';

        }
    }
})
